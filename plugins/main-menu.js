import { promises } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';

let Styles = (text, style = 1) => {
  const xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  const yStr = Object.freeze({
    1: 'αв¢∂єfgнιנкℓмиσρqяѕтυνωхуz1234567890'
  });
  const replacer = [];
  xStr.map((v, i) =>
    replacer.push({
      original: v,
      convert: yStr[style].split('')[i]
    })
  );
  const str = text.toLowerCase().split('');
  const output = [];
  str.map(v => {
    const find = replacer.find(x => x.original === v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};

let tags = {
  'anime': '📡 ANIME',
  'main': '💻 INFO',
  'search': '🔍 SEARCH',
  'game': '🎮 GAME',
  'serbot': '🤖 BOT SERVICES',
  'rpg': '🌐 RPG',
  'rg': '📜 REGISTRATION',
  'sticker': '🏷️ STICKER',
  'img': '🖼️ IMAGE',
  'group': '👥 GROUPS',
  'nable': '⚙️ SETTINGS',
  'premium': '💎 PREMIUM',
  'downloader': '⬇️ DOWNLOAD',
  'tools': '🔧 TOOLS',
  'fun': '🎲 ENTERTAINMENT',
  'nsfw': '❌ NSFW',
  'cmd': '📂 DATABASE',
  'owner': '🖥️ OWNER',
  'audio': '🔊 AUDIO',
  'advanced': '🛠️ ADVANCED',
};

const defaultMenu = {
  before: `
> 「 ⚡ SYSTEM ONLINE 」\n

╔════════════════════╗
║   🌐 *TECH MENU* 🌐   ║
╚════════════════════╝
╔═══ SYSTEM INFO ═══╗
║ 🖥️ *User:* %name  
║ 🔋 *Stars:* %limit  
║ 🔗 *Level:* %level [%xp4levelup XP for next level]  
║ 📈 *XP:* %exp / %maxexp  
║ 📊 *Total XP:* %totalexp  
╚════════════════════╝

⚙️ *SETTINGS* ⚙️  
╔═══ STATUS ═══╗
║ 🛠️ *Mode:* %mode  
║ 🔑 *Prefix:* [ *%_p* ]  
║ ⏱️ *Uptime:* %muptime  
║ 📦 *Database:* %totalreg  
╚════════════════════╝

\t\t💡 *COMMAND LIST* 💡
`.trimStart(),
  header: '╔═══ %category ═══╗',
  body: '║ ➔ . %cmd %islimit %isPremium\n',
  footer: '╚═════════════════╝',
  after: `© ${textbot}`,
};

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    const tag = `@${m.sender.split('@')[0]}`;
    const mode = global.opts['self'] ? 'Private' : 'Public';
    const _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {};
    const { exp, limit, level } = global.db.data.users[m.sender];
    const { min, xp, max } = xpRange(level, global.multiplier);
    const name = await conn.getName(m.sender);
    const d = new Date(new Date() + 3600000);
    const locale = 'es';
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    const time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const _uptime = process.uptime() * 1000;
    const muptime = clockString(_uptime);
    const totalreg = Object.keys(global.db.data.users).length;

    const help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }));

    for (let plugin of help) {
      if (plugin && 'tags' in plugin) {
        for (let tag of plugin.tags) {
          if (!(tag in tags) && tag) tags[tag] = tag;
        }
      }
    }

    const before = conn.menu?.before || defaultMenu.before;
    const header = conn.menu?.header || defaultMenu.header;
    const body = conn.menu?.body || defaultMenu.body;
    const footer = conn.menu?.footer || defaultMenu.footer;
    const after = conn.menu?.after || defaultMenu.after;
    const _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' +
          help
            .filter(menu => menu.tags && menu.tags.includes(tag) && menu.help)
            .map(menu =>
              menu.help.map(help =>
                body
                  .replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? ' [LIMIT]' : '')
                  .replace(/%isPremium/g, menu.premium ? ' [PREMIUM]' : '')
                  .trim()
              ).join('\n')
            ).join('\n') +
          footer;
      }),
      after
    ].join('\n');

    const text = _text.replace(/%(.*?)%/g, (_, name) => replace[name] || '');

    const img = 'https://i.ibb.co/qJNL5Bg/file.jpg';
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', text.trim(), m);
  } catch (e) {
    conn.reply(m.chat, '❌ Error: Unable to load menu.', m);
    throw e;
  }
};

handler.help = ['allmenu'];
handler.tags = ['main'];
handler.command = ['allmenu', 'menucompleto', 'menúcompleto', 'menú', 'menu'];
handler.register = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}