const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix === 'a' || usedPrefix === 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  
  const getFlag = (phone) => {
    const countryFlags = {
      // Puedes agregar más prefijos y banderas aquí
    };
    const prefix = phone.split('@')[0].slice(0, 3);
    return countryFlags[prefix] || '🌐'; // Predeterminado a un globo terráqueo
  };

  const pesan = args.join` `;
  const oi = `🛸⋆⟢ ${pesan}`;
  
  let teks = `╔═══❖•ೋ°°ೋ•❖═══╗\n      🌌 𝐌𝐔𝐋𝐓𝐈-𝐃𝐈𝐌𝐄𝐍𝐒𝐈𝐎𝐍𝐀𝐋 𝐂𝐀𝐋𝐋 🌌\n╚═══❖•ೋ°°ೋ•❖═══╝\n\n`;
  teks += `✦ **𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐧𝐠 𝐭𝐨 𝐏𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐬...** ✦\n`;
  teks += `🌟 **Participantes en órbita**: ${participants.length}\n\n`;
  teks += `🚀: *${oi}*\n\n`;
  teks += `╔═━──━────━═⊰•⊱═━────━──━═╗\n`;

  for (const mem of participants) {
    const flag = getFlag(mem.id);
    teks += `⟡ ✦ ${flag} @${mem.id.split('@')[0]}\n`;
  }
  
  teks += `╚═━──━────━═⊰•⊱═━────━──━═╝\n`;
  teks += `💾 **𝔻𝔸𝕋𝔸 𝕌ℙ𝕃𝕆𝔸𝔻 𝕊𝕌ℂℂ𝔼𝕊𝕊𝔽𝕌𝕃** 💾\n`;
  teks += `⚡ *Sistema en línea: Todos listos para interactuar* ⚡`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;