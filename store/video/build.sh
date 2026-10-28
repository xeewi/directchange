#!/bin/sh
# Renders video.html frame by frame with headless Chrome, then assembles directchange-promo.mp4 (1080p, YouTube-ready).
cd "$(dirname "$0")" && rm -rf frames && mkdir frames
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FRAMES=${FRAMES:-$(seq 0 515)}
for f in $FRAMES; do echo $f; done | xargs -P 10 -I{} sh -c \
  '"$0" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1920,1080 --allow-file-access-from-files \
   --screenshot=frames/$(printf %04d {}).png "file://$PWD/video.html?f={}" 2>/dev/null' "$CHROME"
[ -n "$PREVIEW" ] && exit
ffmpeg -y -loglevel error -framerate 24 -i frames/%04d.png -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
  -movflags +faststart directchange-promo.mp4
