import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';

// Configuración de la API de OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de configurar tu API Key en las variables de entorno
});
const openai = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*👻 Por favor ingrese una descripción del dibujo o imagen que desea generar*`;
  
  m.react('🕒');
  await conn.sendMessage(m.chat, { text: '*👻 Generando imagen...*' }, { quoted: m });

  try {
    // Solicitar la generación de la imagen a la API de OpenAI
    const response = await openai.createImage({
      prompt: text,
      n: 1, // Generar una sola imagen
      size: "1024x1024", // Tamaño de la imagen
    });

    const imageUrl = response.data.data[0].url;

    // Descargar la imagen generada
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error('Error al descargar la imagen');
    const buffer = await imageResponse.buffer();

    m.react('✔️');
    await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
  } catch (error) {
    console.error(error);
    throw `*🚨 Lo sentimos, ocurrió un error al generar la imagen 😔*`;
  }
};

handler.tags = ['tools'];
handler.help = ['genearimg <descripción>'];
handler.command = ['genearimg', 'imgg'];

export default handler;