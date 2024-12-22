let handler = async (m, { conn, isAdmin, isROwner, isCreator }) => {
    // Número especificado que puede usar el bot, incluso cuando esté baneado
    const allowedNumber = '50488198573';

    // Verificar si el usuario es el número permitido o tiene permisos especiales
    if (!(m.sender === allowedNumber || isAdmin || isROwner || isCreator)) {
        return dfail('admin', m, conn)
    }

    // Desactivar el bot para todos los demás, pero permitir que el número especificado lo use
    global.db.data.chats[m.chat].isBanned = true
    const futuristaMsg = `
🛸💻 **BIT-BOT DESACTIVADO EN ESTE CHAT** 💻🛸

🔒 *El acceso al bot ha sido restringido en este canal, su funcionalidad está suspendida.* 🔒

🚀 **Activado por:** ${m.pushName} 🚀

⚡️ *Si deseas reactivarlo, contacta con un administrador.* ⚡️
    
🎛️🔊 *¡Hasta que nos volvamos a conectar!* 🔊🎛️
    `
    await conn.reply(m.chat, futuristaMsg, m, rcanal)
    await m.react('✅')
}
handler.help = ['banearbot']
handler.tags = ['group']
handler.command = ['banearbot', 'banchat']
handler.group = true 
export default handler