const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  
  // Restringir el uso de ciertos prefijos si no es admin u owner
  if (usedPrefix === 'a' || usedPrefix === 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const mensaje = args.join` `;
  const iconoFuturista = `🚀 ⇢ ${mensaje}`; // Icono futurista para mensajes
  
  let texto = `╭══✦ 🌌 **Conexión Intergaláctica** ✦══╮\n`;
  texto += `🌱 *Revivamos las plantas del futuro*\n`;
  texto += `👾 *Participantes conectados:* ${participants.length}\n`;
  texto += `\n💬 Mensaje: ${iconoFuturista}\n\n`;

  // Función para obtener el código del país basado en el prefijo del número
  const obtenerCodigoPais = (prefijo) => {
    const codigosPais = {
      '504': '🇭🇳', // Honduras
      '1': '🇺🇸', // USA
      '34': '🇪🇸', // España
      '52': '🇲🇽', // México
    };
    return codigosPais[prefijo] || '🌍'; // Retorna 🌍 si el prefijo no está registrado
  };

  // Listar a los participantes con su respectivo país
  for (const miembro of participants) {
    const id = miembro.id.split('@')[0];
    const prefijo = id.slice(0, 3); // Ajustar según formato de números
    const codigoPais = obtenerCodigoPais(prefijo);
    texto += `👤 ${codigoPais} @${id}\n`;
  }

  texto += `╰═════✦ 🌱 *¡Cultivemos el futuro!* ✦═════╯`;

  // Enviar mensaje a todos los participantes mencionados
  conn.sendMessage(m.chat, { text: texto, mentions: participants.map((a) => a.id) });
};

// Metadatos del comando
handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;