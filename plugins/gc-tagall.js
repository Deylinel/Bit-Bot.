```javascript
const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  
  const getFlag = (phone) => {
    const countryFlags = {
      '1': '🇺🇸', '44': '🇬🇧', '52': '🇲🇽', '91': '🇮🇳', '504': '🇭🇳', '1684': '🇦🇸', 
      '358': '🇦🇽', '93': '🇦🇫', '374': '🇦🇲', '54': '🇦🇷', '297': '🇦🇼', '971': '🇦🇪', 
      '355': '🇦🇱', '672': '🇦🇶', '61': '🇦🇺', '376': '🇦🇩', '372': '🇦🇮', '244': '🇦🇴', 
      '43': '🇦🇹', '247': '🇦🇨', '994': '🇦🇿', '973': '🇧🇭', '880': '🇧🇩', '375': '🇧🇾',
      '32': '🇧🇪', '501': '🇧🇿', '229': '🇧🇯', '441481': '🇬🇬', '441534': '🇯🇪', '441624': '🇮🇲',
      // Agregar más prefijos según sea necesario
    };
    const prefix = phone.split('@')[0];
    for (const key in countryFlags) {
      if (prefix.startsWith(key)) return countryFlags[key];
    }
    return '🏳'; // Bandera blanca para otros
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