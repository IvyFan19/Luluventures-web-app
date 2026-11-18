#!/usr/bin/env python3
"""Rebuild the landing site's ginkgo icon on a black tile (public/brand/deepvalues-icon-black-*).

There is no vector source for the gold ginkgo leaf, only the rendered tiles. The same leaf
exists on two backgrounds: the purple tile (deepvalues-icon-1024.png) and the dark purple tile
(deepvalues-icon-dark-1024.png). Both backgrounds are plain vertical gradients, so the two
renders give an exact matte: for each pixel, how much of the background shows through is
    k = (P_purple - P_dark) . (B_purple - B_dark) / |B_purple - B_dark|^2
and the leaf (with its soft drop shadow) over black is P_purple - k * B_purple. This keeps the
mark, its position and its anti-aliased edge exactly, with no purple fringe.

The rounded variants reuse the alpha channel of deepvalues-icon-rounded-1024.png, so the corner
shape is identical to the purple ones.

Run from the repo root:  uv run --with pillow --with numpy python scripts/brand/make-black-icon.py
"""
import os

import numpy as np
from PIL import Image

BRAND = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'public', 'brand')
PUBLIC = os.path.join(BRAND, '..')

# The landing page's dark theme: body and footer are #000000 (index.html, prefers-color-scheme: dark).
TILE_RGB = (0, 0, 0)

SQUARE_SIZES = [128, 180]
ROUNDED_SIZES = [64, 128]
FAVICON_SIZES = [16, 32, 48]


def load(name, mode='RGB'):
    return Image.open(os.path.join(BRAND, name)).convert(mode)


def black_master():
    p1 = np.asarray(load('deepvalues-icon-1024.png'), dtype=np.float64)
    p2 = np.asarray(load('deepvalues-icon-dark-1024.png'), dtype=np.float64)
    # Both backgrounds are horizontal bands: column 0 never touches the leaf or its shadow.
    b1 = p1[:, :1, :]
    b2 = p2[:, :1, :]
    db = b1 - b2
    k = ((p1 - p2) * db).sum(axis=2, keepdims=True) / (db * db).sum(axis=2, keepdims=True)
    k = np.clip(k, 0.0, 1.0)
    tile = np.asarray(TILE_RGB, dtype=np.float64).reshape(1, 1, 3)
    out = p1 - k * b1 + k * tile
    return Image.fromarray(np.clip(np.rint(out), 0, 255).astype(np.uint8), 'RGB')


def resized(img, size):
    return img if img.width == size else img.resize((size, size), Image.LANCZOS)


def main():
    master = black_master()
    master.save(os.path.join(BRAND, 'deepvalues-icon-black-1024.png'), optimize=True)
    # Social / schema.org image: same JPEG format as the purple one it replaces.
    master.save(os.path.join(BRAND, 'deepvalues-icon-black-1024.jpg'), quality=90, optimize=True)
    for s in SQUARE_SIZES:
        resized(master, s).save(os.path.join(BRAND, f'deepvalues-icon-black-{s}.png'), optimize=True)

    mask = load('deepvalues-icon-rounded-1024.png', 'RGBA').getchannel('A')
    rounded = master.convert('RGBA')
    rounded.putalpha(mask)
    for s in ROUNDED_SIZES:
        resized(rounded, s).save(os.path.join(BRAND, f'deepvalues-icon-black-rounded-{s}.png'), optimize=True)

    # Favicon: square tile like the purple favicon.ico it replaces. /favicon.ico and
    # /apple-touch-icon.png at the site root are requested by name, so they are replaced in place.
    ico = os.path.join(BRAND, 'favicon-black.ico')
    master.save(ico, sizes=[(s, s) for s in FAVICON_SIZES])
    master.save(os.path.join(PUBLIC, 'favicon.ico'), sizes=[(s, s) for s in FAVICON_SIZES])
    resized(master, 180).save(os.path.join(PUBLIC, 'apple-touch-icon.png'), optimize=True)


if __name__ == '__main__':
    main()
