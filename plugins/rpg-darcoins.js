

import MessageType from '@whiskeysockets/baileys'
let impuesto = 0.02
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '🌠 MENCIONA AL USUARIO *@user.*'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '🌠 INGRESE LA CANTIDAD DE *🌠 ESTRELLAS* QUE DESEA TRANSFERIR.'
    if (isNaN(txt)) throw 'SOLO NÚMEROS 🔢.'
    let poin = parseInt(txt)
    let limit = poin
    let imt = Math.ceil(poin * impuesto)
    limit += imt
    if (limit < 1) throw '🏦 MÍNIMO *1 🌠 ESTRELLAS*.'
    let users = global.db.data.users
    if (limit > users[m.sender].limit) throw 'No tienes suficientes *❇️ Eris* para dar.'
    users[m.sender].limit -= limit
    users[who].limit += poin
    
    await m.reply(`*${-poin}* ❇️ Eris 
Impuesto 2% : *${-imt}* ❇️ Eris
Total gastado: *${-limit}* ❇️ Eris`)
    conn.fakeReply(m.chat, `*+${poin}* *❇️ Eris.*`, who, m.text)
}
handler.help = ['dareris *@user <cantidad>*']
handler.tags = ['rpg']
handler.command = ['darcoins', 'dareris']
handler.register = true 

export default handler