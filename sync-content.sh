#!/usr/bin/env bash
# Sync content from Obsidian vault to Quartz content folder

VAULT_PATH="../ttrpg-notes/Campagne/Universe 2 (WM)/Current Era"
CONTENT_PATH="./content"

echo "Syncing content from Obsidian vault..."
rsync -av --delete \
    --exclude="Personaggio" \
    --exclude=".obsidian" \
    "$VAULT_PATH/" "$CONTENT_PATH/"

echo "Done."
