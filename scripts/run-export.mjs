import {readFile} from 'node:fs/promises';

const [file, name, ...values] = process.argv.slice(2);
if (!file || !name) {
  console.error('Usage: node scripts/run-export.mjs FILE.wasm EXPORT [INTEGER ...]');
  process.exit(2);
}
const args = values.map(value => {
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Invalid integer: ${value}`);
  return n;
});
const {instance} = await WebAssembly.instantiate(await readFile(file));
if (typeof instance.exports[name] !== 'function') throw new Error(`No function export: ${name}`);
console.log(instance.exports[name](...args));
