let handler = async (m, { conn, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)

    // Diseño futurista en el mensaje
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