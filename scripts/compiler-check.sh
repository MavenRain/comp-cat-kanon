#!/bin/sh
set -eu
project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
export KANON_ROOT=${COMP_CAT_KANON_ROOT:-"$project_root/.toolchain/kanon"}
export KANON_BIN=${COMP_CAT_KANON_BIN:-"$KANON_ROOT/_build/default/bin/kanon.exe"}
if [ ! -x "$KANON_BIN" ]; then
  echo "Compiler unavailable: $KANON_BIN. Run python3 scripts/bootstrap.py first." >&2
  exit 2
fi
# The optional compact reporter uses the same pinned compiler.
if [ -n "${KANONCHO:-}" ]; then
  exec "$KANONCHO" "$@"
elif [ -x "$HOME/.local/lib/kanoncho/app/bin/kanoncho" ]; then
  exec "$HOME/.local/lib/kanoncho/app/bin/kanoncho" "$@"
else
  exec "$KANON_BIN" "$@"
fi
