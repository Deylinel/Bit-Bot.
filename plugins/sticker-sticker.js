 import { sticker } from '../lib/sticker.js';
// import uploadFile from '../lib/uploadFile.js';
// import uploadImage from '../lib/uploadImage.js';
// import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    const isMedia = /webp|image|video/.test(mime);

    const input = isMedia ? await q.download?.() : args[0];
    if (!input) {
      throw new Error(
        "No se detectó un archivo multimedia válido. Envía una imagen, video o gif antes de usar este comando."
      );
    }

    // Procesar archivo y generar sticker
    const stiker = await processMedia(input, mime);
    if (stiker) {
      conn.sendFile(
        m.chat,
        stiker,
        'sticker.webp',
        '',
        m,
        true,
        {
          contextInfo: {
            forwardingScore: 200,
            isForwarded: false,
            externalAdReply: {
              showAdAttribution: false,
              title: global.packsticker || 'Sticker generado',
              body: "Generado por un sistema automatizado avanzado.",
              mediaType: 2,
              sourceUrl: global.redes || '',
              thumbnail: global.icons || null
            }
          }
        },
        { quoted: m }
      );
    } else {
      throw new Error("No se pudo completar la conversión. Verifica el archivo o URL y vuelve a intentarlo.");
    }
  } catch (e) {
    console.error("Error:", e);
    conn.reply(m.chat, e.message || "Ocurrió un error al generar el sticker. Intenta nuevamente.", m);
  }
};

// Función modular para procesar medios
const processMedia = async (input, mime) => {
  try {
    // Intentar la conversión inicial
    return await sticker(
      input,
      false,
      global.packsticker || 'Sticker',
      global.author || 'Bot'
    );
  } catch (e) {
    console.error("Error en la conversión inicial:", e);

    // Fallback: Subir archivo y convertir
    let out;
    if (/webp/.test(mime)) {
      out = await webp2png(input);
    } else if (/image/.test(mime)) {
      out = await uploadImage(input);
    } else if (/video/.test(mime)) {
      out = await uploadFile(input);
    } else {
      throw new Error("Tipo de archivo no soportado.");
    }

    if (typeof out !== 'string') {
      throw new Error("Error al procesar el archivo multimedia.");
    }

    return await sticker(
      false,
      out,
      global.packsticker || 'Sticker',
      global.author || 'Bot'
    );
  }
};

// Función para validar URLs
const isUrl = (text) => {
  return /^https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i.test(text);
};

handler.help = ['sticker <imagen>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.group = false;
handler.register = true;
handler.command = ['s', 'sticker', 'stiker'];

export default handler;