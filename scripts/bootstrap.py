#!/usr/bin/env python3
"""Build the pinned Kanon compiler and the constructor elaboration prerequisite."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tempfile

root = Path(__file__).resolve().parent.parent
lock = json.loads((root / 'toolchain/lock.json').read_text())
parser = argparse.ArgumentParser()
parser.add_argument('--source', type=Path, help='Existing Kanon Git checkout, used read-only')
args = parser.parse_args()
target = root / '.toolchain/kanon'
stamp = target / '.comp-cat-lock.json'
binary = target / '_build/default/bin/kanon.exe'
if binary.exists() and stamp.exists() and json.loads(stamp.read_text()) == lock:
    print('Pinned Kanon compiler is ready')
    raise SystemExit(0)
if target.exists():
    parser.error(f'{target} is incomplete or uses another revision; move it aside and rerun')
patch = root / 'toolchain/constructors.patch'
if hashlib.sha256(patch.read_bytes()).hexdigest() != lock['patch_sha256']:
    parser.error('Constructor patch checksum differs from toolchain/lock.json')
target.parent.mkdir(exist_ok=True)
with tempfile.TemporaryDirectory(prefix='bootstrap-', dir=target.parent) as scratch:
    scratch = Path(scratch)
    source = args.source.resolve() if args.source else scratch / 'source'
    if not args.source:
        subprocess.run(['git', 'clone', '--no-checkout', lock['repository'], str(source)], check=True)
    subprocess.run(['git', '-C', str(source), 'cat-file', '-e', lock['revision'] + '^{commit}'], check=True)
    archive = scratch / 'source.tar'
    with archive.open('wb') as stream:
        subprocess.run(['git', '-C', str(source), 'archive', lock['revision']], stdout=stream, check=True)
    build = scratch / 'build'
    build.mkdir()
    subprocess.run(['tar', '-xf', str(archive), '-C', str(build)], check=True)
    subprocess.run(['patch', '-p1', '-i', str(patch)], cwd=build, check=True)
    subprocess.run(['dune', 'build', 'bin/kanon.exe'], cwd=build, check=True)
    (build / '.comp-cat-lock.json').write_text(json.dumps(lock, indent=2) + '\n')
    shutil.move(str(build), str(target))
print(f'Built {binary}')
