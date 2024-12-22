```javascript
const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  
  const getFlag = (phone) => {
    const countryFlags = {
      '1': '🇺🇸', // Estados Unidos
      '44': '🇬🇧', // Reino Unido
      '52': '🇲🇽', // México
      '91': '🇮🇳', // India
      // Agrega más prefijos y banderas según sea necesario
    };
    const prefix = phone.split('@')[0].slice(0, 3);
    return countryFlags[prefix] || '🏳'; // Bandera blanca para otros
  };

  const pesan = args.join` `;
  const oi = `⇢=͟͟͞͞🄰νίऽ૭ : ${pesan}`;
  let teks = `(づ｡◕‿◕｡)づ 💛 Revivan Plantas"\n  ⧼P̼⧽= ${participants.length} ℙ𝐀𝔍𝐈ꪀəﻜ\n\n ${oi}\n\n╭•┈┈•┈┈⊰🔥⃪᜔꫶┈•┈┈•◌ᜓ ݊ ᜒ𝅄\n`;
  for (const mem of participants) {
    const flag = getFlag(mem.id);
    teks += `│ 🫡ᝰ. ${flag} @${mem.id.split('@')[0]}\n`;
  }
  teks += `╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚`;
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;
```

