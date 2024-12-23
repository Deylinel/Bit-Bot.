const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    MessageRetryMap,
    makeCacheableSignalKeyStore,
    jidNormalizedUser
} = await import('@whiskeysockets/baileys');
import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import readline from 'readline';
import qrcode from "qrcode";
import crypto from 'crypto';
import fs from "fs";
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws;
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

if (!Array.isArray(global.conns)) global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
    let parent = args[0] === 'plz' ? _conn : await global.conn;

    if (!(args[0] === 'plz' || (await global.conn).user.jid === _conn.user.jid)) {
        return m.reply(`Este comando solo puede ser usado en el bot principal! wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix}code`);
    }

    async function serbot() {
        let authFolderB = m.sender.split('@')[0];

        const sessionPath = `./Sesion Subbots/${authFolderB}`;
        if (!fs.existsSync(sessionPath)) {
            fs.mkdirSync(sessionPath, { recursive: true });
        }

        if (args[0]) {
            const decodedData = Buffer.from(args[0], "base64").toString("utf-8");
            fs.writeFileSync(`${sessionPath}/creds.json`, JSON.stringify(JSON.parse(decodedData), null, '\t'));
        }

        const { state, saveState, saveCreds } = await useMultiFileAuthState(sessionPath);
        const msgRetryCounterCache = new NodeCache();
        const { version } = await fetchLatestBaileysVersion();
        const phoneNumber = m.sender.split('@')[0];

        const connectionOptions = {
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            mobile: false,
            browser: ["Ubuntu", "Chrome", "20.0.04"],
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
            },
            markOnlineOnConnect: true,
            generateHighQualityLinkPreview: true,
            msgRetryCounterCache,
            version
        };

        let conn = makeWASocket(connectionOptions);

        async function connectionUpdate(update) {
            const { connection, lastDisconnect, isNewLogin } = update;

            if (isNewLogin) conn.isInit = true;

            if (connection === 'close') {
                const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
                if (reason && reason !== DisconnectReason.loggedOut && conn?.ws.socket === null) {
                    let index = global.conns.indexOf(conn);
                    if (index >= 0) {
                        delete global.conns[index];
                        global.conns.splice(index, 1);
                    }
                    if (reason !== DisconnectReason.connectionClosed) {
                        parent.sendMessage(m.chat, { text: "Conexión perdida.." }, { quoted: m });
                    }
                }
            }

            if (connection === 'open') {
                global.conns.push(conn);
                await parent.reply(m.chat, args[0]
                    ? 'Conectado con éxito'
                    : '*[ Conectado Exitosamente 🤍 ]*\n\nSe intentará reconectar en caso de desconexión.', m);

                if (args[0]) return;

                await parent.reply(conn.user.jid, `Envía este comando la próxima vez para reconectarte sin un nuevo código`, m);
                await parent.sendMessage(conn.user.jid, {
                    text: `${usedPrefix}${command} ${Buffer.from(fs.readFileSync(`${sessionPath}/creds.json`), "utf-8").toString("base64")}`
                }, { quoted: m });
            }
        }

        conn.ev.on('connection.update', connectionUpdate);
        conn.ev.on('creds.update', saveCreds);

        setInterval(() => {
            if (!conn.user) {
                try { conn.ws.close(); } catch { }
                conn.ev.removeAllListeners();
                const index = global.conns.indexOf(conn);
                if (index >= 0) {
                    delete global.conns[index];
                    global.conns.splice(index, 1);
                }
            }
        }, 60000);
    }

    serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'serbotcode'];
handler.rowner = false;

export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}