import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';

const loadMarriages = () => {
    if (fs.existsSync('./storage/databases/marry.json')) {
        const data = JSON.parse(fs.readFileSync('./storage/databases/marry.json', 'utf-8'));
        global.db.data.marriages = data;
    } else {
        global.db.data.marriages = {};
    }
};

var handler = async (m, { conn }) => {
    loadMarriages();

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }

    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1);
    let { premium, level, genre, birth, description, estrellas, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[who] || {};
    let username = conn.getName(who);

    genre = genre === 0 ? 'No especificado' : genre || 'No especificado';
    age = registered ? (age || 'Desconocido') : 'Sin especificar';
    birth = birth || 'No Establecido';
    description = description || 'Sin Descripción';
    role = role || 'Aldeano';

    let isMarried = who in global.db.data.marriages;
    let partner = isMarried ? global.db.data.marriages[who] : null;
    let partnerName = partner ? conn.getName(partner) : 'Nadie';
    let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
    let userNationalityData = api.data.result;
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido';

    let noprem = `
╭─〘 👤 *USER PROFILE* 👤 〙─╮
💬 *Name:* ${username}  
🛠️ *Age:* ${age}  
⚙️ *Gender:* ${genre}  
🎉 *Birthday:* ${birth}  
💍 *Marital Status:* ${isMarried ? partnerName : 'Single'}  
📖 *Description:* ${description}  
🔒 *Registered:* ${registered ? '✅' : '❌'}  
🌍 *Country:* ${userNationality}  

🔷 **RESOURCES** 🔷  
🌌 *Stars:* ${estrellas || 0}  
✨ *Experience:* ${exp || 0}  
🪐 *Rank:* ${role}  
🚀 *Premium:* ${premium ? '✅' : '❌'}  
╰────────────────────╯`.trim();

    let prem = `
🛸 **── USER PREMIUM ──**  
═══════════════════════  
🔷 **USER INFORMATION** 🔷  
📡 *Username:* ${username}  
🛠️ *Age:* ${age}  
⚙️ *Gender:* ${genre}  
🎂 *Birthday:* ${birth}  
💍 *Marital Status:* ${isMarried ? partnerName : 'Single'}  
📖 *Description:* ${description}  
🔒 *Registered:* ${registered ? '✅' : '❌'}  
🌍 *Country:* ${userNationality}  

═══════════════════════  
🌟 **EXCLUSIVE FEATURES** 🌟  
🛸 *Stars:* ${estrellas || 0}  
💫 *Experience:* ${exp || 0}  
⚜️ *Rank:* ${role}  
═══════════════════════  
🚀 *Outstanding User of the Future* 🚀  
`.trim();

    conn.sendFile(m.chat, pp, 'profile.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, { mentions: [who] });
};

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;