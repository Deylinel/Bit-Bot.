import {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    MessageRetryMap,
    makeCacheableSignalKeyStore,
    jidNormalizedUser
} from '@whiskeysockets/baileys';
import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import readline from 'readline';
import qrcode from "qrcode";
import crypto from 'crypto';
import fs from "fs";
import pino from 'pino';
import * as ws from 'ws';
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

const { CONNECTING } = ws;

// Verificar si global.conns existe, si no inicializarlo como un arreglo.
if (!Array.isArray(global.conns)) global.conns = [];

// Manejador principal
let handler = async (m, { conn: parentConn, args, usedPrefix, command, isOwner }) => {
    // Verificar si el comando se está ejecutando desde el bot principal.
    if (!args[0] || args[0] !== 'plz' || global.conn?.user.jid !== parentConn.user.jid) {
        return m.reply(`Este comando solo puede ser usado en el bot principal. Usa el siguiente enlace para obtener más información:\nwa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix}code`);
    }

    // Crear un nuevo subbot.
    const createSubBot = async () => {
        const senderId = m.sender.split('@')[0];
        const sessionPath = `./SesionSubbots/${senderId}`;

        if (!fs.existsSync(sessionPath)) {
            fs.mkdirSync(sessionPath, { recursive: true });
        }

        if (args[0]) {
            const sessionData = Buffer.from(args[0], "base64").toString("utf-8");
            fs.writeFileSync(`${sessionPath}/creds.json`, JSON.stringify(JSON.parse(sessionData), null, '\t'));
        }

        const { state, saveState, saveCreds } = await useMultiFileAuthState(sessionPath);
        const msgRetryCounterCache = new NodeCache();
        const { version } = await fetchLatestBaileysVersion();

        const connectionOptions = {
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            browser: ["TechBot", "Chrome", "99.0"],
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
            },
            msgRetryCounterCache,
            version
        };

        let conn = makeWASocket(connectionOptions);

        // Manejar actualizaciones de conexión.
        conn.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;

            if (connection === 'open') {
                global.conns.push(conn);
                await parentConn.reply(m.chat, '*Conexión exitosa.*', m);
            }

            if (connection === 'close') {
                const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;

                if (reason !== DisconnectReason.loggedOut) {
                    conn.ev.removeAllListeners();
                    const index = global.conns.indexOf(conn);
                    if (index >= 0) global.conns.splice(index, 1);
                }
            }
        });

        // Guardar credenciales en cada actualización.
        conn.ev.on('creds.update', saveCreds);

        // Generar código de emparejamiento.
        if (args[0] && !conn.authState.creds.registered) {
            const phoneNumber = m.sender.split('@')[0].replace(/[^0-9]/g, '');
            const pairingCode = await conn.requestPairingCode(phoneNumber);

            await parentConn.reply(
                m.chat,
                `🔐 Código de emparejamiento generado:\n\n${pairingCode}\n\nUsa este código para vincular el bot.`,
                m
            );
        }
    };

    // Ejecutar la función para crear el subbot.
    await createSubBot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'serbotcode'];
handler.rowner = false;

export default handler;