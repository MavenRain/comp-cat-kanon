import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const modules = JSON.parse(await readFile(path.join(root, 'modules.json'), 'utf8'));
const definitions = new Map();
for (const module of modules) {
  const source = await readFile(path.join(root, 'src', `${module}.kan`), 'utf8');
  for (const match of source.matchAll(/^(?:def (?:rec )?|and |mu )([A-Za-z][A-Za-z0-9_]*)\b/gm)) {
    const name = match[1];
    if (definitions.has(name)) throw new Error(`Duplicate ${name}: ${definitions.get(name)} and ${module}`);
    definitions.set(name, module);
  }
}
console.log(`PASS ${modules.length} modules have distinct global definitions`);
