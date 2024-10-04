// Define the directory for saving restaurant avatars
import * as url from 'url'; // import fs from 'node:fs';
import sharp from 'sharp';

// const avatarDirectory = path.join('./../../', 'assets', 'images');

// if (!fs.existsSync(avatarDirectory)) {
//   fs.mkdirSync(avatarDirectory, { recursive: true });
// }

export async function processAndSaveImage(buffer): Promise<any> {
  // Generate unique filename
  // const filepath = path.join(avatarDirectory, filename);

  // Use sharp to compress the image and save it as a JPEG
  const basePath = import.meta.url;
  return basePath;
  // return await sharp(buffer.buffer)
  //   .resize(600, 500) // Resize to 300x300 (or any size you want)
  //   .toFormat('jpeg', { mozjpeg: true })
  //   .toFile(basePath + '.jpeg');
  // Compress the image with 80% quality
}
