#!/usr/bin/env bash
# Usage: bash scripts/update-version.sh <new-version>
#         npm run set-version -- <new-version>
#
# Updates the version field in all plugin config files at once:
#   plugin.json
#   .claude-plugin/plugin.json  (copy of plugin.json — must stay byte-for-byte identical)
#   .github/plugin/marketplace.json  (metadata.version + plugins[0].version)
#   .claude-plugin/marketplace.json  (copy of .github/plugin/marketplace.json)
#
# Requires: jq (https://jqlang.org)

set -euo pipefail

NEW_VERSION="${1:-}"

if [[ -z "$NEW_VERSION" ]]; then
  echo "Error: version argument is required."
  echo "Usage: $0 <new-version>  (e.g. $0 2026.4.3)"
  exit 1
fi

if ! echo "$NEW_VERSION" | grep -qE '^[0-9]{4}\.[0-9]+\.[0-9]+$'; then
  echo "Error: version must be in YYYY.M.D format (e.g. 2026.4.3), got: $NEW_VERSION"
  exit 1
fi

if ! command -v jq &>/dev/null; then
  echo "Error: jq is required but not installed. See https://jqlang.org/download/"
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

update_json_field() {
  local file="$REPO_ROOT/$1"
  local filter="$2"
  local tmp
  tmp="$(mktemp)"
  jq "$filter" "$file" > "$tmp" && mv "$tmp" "$file"
}

echo "Updating plugin version to $NEW_VERSION..."

# 1. plugin.json (root)
update_json_field "plugin.json" ".version = \"$NEW_VERSION\""

# 2. .claude-plugin/plugin.json — must be byte-for-byte identical to plugin.json
cp "$REPO_ROOT/plugin.json" "$REPO_ROOT/.claude-plugin/plugin.json"

# 3. .github/plugin/marketplace.json — two version fields
update_json_field ".github/plugin/marketplace.json" \
  ".metadata.version = \"$NEW_VERSION\" | .plugins[0].version = \"$NEW_VERSION\""

# 4. .claude-plugin/marketplace.json — must be byte-for-byte identical
cp "$REPO_ROOT/.github/plugin/marketplace.json" "$REPO_ROOT/.claude-plugin/marketplace.json"

echo "Done. All plugin config files are now at version $NEW_VERSION."
