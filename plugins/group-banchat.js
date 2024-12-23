let handler = async (m) => {
    // Desactiva el bot en el chat
    global.db.data.chats[m.chat].isBanned = true;

    // Mensaje de confirmación con un diseño más tecnológico
    let message = `
🟠 *¡ALERTA! DESACTIVACIÓN DE BIT-BOT INICIADA...*

🚨 *SE HA DESACTIVADO BIT-BOT EN ESTE CHAT.*

🔒 *Acceso a las funciones del bot ha sido bloqueado temporalmente.*

📊 *Estado del chat:* BANEADO
🕒 *Fecha y Hora:* ${new Date().toLocaleString()}

*Operación completada con éxito.* 
🔧 Si necesitas reactivar el bot, usa el comando correspondiente.
    `;
    
    // Enviar el mensaje de desactivación con formato visual
    conn.reply(m.chat, message, m);
}

handler.help = ['banchat']
handler.tags = ['mods']
handler.command = ['banchat']
handler.rowner = true;

export default handler;