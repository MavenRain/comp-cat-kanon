import { readFile, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const modules = JSON.parse(await readFile(path.join(root, 'modules.json'), 'utf8'));
const tests = ['finite', 'omega', 'unify', 'temporal', 'constructions', 'theories', 'rules_trees', 'adapters'];
const fixtures = (await readFile(path.join(root, 'port', 'oracle.jsonl'), 'utf8')).trim().split('\n').map(JSON.parse);
const fixtureCall = f => f.export.startsWith('diffTemporal')
  ? {name: `${f.export}_${f.args.join('_')}`, args: []} : {name: f.export, args: f.args};
const exports = [];
for (const name of tests) {
  const source = await readFile(path.join(root, 'test', `${name}.kan`), 'utf8');
  exports.push(...Array.from(source.matchAll(/^def (test\w+) : Nat/gm), match => match[1]));
}
if (!exports.length) throw new Error('No test exports found');
await mkdir(path.join(root, 'build'), { recursive: true });
const output = path.join(root, 'build', 'tests.wasm');
const args = [path.join(root, 'scripts', 'compiler-check.sh'), 'build',
  ...modules.map(name => path.join(root, 'src', `${name}.kan`)),
  ...tests.map(name => path.join(root, 'test', `${name}.kan`)), path.join(root, 'test', 'differential.kan'), path.join(root, 'test', 'differential_temporal.kan'), '-o', output,
  ...[...exports, ...new Set(fixtures.map(f => fixtureCall(f).name))].flatMap(name => ['--export', name])];
const built = spawnSync('sh', args, { stdio: 'inherit' });
if (built.status !== 0) process.exit(built.status ?? 1);
const { instance } = await WebAssembly.instantiate(await readFile(output));
let failed = 0;
for (const name of exports) {
  try {
    const actual = instance.exports[name]();
    if (actual !== 1) throw new Error(`expected 1, got ${actual}`);
    console.log(`PASS ${name}`);
  } catch (error) {
    failed++;
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
console.log(`${exports.length - failed}/${exports.length} passed`);
for (const fixture of fixtures) {
  try {
    const call = fixtureCall(fixture);
    const actual = instance.exports[call.name](...call.args);
    if (actual !== fixture.expected) throw new Error(`expected ${fixture.expected}, got ${actual}`);
  } catch (error) {
    failed++;
    console.error(`DIFF ${fixture.export}(${fixture.args.join(',')}): ${error.message}`);
  }
}
console.log(`${fixtures.length} OCaml differential cases checked`);
process.exitCode = failed ? 1 : 0;
