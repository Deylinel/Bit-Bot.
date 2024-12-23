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
    const channelJid = '0029VawF8fBBvvsktcInIz3m@broadcast'; // Ajuste del JID del canal
    const username = conn.getName(who);
    const message = `🎉 *Nuevo Registro* 🎉\n\nEl usuario *${username}* se ha registrado exitosamente. ¡Bienvenido/a al sistema!`;

    try {
        console.log(`Enviando mensaje al canal: ${channelJid}`);
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

    try {
        let pp = await conn.profilePictureUrl(who, 'image').catch(() => './default-profile.jpg');
        let { premium, level, genre, birth, description, estrellas, exp, registered, age, role } = global.db.data.users[who] || {};
        let username = conn.getName(who);

        genre = genre || 'No especificado';
        age = registered ? (age || 'Desconocido') : 'Sin especificar';
        birth = birth || 'No Establecido';
        description = description || 'Sin Descripción';
        role = role || 'Aldeano';

        let isMarried = who in global.db.data.marriages;
        let partner = isMarried ? global.db.data.marriages[who] : null;
        let partnerName = partner ? conn.getName(partner) : 'Nadie';

        // Datos de nacionalidad
        let userNationality = 'Desconocido';
        try {
            let api = await fetch(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
            let response = await api.json();
            if (response.result) {
                userNationality = `${response.result.name} ${response.result.emoji}`;
            }
        } catch (error) {
            console.error('Error al obtener nacionalidad:', error);
        }

        // Registrar si no está registrado
        if (!registered) {
            global.db.data.users[who] = {
                ...global.db.data.users[who],
                registered: true,
                regTime: Date.now()
            };
            console.log(`Usuario ${username} registrado con éxito.`);
            await sendRegistrationMessage(conn, who);
        }

        let message = `
╭───【 🛰️ *Perfil de Usuario* 🛰️ 】───╮
⚡ *Nombre:* ${username}
💡 *Edad:* ${age}
🌍 *Género:* ${genre}
🎂 *Cumpleaños:* ${birth}
💍 *Estado:* ${isMarried ? partnerName : 'Ninguno'}
💬 *Descripción:* ${description}
🌐 *País:* ${userNationality}
🔒 *Registrado:* ✅

💎 **Recursos** 💎
💰 *Estrellas:* ${estrellas || 0}
💥 *Experiencia:* ${exp || 0}
⚙️ *Rol:* ${role}
🔮 *Premium:* ${premium ? '✅' : '❌'}
╰────────────────────────────╯`.trim();

        conn.sendFile(m.chat, pp, 'perfil.jpg', message, m, { mentions: [who] });
    } catch (error) {
        console.error('Error en el handler de perfil:', error);
    }
};

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler