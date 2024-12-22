const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const pesan = args.join` `;
  const oi = `⇢=͟͟͞͞🄰νίऽ૭ : ${pesan}`;

  let teks = `(づ｡◕‿◕｡)づ  Revivan Plantas"\n  ⧼P̼⧽= ${participants.length} ℙ𝐀𝔍𝐈ꪀəﻜ\n\n ${oi}\n\n╭•┈┈•┈┈⊰⃪᜔꫶┈•┈┈•◌ᜓ ݊ ᜒ𝅄\n`;

  // Function to get country code based on prefix (replace with your implementation)
  const getCountryCode = (prefix) => {
    // Implement logic to lookup country code based on prefix
    // You can use an external library or a local database
    // This is a placeholder for illustration
    const countryCodes = {
      '504': '🇭🇳', // Honduras
      '1': '🇺🇸', // USA (example)
    };
    return countryCodes[prefix] || ''; // Unknown flag for unsupported prefixes
  };

  for (const mem of participants) {
    const id = mem.id.split('@')[0];
    // Extract phone number prefix (assuming phone number is stored in 'id')
    const prefix = id.slice(0, 3); // Get first 3 digits (adjust based on phone number format)
    const countryCode = getCountryCode(prefix);
    teks += `│ 🫡ᝰ. ${countryCode} @${id}\n`;
  }

  teks += `╰─┐ • •ㅤ•-ˏˋ✿ˊˎ-• •ㅤ•
        ꒷︶︶꒷︶︶꒷꒦︶✧꒷₊˚`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos <mesaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;
export default handler;
