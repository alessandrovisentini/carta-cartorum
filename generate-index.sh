#!/usr/bin/env bash
# Generate index.md from content folders

CONTENT_PATH="./content"

echo "Generating index.md..."
cat > "$CONTENT_PATH/index.md" << 'EOF'
---
socialImage: group.png
---

# Carta Iniziorum

![Il Gruppo](/Images/group.png)

EOF

# List all folders and create links with trailing slashes
for dir in "$CONTENT_PATH"/*/; do
    if [ -d "$dir" ]; then
        folder_name=$(basename "$dir")
        # Skip the Images folder (used for assets only)
        [ "$folder_name" = "Images" ] && continue
        # Skip Timeline: its pages are linked directly below, not as a folder
        [ "$folder_name" = "Timeline" ] && continue
        # Convert folder name to URL format (spaces to hyphens)
        url_name=$(echo "$folder_name" | sed 's/ /-/g')
        # Use display name with spaces, URL with hyphens and trailing slash
        echo "- [$folder_name](./$url_name/)" >> "$CONTENT_PATH/index.md"
    fi
done

# Link the Timeline and Presenze pages explicitly (not auto-listed as folders)
echo "- [Timeline](./Timeline/Timeline)" >> "$CONTENT_PATH/index.md"
echo "- [Presenze](./Presenze)" >> "$CONTENT_PATH/index.md"

echo "Done."
