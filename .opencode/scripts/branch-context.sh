#!/usr/bin/env bash
set -euo pipefail

# branch-context.sh — extract business logic delta from a git branch
#
# Usage: branch-context.sh [--base <branch>] [--head <branch>] [--output <file>]
#   --base   Base branch to compare against (default: main)
#   --head   Feature branch to analyze     (default: HEAD)
#   --output Write report to file instead of stdout
#
# Produces: structured summary of all changes grouped by module/bounded context

BASE="main"
HEAD="HEAD"
OUTPUT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base)   BASE="$2";  shift 2 ;;
    --head)   HEAD="$2";  shift 2 ;;
    --output) OUTPUT="$2"; shift 2 ;;
    *) echo "Unknown: $1"; exit 1 ;;
  esac
done

if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "fatal: not a git repository"
  exit 1
fi

exec 3>&1
if [[ -n "$OUTPUT" ]]; then
  exec > "$OUTPUT"
fi

echo "================================================"
echo " Branch Context Report"
echo "================================================"
echo " Base:  $BASE"
echo " Head:  $HEAD"
echo " Date:  $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo " Repo:  $(git rev-parse --show-toplevel 2>/dev/null || echo 'unknown')"
echo "================================================"
echo ""

# 1. Commit log — reconstruct what tasks were done
echo "--- Commits ($BASE..$HEAD) ---"
git log "$BASE..$HEAD" --oneline --no-decorate 2>/dev/null || echo "(empty range)"
echo ""

# 2. Files changed (stat summary)
echo "--- Files Changed ---"
git diff "$BASE..$HEAD" --stat 2>/dev/null || echo "(empty diff)"
echo ""

# 3. Files grouped by directory — reveals bounded contexts touched
echo "--- Changed by Directory (bounded context hint) ---"
git diff "$BASE..$HEAD" --name-only 2>/dev/null \
  | sed 's|/[^/]*$||' \
  | sort \
  | uniq -c \
  | sort -rn \
  || echo "(empty diff)"
echo ""

# 4. New files only
echo "--- New Files ---"
git diff "$BASE..$HEAD" --diff-filter=A --name-only 2>/dev/null || echo "(none)"
echo ""

# 5. Deleted files
echo "--- Deleted Files ---"
git diff "$BASE..$HEAD" --diff-filter=D --name-only 2>/dev/null || echo "(none)"
echo ""

# 6. Domain concept extraction — look for likely entity/value object/aggregate definitions
echo "--- Possible Domain Concepts (class/record/enum/interface definitions) ---"
for f in $(git diff "$BASE..$HEAD" --diff-filter=AM --name-only 2>/dev/null); do
  if [[ -f "$f" ]]; then
    # Show line ranges of top-level definitions in the diff
    git diff "$BASE..$HEAD" -U0 -- "$f" 2>/dev/null \
      | grep -E '^\+.*\b(class|record|struct|enum|interface|type|trait)\b' \
      | sed 's/^+/  /' \
      || true
  fi
done
echo ""

# 7. Test changes
echo "--- Test Files Changed ---"
git diff "$BASE..$HEAD" --name-only 2>/dev/null \
  | grep -E '(spec|test|__tests__|_test\.go|Test\.cs|\.test\.)' \
  || echo "(none detected)"
echo ""

# 8. Summary stats
echo "--- Summary ---"
FILES_CHANGED=$(git diff "$BASE..$HEAD" --stat 2>/dev/null | tail -1 | grep -oP '\d+ file' | grep -oP '\d+' || echo "0")
INSERTIONS=$(git diff "$BASE..$HEAD" --stat 2>/dev/null | tail -1 | grep -oP '\d+ insertion' | grep -oP '\d+' || echo "0")
DELETIONS=$(git diff "$BASE..$HEAD" --stat 2>/dev/null | tail -1 | grep -oP '\d+ deletion' | grep -oP '\d+' || echo "0")
COMMIT_COUNT=$(git log "$BASE..$HEAD" --oneline 2>/dev/null | wc -l | tr -d ' ')

echo " Commits:  $COMMIT_COUNT"
echo " Files:    $FILES_CHANGED"
echo " + lines:  $INSERTIONS"
echo " - lines:  $DELETIONS"
echo "================================================"
