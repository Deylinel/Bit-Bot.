const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    MessageRetryMap,
    makeCacheableSignalKeyStore,
    jidNormalizedUser,
} = await import('@whiskeysockets/baileys');

import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import readline from 'readline';
import qrcode from 'qrcode';
import crypto from 'crypto';
import fs from 'fs';
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws;
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

if (!Array.isArray(global.conns)) global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command }) => {
    const parent = args[0] === 'plz' ? _conn : global.conn;
    if (!(args[0] === 'plz' || parent.user.jid === _conn.user.jid)) {
        return m.reply(`Este comando solo puede ser usado en el bot principal. wa.me/${parent.user.jid.split`@`[0]}?text=${usedPrefix}code`);
    }

    async function serbot() {
        const authFolderB = m.sender.split('@')[0];
        const sessionPath = `./Sesion Subbots/${authFolderB}`;

        if (!fs.existsSync(sessionPath)) {
            fs.mkdirSync(sessionPath, { recursive: true });
        }
        if (args[0]) {
            const creds = JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8'));
            fs.writeFileSync(`${sessionPath}/creds.json`, JSON.stringify(creds, null, '\t'));
        }

        const { state, saveState, saveCreds } = await useMultiFileAuthState(sessionPath);
        const { version } = await fetchLatestBaileysVersion();
        const msgRetryCounterCache = new NodeCache();

        const connectionOptions = {
            logger: pino({ level: 'silent' }),
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
            },
            markOnlineOnConnect: true,
            generateHighQualityLinkPreview: true,
            msgRetryCounterCache,
            version,
        };

        let conn = makeWASocket(connectionOptions);

        conn.isInit = false;

        async function connectionUpdate(update) {
            const { connection, lastDisconnect, qr } = update;
            const reason = lastDisconnect?.error?.output?.statusCode;

            if (connection === 'close' && reason !== DisconnectReason.loggedOut) {
                console.error(`Conexión perdida. Motivo: ${reason}. Intentando reconectar...`);
                setTimeout(serbot, 5000); // Reconectar después de 5 segundos.
            } else if (connection === 'open') {
                console.log('Bot conectado exitosamente.');
                global.conns.push(conn);
                await parent.reply(
                    m.chat,
                    args[0]
                        ? 'Conectado con éxito.'
                        : '*[ Conexión Exitosa 🤍 ]*\n\n_Reconexión automática habilitada._',
                    m
                );
            }

            if (qr) {
                console.log('QR generado, escanea para conectar.');
            }
        }

        conn.ev.on('connection.update', connectionUpdate);

        conn.ev.on('creds.update', saveCreds);

        setInterval(async () => {
            if (!conn.user) {
                try {
                    conn.ws.close();
                } catch {}
                conn.ev.removeAllListeners();
                global.conns = global.conns.filter((c) => c !== conn);
            }
        }, 60000);
    }

    await serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'serbotcode'];
handler.rowner = false;

export default handler;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}