import {readFile, mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const modules = JSON.parse(await readFile(path.join(root, 'modules.json'), 'utf8'));
const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node scripts/build.mjs FILE.kan -o OUTPUT.wasm --export NAME');
  process.exit(2);
}
await mkdir(path.join(root, 'build'), {recursive: true});
const result = spawnSync('sh', [path.join(root, 'scripts/compiler-check.sh'), 'build',
  ...modules.map(name => path.join(root, 'src', `${name}.kan`)), ...args], {stdio: 'inherit'});
process.exit(result.status ?? 1);
