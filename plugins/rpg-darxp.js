

import MessageType from '@whiskeysockets/baileys'
let impuesto = 0.02
let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '🏦 MENCIONA AL USUARIO *@user.*'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '🏦 INGRESE LA CANTIDAD DE *💫 XP* QUE QUIERES TRANSFERIR.'
  if (isNaN(txt)) throw 'SOLO NÚMEROS🔢.'
  let xp = parseInt(txt)
  let exp = xp
  let imt = Math.ceil(xp * impuesto)
  exp += imt
  if (exp < 1) throw '🏦 MÍNIMO 1 💫 XP.*'
  let users = global.db.data.users
  if (exp > users[m.sender].exp) throw '*💫 XP* INSUFICIENTE PARA TRANSFERIR.'
  users[m.sender].exp -= exp
  users[who].exp += xp

  await m.reply(`*${-xp}* 💫XP
Impuesto 2% : *${-imt}* 💫 XP 
Total gastado: *${-exp} 💫 XP*`)
  conn.fakeReply(m.chat, `*+${xp} 💫XP.*`, who, m.text)
}
handler.help = ['darxp *@user <cantidad>*']
handler.tags = ['rpg']
handler.command = ['darxp'] 
handler.register = true 

export default handler