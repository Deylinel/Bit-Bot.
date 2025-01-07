import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let img = imagen1; // Aquí debes reemplazar `imagen1` con la URL de la imagen o variable adecuada
  let chat = global.db.data.chats[m.chat];

  // **Bienvenida de Usuario**
  if (chat.welcome && m.messageStubType == WAMessageStubType.NEW_PARTICIPANT) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let welcome = `🚀≺ TECNO-BOT 
「 Bienvenida 」 
「 ${user} 」
「 Grupo: ${groupMetadata.subject} 」
\n  ιαɳαʅҽʝαɳԃɾσσƙ15x`;

    await conn.sendLuffy(m.chat, packname, textbot, welcome, img, img, redes, fkontak);
  }

  // **Despedida de Usuario**
  if (chat.welcome && m.messageStubType == WAMessageStubType.REMOVED) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let bye = `🚀≺ TECNO-BOT 
「 Adiós 」 
「 ${user} 」
「 Hasta pronto 」
\n  ιαɳαʅҽʝαɳԃɾσσƙ15x`;

    await conn.sendLuffy(m.chat, packname, textbot, bye, img, img, redes, fkontak);
  }

  // **Expulsión de Usuario**
  if (chat.welcome && m.messageStubType == WAMessageStubType.KICK) {
    let user = `@${m.messageStubParameters[0].split`@`[0]}`;
    let kick = `🚀≺ TECNO-BOT 
「 Expulsado 」 
「 ${user} 」
「 No se permite reconexión sin autorización 」
\n  ιαɳαʅҽʝαɳԃɾσσƙ15x`;

    await conn.sendLuffy(m.chat, packname, textbot, kick, img, img, redes, fkontak);
  }
}