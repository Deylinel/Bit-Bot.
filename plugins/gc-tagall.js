const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  
  // Bloquear prefijos no deseados si no es admin u owner
  if (usedPrefix === 'a' || usedPrefix === 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const mensaje = args.join` `;
  const iconoFuturista = `🚀 **⇢** ${mensaje}`; // Icono futurista para el mensaje
  
  let texto = `╭═══⟪ 🌌 **Interconexión Galáctica** 🌌 ⟫═══╮\n`;
  texto += `🌱 **¡Reviviendo el futuro verde!**\n`;
  texto += `👾 **Participantes conectados:** ${participants.length}\n`;
  texto += `\n💬 **Mensaje principal:**\n${iconoFuturista}\n\n`;
  texto += `🌍 **Mapa de conexiones:**\n`;

  // Función para obtener la bandera del país basado en el prefijo del número
  const obtenerBanderaPorPrefijo = (prefijo) => {
    const codigosPais = {
      '504': '🇭🇳', // Honduras
      '1': '🇺🇸',  // USA
      '34': '🇪🇸', // España
      '52': '🇲🇽', // México
      '91': '🇮🇳', // India
      '44': '🇬🇧', // Reino Unido
      '81': '🇯🇵', // Japón
      '86': '🇨🇳', // China
      '49': '🇩🇪', // Alemania
      '33': '🇫🇷', // Francia
      '7': '🇷🇺',  // Rusia
    };
    return codigosPais[prefijo] || '🌍'; // 🌍 para prefijos desconocidos
  };

  // Generar la lista de participantes con sus banderas
  for (const miembro of participants) {
    const id = miembro.id.split('@')[0]; // Obtener el ID (antes de '@')
    const prefijo = id.slice(0, 3); // Obtener los primeros 3 dígitos
    const bandera = obtenerBanderaPorPrefijo(prefijo);
    texto += `👤 ${bandera} **@${id}**\n`;
  }

  texto += `╰═════⟪ 🌱 **Cultivemos el futuro** 🌱 ⟫═════╯`;

  // Enviar el mensaje al grupo con las menciones
  conn.sendMessage(m.chat, { text: texto, mentions: participants.map((a) => a.id) });
};

// Metadatos del comando
handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;