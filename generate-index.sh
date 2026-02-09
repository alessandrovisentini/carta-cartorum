#!/usr/bin/env bash
# Generate index.md from content folders

CONTENT_PATH="./content"

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
