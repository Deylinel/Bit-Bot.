import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*👻 Ingrese un texto para generar la imagen*`;

  m.react('🕒');
  await conn.sendMessage(m.chat, { text: '*👻 Generando Imagen...*' }, { quoted: m });

  try {
    // Solicitar la generación de la imagen a la API
    const response = await fetch(`https://eliasar-yt-api.vercel.app/api/canvas/logo?texto=${encodeURIComponent(text)}`);
    if (!response.ok) throw new Error('Error en la respuesta de la API al intentar generar la imagen');

    const buffer = await response.buffer();

    // Enviar la imagen con el texto debajo
    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `BIT - BOT > IMÁGEN`
    }, { quoted: m });

    m.react('✔️');
  } catch (error) {
    console.error('Error al generar la imagen:', error);
    throw `*🚨 Lo sentimos, ocurrió un error al generar la imagen. Verifique el texto ingresado e intente nuevamente.*`;
  }
};

handler.tags = ['tools'];
handler.help = ['.imagen <texto>'];
handler.command = ['.imagen']; // Comando que activa este handler

export default handler;