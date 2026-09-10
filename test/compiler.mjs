import {readFile, mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
await mkdir(path.join(root, 'build'), {recursive:true});
const compiler = path.join(root, 'scripts/compiler-check.sh');
const output = path.join(root, 'build/compiler-positive.wasm');
const positive = spawnSync('sh', [compiler, 'build', path.join(root, 'test/compiler/constructors-positive.kan'),
  '-o', output, '--export', 'boxProbe'], {encoding:'utf8'});
if (positive.status !== 0) throw new Error(positive.stdout + positive.stderr);
const {instance} = await WebAssembly.instantiate(await readFile(output));
if (instance.exports.boxProbe() !== 7) throw new Error('Parameterized constructor runtime regression');
const negative = spawnSync('sh', [compiler, 'check', path.join(root, 'test/compiler/constructors-negative.kan')], {encoding:'utf8'});
const diagnostics = negative.stdout + negative.stderr;
if (negative.status === 0 || !/mismatch|expected.*Nat|type.*Nat/i.test(diagnostics)) {
  throw new Error(`Expected a type mismatch, got status ${negative.status}: ${diagnostics}`);
}
console.log('PASS constructor acceptance, runtime value, and type rejection');
