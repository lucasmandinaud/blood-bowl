#!/bin/sh
# Incrémente le numéro de version de l'app (meta app-version + ?v= des scripts).
# À lancer avant chaque publication : les iPhones rechargent alors la nouvelle version tout seuls.
cd "$(dirname "$0")/.." || exit 1
cur=$(sed -n 's/.*name="app-version" content="\([0-9]*\)".*/\1/p' index.html)
new=$((cur + 1))
sed -i.bak "s/name=\"app-version\" content=\"$cur\"/name=\"app-version\" content=\"$new\"/; s/?v=$cur\"/?v=$new\"/g" index.html && rm -f index.html.bak
echo "Version $cur -> $new"
