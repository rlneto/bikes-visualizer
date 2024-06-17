from PIL import Image
import os

input_dir = '/home/rlneto/Sync/SIN/PIBIT/pleno/Bikes/Bikes'
output_dir = '/home/rlneto/Sync/SIN/PIBIT/pleno/Bikes/Bikes/jpg'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for filename in os.listdir(input_dir):
    if filename.endswith('.ppm'):
        img = Image.open(os.path.join(input_dir, filename))
        new_filename = filename.replace('.ppm', '.jpg')
        img.save(os.path.join(output_dir, new_filename))
