import { sticker } from '../lib/sticker.js';
// import uploadFile from '../lib/uploadFile.js';
// import uploadImage from '../lib/uploadImage.js';
// import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    const isMedia = /webp|image|video/.test(mime);

    // Descargar archivo multimedia o tomar URL
    const input = isMedia ? await q.download?.() : args[0];
    if (!input) {
      throw new Error(
        "⚠️ *No se detectó un archivo multimedia válido. Por favor, responde a una imagen, video o gif, o proporciona una URL válida para generar el sticker*."
      );
    }

    // Procesar archivo y generar sticker
    const stiker = await processMedia(input, mime);
    if (stiker) {
      await conn.sendFile(
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
              title: global.packsticker || '*Sticker creado con éxito* 🎨',
              body: "Generado por un sistema avanzado de automatización.",
              mediaType: 2,
              sourceUrl: global.redes || '',
              thumbnail: global.icons || null,
            },
          },
        },
        { quoted: m }
      );
    } else {
      throw new Error(
        "⚠️ *No se pudo completar la conversión. Verifica el archivo o URL y vuelve a intentarlo*."
      );
    }
  } catch (e) {
    console.error("Error en el handler:", e);
    await conn.reply(
      m.chat,
      e.message || "❌ *Ocurrió un error al generar el sticker. Intenta nuevamente*.",
      m
    );
  }
};

// Función para procesar medios y generar sticker
const processMedia = async (input, mime) => {
  try {
    // Primera tentativa: conversión directa
    return await sticker(
      input,
      false,
      global.packsticker || 'Sticker',
      global.author || 'Bot'
    );
  } catch (e) {
    console.error("Error en la conversión inicial:", e);

    // Intentar método alternativo de subida y conversión
    let uploadedUrl;
    if (/webp/.test(mime)) {
      uploadedUrl = await webp2png(input);
    } else if (/image/.test(mime)) {
      uploadedUrl = await uploadImage(input);
    } else if (/video/.test(mime)) {
      uploadedUrl = await uploadFile(input);
    } else {
      throw new Error("⚠️ *Tipo de archivo no soportado*.");
    }

    if (typeof uploadedUrl !== 'string') {
      throw new Error("⚠️ *Error al procesar el archivo multimedia*");
    }

    return await sticker(
      false,
      uploadedUrl,
      global.packsticker || 'Sticker',
      global.author || 'Bot'
    );
  }
};

// Validador de URLs
const isUrl = (text) => {
  return /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/?.*$/i.test(text);
};

handler.help = ['sticker <imagen>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.group = false;
handler.register = true;
handler.command = ['s', 'sticker', 'stiker'];

export default handler;