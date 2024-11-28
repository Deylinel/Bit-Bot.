import Starlights from '@StarlightsTeam/Scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, '🧑‍💻 INGRESE EL LINK DE SPOTIFY', m);

let isSpotifyUrl = text.match(/^(https:\/\/open\.spotify\.com\/(album|track|playlist)\/[a-zA-Z0-9]+)/i);
if (!isSpotifyUrl) return conn.reply(m.chat, '🧑‍💻 INGRESE EL LINK DE SPOTIFY', m);

await m.react('🕓')
try {
let { title, artist, album, thumbnail, dl_url } = await Starlights.spotifydl(text);
let img = await (await fetch(thumbnail)).buffer();

let txt = `*乂  S P O T I F Y  -  D O W N L O A D*\n\n`;
    txt += `    ✩  *Título* : ${title}\n`;
    txt += `    ✩  *Álbum* : ${album}\n`;
    txt += `    ✩  *Artista* : ${artist}\n\n`;
    txt += `*- ↻ Los audios se están enviando, espera un momento. . .*`;

await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal);
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });

await m.react('✅');
} catch {
await m.react('✖️');
}
};

handler.help = ['spotifydl'];
handler.tags = ['downloader'];
handler.command = ['spotifydl'];
// handler.limit = 1;
handler.register = true;

export default handler;
