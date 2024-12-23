const sendRegistrationMessage = async (conn, who) => {
    const channelJid = '0029VawF8fBBvvsktcInIz3m@broadcast'; // JID del canal
    const username = conn.getName(who);
    const message = `🎉 *Nuevo Registro* 🎉\n\nEl usuario *${username}* se ha registrado exitosamente. ¡Bienvenido/a al sistema!`;

    try {
        console.log(`Enviando mensaje de registro al canal: ${channelJid}`);
        await conn.sendMessage(channelJid, { text: message });
        console.log('Mensaje enviado exitosamente al canal.');
    } catch (error) {
        console.error('Error al enviar el mensaje al canal:', error);
    }
};

var handler = async (m, { conn }) => {
    loadMarriages();

    let who = m.mentionedJid?.[0] || m.sender;

    // Registro del usuario
    if (!global.db.data.users[who]?.registered) {
        global.db.data.users[who] = {
            ...global.db.data.users[who],
            registered: true,
            regTime: Date.now()
        };
        console.log(`Usuario registrado: ${who}`);
        await sendRegistrationMessage(conn, who);
    } else {
        console.log('El usuario ya está registrado.');
    }
};

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;