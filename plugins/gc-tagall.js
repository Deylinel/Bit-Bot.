const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix === 'a' || usedPrefix === 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const getFlag = (phone) => {
    const countryFlags = {
      // Puedes agregar más prefijos y banderas si lo necesitas
    };
    const prefix = phone.split('@')[0].slice(0, 3);
    return countryFlags[prefix] || '🚩'; // Bandera predeterminada
  };

  const pesan = args.join` `;
  const oi = `⚡💬 𝐒𝐈𝐒𝐓𝐄𝐌𝐀: ${pesan}`;
  
  let teks = `╔═━────━═⊰ **𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃** ⊱═━────━═╗\n`;
  teks += `\n🌌 **𝐒𝐈𝐍𝐆𝐔𝐋𝐀𝐑 𝐍𝐄𝐓𝐖𝐎𝐑𝐊 𝐂𝐀𝐋𝐋** 🌌\n`;
  teks += `👾 **𝐀𝐜𝐭𝐢𝐯𝐨𝐬**: ${participants.length}\n\n`;
  teks += `${oi}\n\n`;
  teks += `╭───≽「 **𝐌𝐀𝐑𝐂𝐀 𝐔𝐍𝐈𝐕𝐄𝐑𝐒𝐀𝐋** 」───≼\n`;
  
  for (const mem of participants) {
    const flag = getFlag(mem.id);
    teks += `┃ ✦ ${flag} @${mem.id.split('@')[0]}\n`;
  }

  teks += `╰───━═⊰ **𝐓𝐄𝐋𝐄𝐌𝐄𝐓𝐑𝐈𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀** ⊱━────╯\n`;
  teks += `\n🛸 **𝐒𝐓𝐀𝐓𝐔𝐒**: Preparado para interacción ⚙️`;
  teks += `\n📡 **𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎𝐍 𝐄𝐍𝐕𝐈𝐀𝐃𝐀** ✅`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;