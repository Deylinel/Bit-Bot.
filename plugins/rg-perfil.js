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

    // Fetch user data
    let userData = global.db.data.users[who] || {};
    let { premium, level, genre, birth, description, estrellas, exp, lastclaim, registered, regTime, age, role } = userData;

    // Format data with futuristic elements (placeholders for actual implementation)
    let username = conn.getName(who);
    let userAvatar = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.imgur.com/DefaultAvatar.jpg'); // Replace with futuristic avatar generation
    genre = genre === 0 ? 'Desconocido (Actualizando Base de Datos BioGenéticos)' : genre || 'Desconocido (Actualizando Base de Datos BioGenéticos)';
    age = registered ? (age || 'Desconocido') : 'Sin Especificar (Calibrando Escáner Temporal)';
    birth = birth || 'No Establecido (Consultando Archivos Galácticos)';
    description = description || 'Sin Descripción (Análisis de Personalidad en Proceso)';
    role = role || 'Aldeano (Nivel de Autoridad Pendiente)';

    let isMarried = who in global.db.data.marriages;
    let partner = isMarried ? global.db.data.marriages[who] : null;
    let partnerName = partner ? conn.getName(partner) : 'Ninguno';

    // Fetch and format user's nationality using a futuristic API (replace with actual implementation)
    let apiResponse = await fetch(`https://api.futuristic-nationalities.com/user/${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
    let userNationalityData = await apiResponse.json();
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido (Buscando en Red Interplanetaria)';

    // Construct profile message with a futuristic theme
    let profileMessage = `
╭──⪩  ░░░░░░░░░░░░░░░░░░░░░░  ⪨
│⧼⧽ *Identificador Biométrico:*  ${username}
│⧼⧽ *Edad Biológica:*  ${age}
│⧼⚧️⧽ *Configuración Genética:*  ${genre}
│⧼⧽ *Fecha de Activación:*  ${birth}
│⧼‍❤️‍⧽ *Enlace Intergaláctico:*  ${isMarried ? partnerName : 'Ninguno'}
│ *Descripción Personal:*  ${description}
│⧼⧽ *Registro en la Red:*  ${registered ? 'Activado' : 'Pendiente'}
│⧼⧽ *Origen Interestelar:*  ${userNationality}

╰───────────────────⪨

╭────⪩   ░░░░░░░░░░░░░░░░░░░░░░  ⪨
│⧼⧽ *Unidades Estelares:*  ${estrellas || 0}
│⧼✨⧽ *Experiencia Acumulada:*  ${exp || 0}
│⧼⚜️⧽ *Rango de Autoridad:*  ${role}
╰───⪨  ░░░░░░░░░░░░░░░░░░░░░░  ⪨

*Actualizando Base de Datos Intergaláctica...*
`.trim();

    conn.sendFile(m.chat, userAvatar, 'perfil.jpg', profileMessage, m, { mentions: [who] });
};

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
 