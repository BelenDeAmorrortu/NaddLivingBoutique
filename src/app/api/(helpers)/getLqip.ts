import sharp from "sharp";

async function bufferToBase64(buffer: Buffer): Promise<string> {
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

export async function getLqip(imageUrls: string[]): Promise<string[]> {
  const lqipPromises = imageUrls.map(async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Convertir a Buffer de Node.js
    const lqipBuffer = await sharp(buffer)
      .resize({ width: 10, height: 10 }) // Cambiar tamaño según sea necesario
      .toBuffer();
    return bufferToBase64(lqipBuffer);
  });
  return Promise.all(lqipPromises);
}
