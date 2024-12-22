const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix === 'a' || usedPrefix === 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  
  const getFlag = (phone) => {
    const countryFlags = {
      // Puedes agregar más prefijos y banderas según sea necesario
    };
    const prefix = phone.split('@')[0].slice(0, 3);
    return countryFlags[prefix] || '🌐'; // Bandera predeterminada
  };

  const pesan = args.join` `;
  const oi = `🪐⬩⭑⁎⁺˳ ${pesan}`;
  let teks = `╭━━━━━━━༻❁༺━━━━━━━╮\n⟢ ⚡ 𝕄𝕆𝔻𝔼ℝℕ ℂ𝕆𝕄𝕄𝕌ℕ𝕀ℂ𝔸𝕋𝕀𝕆ℕ ⚡\n╰━━━━━━━༻❁༺━━━━━━━╯\n\n➤ ⟡ 『 *Mensaje Universal* 』⟡\n✧ 🚀 **PARTICIPANTES ACTIVOS**: ${participants.length}\n\n${oi}\n\n✦･ﾟ⟢⚙️⟣ • **𝔸𝕃𝕃 𝔻𝔼𝕍𝕀ℂ𝔼𝕊 𝕊𝔼𝕋** • ⟡･ﾟ✦\n╭⊱•──⊰🔹⊱──•⊰⊱─╮\n`;
  
  for (const mem of participants) {
    const flag = getFlag(mem.id);
    teks += `↳ ✦ ${flag} ⟡ @${mem.id.split('@')[0]}\n`;
  }
  
  teks += `╰─•⊱❖⊰•─•⊱─╯\n⟢⦿ ✧ ᴘʀᴇᴘᴀʀᴀᴅᴏ ғᴏʀ ᴅᴇᴘʟᴏʏ ✧ ⦿⟣`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;