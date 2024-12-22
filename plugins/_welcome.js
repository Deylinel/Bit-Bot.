import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://i.ibb.co/dJFGxYG/file.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  // **Bienvenida de Usuario** - Estilo Futurista
  if (chat.bienvenida && m.messageStubType == 27) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`
    let welcome = chat.sWelcome ? chat.sWelcome.replace('@user', () => user) : `
    ╭─【 💻 *BIENVENIDO AL SISTEMA* 💻 】───
    │🌟 *Usuario Detectado:* @${m.messageStubParameters[0].split`@`[0]}
    │⚡ *Grupo:* ${groupMetadata.subject}
    │🚀 *¡Conexión Establecida...* 
    │🔵 *Bienvenido a la red de ${groupMetadata.subject}*
    │🌐 *Explora el sistema.*
    ╰────────────────────────────┈ ⬇️`
    
    await conn.sendAi(m.chat, botname, textbot, welcome, img, img, canal)
  }

  // **Despedida de Usuario** - Estilo Futurista
  if (chat.bienvenida && m.messageStubType == 28) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`
    let bye = chat.sBye ? chat.sBye.replace('@user', () => user) : `
    ╭─【 💻 *SESION TERMINADA* 💻 】───
    │❌ *Usuario Desconectado:* @${m.messageStubParameters[0].split`@`[0]}
    │⚡ *Grupo:* ${groupMetadata.subject}
    │💥 *¡Conexión perdida!*
    │🚫 *Despedida completada.*
    ╰────────────────────────────┈ 🚪`
    
    await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal)
  }

  // **Expulsión de Usuario** - Estilo Futurista
  if (chat.bienvenida && m.messageStubType == 32) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`
    let kick = chat.sBye ? chat.sBye.replace('@user', () => user) : `
    ╭─【 💻 *ACCESO REVOCADO* 💻 】───
    │🔴 *Usuario Expulsado:* @${m.messageStubParameters[0].split`@`[0]}
    │⚡ *Grupo:* ${groupMetadata.subject}
    │🚫 *Acceso Revocado. Desconexión en curso...*
    │💢 *Operación finalizada.*
    ╰────────────────────────────┈ ❌`
    
    await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal)
  }
}