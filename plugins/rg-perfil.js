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

    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://example.com/default-profile-picture.jpg');
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
    let api = await fetch(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
    let userNationalityData = await api.json();
    let userNationality = userNationalityData.result ? `${userNationalityData.result.name} ${userNationalityData.result.emoji}` : 'Desconocido';

    // Perfil con más diseño visual y separación de secciones
    let profileMessage = `
╭───────────────────────────╮
│  🌟 *PERFIL DE USUARIO* 🌟  │
├───────────────────────────┤
│  👤 *Nombre:* ${username}    │
│  🔢 *Edad:* ${age}          │
│  🌍 *Género:* ${genre}       │
│  🎂 *Cumpleaños:* ${birth}   │
│  💍 *Estado:* ${isMarried ? partnerName : 'Soltero'} │
│  💬 *Descripción:* ${description} │
│  🌐 *País:* ${userNationality} │
│  🔒 *Registrado:* ${registered ? '✅' : '❌'} │
├───────────────────────────┤
│  💎 **RECURSOS** 💎        │
│  💰 *Estrellas:* ${estrellas || 0}   │
│  💥 *Experiencia:* ${exp || 0}       │
│  ⚙️ *Rol:* ${role}              │
│  🔮 *Premium:* ${premium ? '✅' : '❌'}   │
╰───────────────────────────╯
`.trim();

    let premiumMessage = `
╭────────────────────────────╮
│  🌌 *USUARIO PREMIUM* 🌌   │
├────────────────────────────┤
│  👤 *Usuario:* ${username}      │
│  🔢 *Edad:* ${age}             │
│  🌍 *Género:* ${genre}         │
│  🎂 *Cumpleaños:* ${birth}     │
│  💍 *Estado:* ${isMarried ? partnerName : 'Soltero'} │
│  💬 *Descripción:* ${description} │
│  🌐 *País:* ${userNationality} │
│  🔒 *Registrado:* ${registered ? '✅' : '❌'} │
├────────────────────────────┤
│  💎 **RECURSOS EXCLUSIVOS** 💎 │
│  💰 *Estrellas:* ${estrellas || 0}   │
│  💥 *Experiencia:* ${exp || 0}       │
│  ⚙️ *Rol:* ${role}                │
│  🔮 *Premium:* ${premium ? '✅' : '❌'} │
╰────────────────────────────╯
🚀 *Usuario de la Galaxia Premium* 🚀
`.trim();

    // Enviar el perfil con diseño mejorado
    conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? premiumMessage.trim() : profileMessage.trim()}`, m, { mentions: [who] });
};

handler.help = ['perfil', 'profile'];
handler.register = true;
handler.group = true;
handler.tags = ['perfil'];
handler.command = ['profile', 'perfil'];

export default handler;