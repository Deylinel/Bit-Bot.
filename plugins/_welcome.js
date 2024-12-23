import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://i.ibb.co/dJFGxYG/file.jpg');
  let img = await (await fetch(`${pp}`)).buffer();
  let chat = global.db.data.chats[m.chat];

  // **Bienvenida de Usuario** - Estilo Tecnológico
  if (chat.bienvenida && m.messageStubType == 27) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let welcome = chat.sWelcome 
      ? chat.sWelcome.replace('@user', () => user) 
      : `
╭─━━━⬣【  *🤖 BIENVENIDO AL NÚCLEO 🤖*  】⬣━━━
┃
┃ ⚙️ *Usuario:* ${user}
┃ 🖥️ *Grupo:* ${groupMetadata.subject}
┃ 🌐 *Estado:* *SINCRONIZADO CON ÉXITO*
┃ 
┃ 🟢 *NOTA: Conéctate y explora la interfaz.*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣`;

    await conn.sendAi(m.chat, botname, textbot, welcome, img, img, canal);
  }

  // **Despedida de Usuario** - Estilo Tecnológico
  if (chat.bienvenida && m.messageStubType == 28) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let bye = chat.sBye 
      ? chat.sBye.replace('@user', () => user) 
      : `
╭─━━━⬣【  *⚠️ SESIÓN FINALIZADA ⚠️*  】⬣━━━
┃
┃ 🔻 *Usuario Desconectado:* ${user}
┃ 🖥️ *Grupo:* ${groupMetadata.subject}
┃ ❌ *Estado:* *DESCONECTADO DEL SISTEMA*
┃ 
┃ 🚪 *Hasta la próxima conexión.*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣`;

    await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal);
  }

  // **Expulsión de Usuario** - Estilo Tecnológico
  if (chat.bienvenida && m.messageStubType == 32) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let kick = chat.sBye 
      ? chat.sBye.replace('@user', () => user) 
      : `
╭─━━━⬣【  *🛑 ACCESO DENEGADO 🛑*  】⬣━━━
┃
┃ 🔴 *Usuario Expulsado:* ${user}
┃ 🖥️ *Grupo:* ${groupMetadata.subject}
┃ ⚠️ *Estado:* *ELIMINADO DE LA BASE DE DATOS*
┃ 
┃ 🚫 *No se permiten reconexiones sin autorización.*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣`;

    await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal);
  }
}