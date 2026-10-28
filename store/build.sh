#!/bin/sh
# Renders the Chrome Web Store images into store/out/ (24-bit PNG, no alpha).
cd "$(dirname "$0")" && mkdir -p out
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
shot() { # name key lang width height
  "$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=$4,$5 \
    --allow-file-access-from-files --screenshot="out/$1.png" "file://$PWD/render.html?k=$2&l=$3" 2>/dev/null
  magick "out/$1.png" -background white -alpha remove -alpha off "PNG24:out/$1.png"
}
for l in en fr; do
  for s in 1 2 3; do shot "screenshot-$s-$l" s$s $l 1280 800; done
  shot "promo-small-$l" small $l 440 280
  shot "promo-marquee-$l" marquee $l 1400 560
done
