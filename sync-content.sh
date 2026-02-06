#!/usr/bin/env bash
# Sync content from Obsidian vault to Quartz content folder
#
# This script also generates an index.md that indexes all folders to solve the
# Quartz error: "Warning: you seem to be missing an `index.md` home page file
# at the root of your `content` folder (`content/index.md` does not exist).
# This may cause errors when deploying."

VAULT_PATH="../ttrpg-notes/Campagne/Universe 2 (WM)/Current Era"
CONTENT_PATH="./content"

echo "Syncing content from Obsidian vault..."
rsync -av --delete \
    --exclude="Personaggio" \
    --exclude=".obsidian" \
    "$VAULT_PATH/" "$CONTENT_PATH/"

# Generate index.md with links to all top-level folders
echo "Generating index.md..."
cat > "$CONTENT_PATH/index.md" << 'EOF'
---
title: Home
---

## Carta Iniziorum

EOF

# List all directories and add them as links
for dir in "$CONTENT_PATH"/*/; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        echo "- [[$dirname]]" >> "$CONTENT_PATH/index.md"
    fi
done

echo "Done."
