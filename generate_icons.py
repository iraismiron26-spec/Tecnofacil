from pathlib import Path
from PIL import Image, ImageDraw

icons_dir = Path('icons')
icons_dir.mkdir(exist_ok=True)
for size in [192, 512]:
    img = Image.new('RGBA', (size, size), (29, 78, 216, 255))
    draw = ImageDraw.Draw(img)
    circle_radius = size // 3
    draw.ellipse((size//2-circle_radius, size//2-circle_radius, size//2+circle_radius, size//2+circle_radius), fill=(255, 255, 255, 255))
    line_width = max(4, size // 20)
    draw.line((size*0.35, size*0.52, size*0.45, size*0.62), fill=(29, 78, 216, 255), width=line_width)
    draw.line((size*0.45, size*0.62, size*0.65, size*0.38), fill=(29, 78, 216, 255), width=line_width)
    img.save(icons_dir / f'icon-{size}.png')
print('icons created')
