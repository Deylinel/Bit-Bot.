/* Código Original por Destroy
 - https://github.com/The-King-Destroy
 - Modificado para un diseño único y tecnológico.
 - Dejen créditos aunque sea gracias.
*/

import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/marriages.json');
let proposals = {}; 
let marriages = loadMarriages();
const confirmation = {};

function loadMarriages() {
    return fs.existsSync(marriagesFile) ? JSON.parse(fs.readFileSync(marriagesFile, 'utf8')) : {};
}

function saveMarriages() {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}

const handler = async (m, { conn, command }) => {
    const isPropose = /^marry$/i.test(command);
    const isDivorce = /^divorce$/i.test(command);

    const userIsMarried = (user) => marriages[user] !== undefined;

    try {
        if (isPropose) {
            const proposee = m.quoted?.sender || m.mentionedJid?.[0];
            const proposer = m.sender;

            if (!proposee) {
                if (userIsMarried(proposer)) {
                    return await conn.reply(m.chat, 
                        `🤖 *Módulo Matrimonial Futurista:*\n\n🚀 Ya estás casado con *${conn.getName(marriages[proposer])}*.\n💔 Usa *#divorce* si deseas finalizar este vínculo.`,
                        m
                    );
                } else {
                    throw new Error('💡 Debes mencionar a alguien para proponer matrimonio.\nEjemplo: *#marry @usuario*');
                }
            }
            if (userIsMarried(proposer)) throw new Error(`⚠️ Ya estás vinculado a *${conn.getName(marriages[proposer])}*.`);
            if (userIsMarried(proposee)) throw new Error(`⚠️ *${conn.getName(proposee)}* ya está en un vínculo con *${conn.getName(marriages[proposee])}*.`);
            if (proposer === proposee) throw new Error('🌀 No puedes proponerte matrimonio a ti mismo.');

            proposals[proposer] = proposee;
            const proposerName = conn.getName(proposer);
            const proposeeName = conn.getName(proposee);
            const confirmationMessage = `
✨ *Solicitud de Matrimonio Digital:*\n
💍 *${proposerName}* ha enviado una propuesta de matrimonio a *${proposeeName}*.\n\n
⚙️ Responde:\n
✅ "Sí" para aceptar.\n
❌ "No" para rechazar.\n
⏳ *Tienes 60 segundos para decidir.*
            `;
            await conn.reply(m.chat, confirmationMessage, m, { mentions: [proposee, proposer] });

            confirmation[proposee] = {
                proposer,
                timeout: setTimeout(() => {
                    conn.sendMessage(m.chat, { text: '⏳ *El tiempo ha expirado. La propuesta fue cancelada.*' }, { quoted: m });
                    delete confirmation[proposee];
                }, 60000)
            };

        } else if (isDivorce) {
            if (!userIsMarried(m.sender)) throw new Error('🤖 No estás en ningún vínculo activo.');

            const partner = marriages[m.sender];
            delete marriages[m.sender];
            delete marriages[partner];
            saveMarriages();

            await conn.reply(m.chat, 
                `💔 *Módulo Matrimonial Futurista:*\n\n*${conn.getName(m.sender)}* y *${conn.getName(partner)}* han terminado su vínculo.`,
                m
            );
        }
    } catch (error) {
        await conn.reply(m.chat, `⚠️ ${error.message}`, m);
    }
}

handler.before = async (m) => {
    if (m.isBaileys) return;
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;

    const { proposer, timeout } = confirmation[m.sender];

    if (/^No$/i.test(m.text)) {
        clearTimeout(timeout);
        delete confirmation[m.sender];
        return conn.sendMessage(m.chat, { text: '❌ *La propuesta fue rechazada.*' }, { quoted: m });
    }

    if (/^Si$/i.test(m.text)) {
        delete proposals[proposer];
        marriages[proposer] = m.sender;
        marriages[m.sender] = proposer;
        saveMarriages();

        const marriageMessage = `
🌌 *Vínculo Digital Confirmado:*\n\n
💍 *${conn.getName(proposer)}* & *${conn.getName(m.sender)}*\n
🎉 ¡Ahora están unidos por el sistema!\n\n
✨ *Disfruten su conexión eterna en esta galaxia virtual.* 🌠
        `;

        conn.sendMessage(m.chat, { text: marriageMessage, mentions: [proposer, m.sender] }, { quoted: m });

        clearTimeout(timeout);
        delete confirmation[m.sender];
    }
};

handler.tags = ['social'];
handler.help = ['marry *@usuario*', 'divorce'];
handler.command = ['marry', 'divorce'];
handler.group = true;

export default handler;