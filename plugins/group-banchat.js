let handler = async (m, { conn, isAdmin, isROwner }) => {
    // Verificar si el usuario es administrador o el dueño del bot
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)

    // Desactivar bot con diseño futurista
    global.db.data.chats[m.chat].isBanned = true
    const futuristaMsg = `
🛸💻 **BIT-BOT DESACTIVADO** 💻🛸

🔒 *Acceso restringido* 🔒

🚀 *Por:* ${m.pushName} 🚀

⚡️ *Reactivar: Contactar admin* ⚡️
    
🎛️🔊 *¡Nos vemos pronto!* 🔊🎛️
    `
    await conn.reply(m.chat, futuristaMsg, m, rcanal)
    await m.react('✅')
}
handler.help = ['banearbot']
handler.tags = ['group']
handler.command = ['banearbot', 'banchat']
handler.group = true 
export default handler