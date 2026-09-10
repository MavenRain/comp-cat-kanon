#!/usr/bin/env python3
"""Regenerate OCaml reference observations in an isolated source archive."""
import argparse
import json
from pathlib import Path
import shutil
import subprocess
import tempfile

root = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--source', required=True, type=Path, help='comp-cat-ocaml Git checkout, read-only')
parser.add_argument('--switch', help='Optional existing opam switch')
parser.add_argument('--output', type=Path, default=root / 'port/oracle.jsonl')
args = parser.parse_args()
manifest = json.loads((root / 'port/source-manifest.json').read_text())
revision = manifest['source_revision']
with tempfile.TemporaryDirectory(prefix='comp-cat-oracle-') as scratch:
    scratch = Path(scratch)
    archive = scratch / 'source.tar'
    with archive.open('wb') as stream:
        subprocess.run(['git', '-C', str(args.source.resolve()), 'archive', revision], stdout=stream, check=True)
    checkout = scratch / 'source'
    checkout.mkdir()
    subprocess.run(['tar', '-xf', str(archive), '-C', str(checkout)], check=True)
    (checkout / 'oracle').mkdir()
    shutil.copyfile(root / 'port/oracle.ml', checkout / 'oracle/main.ml')
    (checkout / 'oracle/dune').write_text('(executable (name main) (libraries comp_cat))\n')
    command = ['dune', 'build', 'oracle/main.exe']
    if args.switch:
        command = ['opam', 'exec', '--switch=' + args.switch, '--'] + command
    subprocess.run(command, cwd=checkout, check=True)
    observations = subprocess.check_output([str(checkout / '_build/default/oracle/main.exe')], cwd=checkout)
    for line in observations.splitlines():
        json.loads(line)
    args.output.write_bytes(observations)
    print(f'Wrote {len(observations.splitlines())} OCaml reference cases to {args.output}')
