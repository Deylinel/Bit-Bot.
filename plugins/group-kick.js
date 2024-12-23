let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {

let kickte = `✦❂✿ 𝑬𝒔𝒄𝒂𝒏𝒆𝒐 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂𝒅𝒐 ✿❂✦\n❉❦ 𝑷𝒐𝒓 𝒇𝒂𝒗𝒐𝒓 𝒎𝒆𝒏𝒄𝒊𝒐𝒏𝒂 𝒂𝒍 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒖𝒈𝒍𝒊𝒛𝒂𝒅𝒐 𝒓𝒆𝒇𝒖𝒆𝒓𝒕𝒆. ❦❉`;

if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
let owr = m.chat.split`-`[0];

await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

// Mensaje de eliminación
m.reply(`✦✿❂ 𝑼𝒔𝒖𝒂𝒓𝒊𝒐 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒅𝒐 𝒔𝒂𝒃𝒊𝒆𝒏𝒅𝒐 𝒔𝒖 𝑷𝒓𝒐𝒑𝒐𝒔𝒊𝒕𝒐 𝒈𝒓𝒖𝒑𝒐. ❂✿✦`);

m.reply(`❉❥ღ 𝑳𝒐 𝒔𝒊𝒆𝒏𝒕𝒐, 𝒉𝒂𝒔 𝒔𝒊𝒅𝒐 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒅𝒐 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐, 𝒑𝒐𝒓 𝒅𝒊𝒇𝒊𝒄𝒖𝒍𝒕𝒂𝒅 𝒅𝒆 𝑺𝒊𝒏𝒄𝒓𝒐𝒏𝒊𝒛𝒂𝒄𝒊𝒐́𝒏. 💫🚀`, user);

}

handler.help = ['kick *@user*']
handler.tags = ['group']
handler.command = ['kick', 'expulsar'] 
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler;