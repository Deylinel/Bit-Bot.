 import { sticker } from '../lib/sticker.js';
// import uploadFile from '../lib/uploadFile.js';
// import uploadImage from '../lib/uploadImage.js';
// import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;

  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 8) {
        return m.reply(
          "Error: Los videos no pueden exceder los 8 segundos de duración."
        );
      }

      let img = await q.download?.();
      if (!img) {
        return conn.reply(
          m.chat,
          "Error: No se detectó un archivo multimedia válido. Envía una imagen, video o gif antes de usar este comando.",
          m
        );
      }

      let out;
      try {
        stiker = await sticker(img, false, global.packsticker, global.author);
      } catch (e) {
        console.error("Error en la conversión inicial:", e);
        if (/webp/g.test(mime)) {
          out = await webp2png(img);
        } else if (/image/g.test(mime)) {
          out = await uploadImage(img);
        } else if (/video/g.test(mime)) {
          out = await uploadFile(img);
        }

        if (typeof out !== 'string') {
          out = await uploadImage(img);
        }

        stiker = await sticker(false, out, global.packsticker, global.author);
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.author);
      } else {
        return m.reply("Error: La URL proporcionada no es válida.");
      }
    }
  } catch (e) {
    console.error("Error general:", e);
  } finally {
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
      conn.reply(
        m.chat,
        "Error: La conversión no pudo completarse. Verifica el archivo o URL e intenta nuevamente.",
        m
      );
    }
  }
};

handler.help = ['sticker <imagen>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.group = false;
handler.register = true;
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

const isUrl = (text) => {
  return text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  );
};