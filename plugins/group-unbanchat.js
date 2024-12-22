let handler = async (m, { conn, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)

    // Activación del bot con diseño futurista
    global.db.data.chats[m.chat].isBanned = false
    const futuristaMsg = `
⚡️🔊 **BIT-BOT ACTIVADO** 🔊⚡️

🚀 *Estado:* ACTIVADO 🚀

🔑 *Reactivar: Contactar admin* 🔑

🛸 *¡Conectando de nuevo!* 🛸
    `
    await conn.reply(m.chat, futuristaMsg, m, rcanal)
    await m.react('✅')
}
handler.help = ['desbanearbot']
handler.tags = ['group']
handler.command = ['desbanearbot', 'unbanchat']
handler.group = true 
export default handler