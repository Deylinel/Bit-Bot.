let handler = async (m, { conn, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)

    // Activación del bot con diseño futurista
    global.db.data.chats[m.chat].isBanned = false
    const futuristaMsg = `
⚡️🔊 **BIT-BOT ACTIVADO EN ESTE GRUPO** 🔊⚡️

💬 *El bot ha sido reactivado con éxito, y está listo para volver a funcionar en este chat.* 💬

🚀 *Estado:* ACTIVADO 🚀

🔑 *Si deseas hacer modificaciones adicionales, contacta con los administradores del grupo.* 🔑

🛸 *¡Que la conectividad esté siempre contigo!* 🛸
    `
    await conn.reply(m.chat, futuristaMsg, m, rcanal)
    await m.react('✅')
}
handler.help = ['desbanearbot']
handler.tags = ['group']
handler.command = ['desbanearbot', 'unbanchat']
handler.group = true 
export default handler