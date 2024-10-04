import sharp from 'sharp';
import * as fs from 'node:fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function processAndSaveImage(buffer): Promise<any> {
  // Define the directory path for saving the image
  // @ts-ignore
  const imageDirectory = path.resolve(__dirname, './../../assets/images');

  const filename = uuidv4() + '.restaurant.avatar';
  const savePath = path.join(imageDirectory, filename);
  // Ensure the directory exists, if not, create it
  if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory, { recursive: true });
  }
  return await sharp(buffer.buffer)
    .resize(600, 500) // Resize to 300x300 (or any size you want)
    .toFormat('jpeg', { mozjpeg: true })
    .toFile(savePath + '.jpeg');
}
