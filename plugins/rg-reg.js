
import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`🤖 ACCESO AUTORIZADO.\n\n*¿QUIERES REINICIAR TU REGISTRO?*\n\nUTILIZA EL COMANDO PARA ELIMINAR TU PERFIL.\n*${usedPrefix}unreg* <Número de serie>`)
  if (!Reg.test(text)) return m.reply(`⚠️ FORMATO NO VÁLIDO.\n\nUSO DEL COMANDO: *${usedPrefix + command} nombre.edad*\nEjemplo: *${usedPrefix + command} ${name2}.16*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('💡 EL NOMBRE ES UN DATO OBLIGATORIO.')
  if (!age) return m.reply('💡 LA EDAD ES UN DATO OBLIGATORIO.')
  if (name.length >= 100) return m.reply('⚡ EL NOMBRE EXCEDE EL LÍMITE DE CARACTERES.')
  age = parseInt(age)
  if (age > 100) return m.reply('👴🏻 ¡ERROR DE EDAD! ¿SOY UN PROTOTIPO ANTIGUO?')
  if (age < 5) return m.reply('👶🏼 ALERTA: ¿ESTÁS EN LA FASE INICIAL DE LA MATRIX?')

  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true

  let sn = createHash('md5').update(m.sender).digest('hex')
  let img = await (await fetch(`https://i.ibb.co/Lg4nv9H/file.jpg`)).buffer()

  let txt = `–  *REGISTRO DE BIT - BOT PROTOCOL*\n\n`
      txt += `┌  💻  *NOMBRE* : ${name}\n`
      txt += `│  💻  *EDAD* : ${age} ciclos\n`
      txt += `│  💻  *CÓDIGO DE IDENTIFICACIÓN*\n`
      txt += `└  💻  ${sn}`

  await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)
  await m.react('✅')
}
handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar'] 

export default handler