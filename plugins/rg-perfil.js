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

const sendRegistrationMessage = async (conn, who) => {
    const channelJid = '0029VawF8fBBvvsktcInIz3m@g.us'; // JID del canal
    const username = conn.getName(who);
    const message = `🎉 *Nuevo Registro* 🎉\n\nEl usuario *${username}* se ha registrado exitosamente. ¡Bienvenido/a al sistema!`;

    try {
        await conn.sendMessage(channelJid, { text: message });
        console.log(`Mensaje enviado exitosamente al canal: ${channelJid}`);
    } catch (error) {
        console.error('Error al enviar el mensaje al canal:', error);
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

    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './default-profile.jpg'); // Imagen predeterminada si no existe
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

    // Obtener datos de nacionalidad usando el API
    let userNationalityData;
    try {
        let api = await fetch(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
        let response = await api.json();
        userNationalityData = response.result;
    } catch (error) {
        console.error('Error al obtener datos de nacionalidad:', error);
        userNationalityData = null;
    }
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido';

    // Si no está registrado, registrar y enviar mensaje al canal
    if (!registered) {
        global.db.data.users[who] = {
            ...global.db.data.users[who],
            registered: true,
            regTime: Date.now()
        };
        await sendRegistrationMessage(conn, who);
    }

    let noprem = `
╭───【 🛰️ *PROFILO DI UTENTE* 🛰️ 】───╮
⚡ *Nome:* ${username}
💡 *Età:* ${age}
🌍 *Genere:* ${genre}
🎂 *Compleanno:* ${birth}
💍 *Stato:* ${isMarried ? partnerName : 'Nessuno'}
💬 *Descrizione:* ${description}
🌐 *Paese:* ${userNationality}
🔒 *Registrato:* ${registered ? '✅' : '❌'}

💎 **RISORSE** 💎
💰 *Stelle:* ${estrellas || 0}
💥 *Esperienza:* ${exp || 0}
⚙️ *Ruolo:* ${role}
🔮 *Premium:* ${premium ? '✅' : '❌'}
╰────────────────────────────╯`.trim();

    let prem = `
╭───【 🌌 *UTENTE PREMIUM* 🌌 】───╮
⚡ *Nome utente:* ${username}
💡 *Età:* ${age}
🌍 *Genere:* ${genre}
🎂 *Compleanno:* ${birth}
💍 *Stato:* ${isMarried ? partnerName : 'Nessuno'}
💬 *Descrizione:* ${description}
🌐 *Paese:* ${userNationality}
🔒 *Registrato:* ${registered ? '✅' : '❌'}

💎 **RISORSE ESCLUSIVE** 💎
💰 *Stelle:* ${estrellas || 0}
💥 *Esperienza:* ${exp || 0}
⚙️ *Ruolo:* ${role}
🔮 *Premium:* ${premium ? '✅' : '❌'}
╰────────────────────────────╯
🚀 *Utente Eccezionale del Futuro* 🚀`.trim();

    conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, { mentions: [who] });
};

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;