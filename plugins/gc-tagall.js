const handler = async (m, { conn, text, participants, args }) => {
  const mensaje = args.join` `;
  const iconoFuturista = `🚀 ⇢ ${mensaje}`; // Mensaje futurista

  let texto = `┌──⭓ *Conexión Intergaláctica*\n`;
  texto += `🌌 *Mensaje de la galaxia:*\n💬 ${iconoFuturista}\n\n`;
  texto += `🌍 *Participantes conectados:*\n`;

  // Función para obtener la bandera del país según el prefijo del número
  const obtenerBanderaPorPrefijo = (prefijo) => {
    const codigosPais = {
      '504': '🇭🇳', // Honduras
      '1': '🇺🇸',  // Estados Unidos
      '34': '🇪🇸', // España
      '52': '🇲🇽', // México
      '91': '🇮🇳', // India
      '44': '🇬🇧', // Reino Unido
      '81': '🇯🇵', // Japón
      '86': '🇨🇳', // China
      '49': '🇩🇪', // Alemania
      '33': '🇫🇷', // Francia
      '7': '🇷🇺',  // Rusia
      '54': '🇦🇷', // Argentina
      '55': '🇧🇷', // Brasil
      '58': '🇻🇪', // Venezuela
      '57': '🇨🇴', // Colombia
      '56': '🇨🇱', // Chile
      '63': '🇵🇭', // Filipinas
      '60': '🇲🇾', // Malasia
      '62': '🇮🇩', // Indonesia
      '48': '🇵🇱', // Polonia
      '351': '🇵🇹', // Portugal
      '61': '🇦🇺', // Australia
      '64': '🇳🇿', // Nueva Zelanda
      '91': '🇮🇳', // India
    };
    return codigosPais[prefijo] || '🌍'; // Si no encuentra bandera, retorna el icono genérico
  };

  // Iterar sobre los participantes y agregar al mensaje
  for (const miembro of participants) {
    const id = miembro.id.split('@')[0];
    const prefijo = id.slice(0, 3); // Obtener los primeros 3 dígitos del número
    const bandera = obtenerBanderaPorPrefijo(prefijo);
    texto += `🎄 ${bandera} @${id}\n`;
  }

  texto += `└───────⭓`;

  // Enviar mensaje a todos los participantes mencionados
  conn.sendMessage(m.chat, { text: texto, mentions: participants.map((a) => a.id) });
};

// Metadatos del comando
handler.help = ['todos <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = false; // Ahora todos los usuarios pueden usarlo
handler.group = true;

export default handler;