#!/bin/sh
# Packages the extension into dist/:
#   directchange-chrome.zip   Chrome, Edge, Opera, Brave and other Chromium browsers
#   directchange-firefox.zip  Firefox (desktop and Android), same code with a patched manifest
set -e
cd "$(dirname "$0")"
FILES="manifest.json background.js content.js parse.js popup.html popup.js icons _locales"

rm -rf dist && mkdir -p dist/firefox
zip -qr dist/directchange-chrome.zip $FILES -x 'icons/*.svg'

# Firefox has no background service worker (it runs background.js as an event page) and needs an add-on id.
cp -R $FILES dist/firefox/ && rm dist/firefox/icons/*.svg
node -e '
const fs = require("fs"), f = "dist/firefox/manifest.json", m = JSON.parse(fs.readFileSync(f));
m.background = { scripts: ["background.js"] };
m.browser_specific_settings = {
  gecko: { id: "directchange@xeewi.cool", strict_min_version: "140.0", data_collection_permissions: { required: ["none"] } },
  gecko_android: { strict_min_version: "142.0" },
};
fs.writeFileSync(f, JSON.stringify(m, null, 2) + "\n");'
(cd dist/firefox && zip -qr ../directchange-firefox.zip .)
echo "dist/directchange-chrome.zip dist/directchange-firefox.zip"
