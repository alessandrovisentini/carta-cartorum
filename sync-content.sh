#!/usr/bin/env bash
# Sync content from Obsidian vault to Quartz content folder

VAULT_PATH="../ttrpg-notes/Campagne/Universe 2 (WM)/Current Era"
CONTENT_PATH="./content"

echo "Syncing content from Obsidian vault..."
rsync -av --delete \
    --exclude="Personaggio" \
    --exclude=".obsidian" \
    "$VAULT_PATH/" "$CONTENT_PATH/"

# Generate index.md with correct link format (trailing slashes for folders)
# This fixes SPA navigation issues with the base path on GitHub Pages
echo "Generating index.md..."
cat > "$CONTENT_PATH/index.md" << 'EOF'
# Carta Iniziorum

EOF

# List all folders and create links with trailing slashes
for dir in "$CONTENT_PATH"/*/; do
    if [ -d "$dir" ]; then
        folder_name=$(basename "$dir")
        # Convert folder name to URL format (spaces to hyphens)
        url_name=$(echo "$folder_name" | sed 's/ /-/g')
        # Use display name with spaces, URL with hyphens and trailing slash
        echo "- [$folder_name](./$url_name/)" >> "$CONTENT_PATH/index.md"
    fi
done

echo "Done."
