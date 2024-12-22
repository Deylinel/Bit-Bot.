const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  if (usedPrefix.toLowerCase() === 'a') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
  }
  
  const mensaje = args.join` `;
  const header = `🌌 *Transmisión del Núcleo Central* 🌌`;
  const contenido = `🛸 *Mensaje Prioritario:* ${mensaje}`;
  const footer = `⚙️ *Sistema Neural de Comunicación Activo* ⚙️`;
  
  let texto = `${header}\n\n${contenido}\n\n🚀 *Etiquetas Sincronizadas:* 🚀\n`;
  for (const miembro of participants) {
    texto += `🤖 @${miembro.id.split('@')[0]}\n`;
  }
  texto += `\n${footer}`;

  conn.sendMessage(m.chat, {text: texto, mentions: participants.map((a) => a.id)});
};
handler.help = ['tagall *<mensaje>*', 'invocar *<mensaje>*'];
handler.tags = ['grupo'];
handler.command = ['tagall', 'invocar', 'todos'];
handler.admin = true;
handler.group = true;

export default handler;