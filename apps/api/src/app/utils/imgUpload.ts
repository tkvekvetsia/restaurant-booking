// Define the directory for saving restaurant avatars
import path from 'path';
import fs from 'node:fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const avatarDirectory = path.join('./../../', 'assets', 'images');

if (!fs.existsSync(avatarDirectory)) {
  fs.mkdirSync(avatarDirectory, { recursive: true });
}

export async function processAndSaveImage(buffer): Promise<any> {
  // Generate unique filename
  // const filepath = path.join(avatarDirectory, filename);

  // Use sharp to compress the image and save it as a JPEG
  let result: any;
  await sharp(buffer.buffer)
    .resize(600, 500) // Resize to 300x300 (or any size you want)
    .toFormat('jpeg', { mozjpeg: true })
    .toBuffer()
    .then(data => {
      result = data.toString('base64');
    });
  return result;
  // Compress the image with 80% quality
}
