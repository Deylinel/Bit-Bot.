const sendTestMessage = async (conn) => {
    const channelJid = '0029VawF8fBBvvsktcInIz3m@broadcast'; // Reemplaza con el JID correcto
    const message = 'Mensaje de prueba para el canal.';

    try {
        console.log(`Intentando enviar mensaje al canal: ${channelJid}`);
        await conn.sendMessage(channelJid, { text: message });
        console.log('Mensaje enviado exitosamente al canal.');
    } catch (error) {
        console.error('Error al enviar mensaje al canal:', error);
    }
};

// Llama a esta función después de iniciar sesión