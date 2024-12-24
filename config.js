import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';

//*═══════════✧════════════✧═══════════*
//* ⚙️ TECNO - BOT System Configuration ⚙️ *
//*═══════════✧════════════✧═══════════*

global.owner = [
  ['50557865603', 'WillZek', true],
  ['50498409019', 'CrowBot-AI', true],
  ['584241836217', 'Prak Harper', true],
  ['50488198573', 'DEYLIN-Support', true]
];

//*═══════════✧════════════✧═══════════*

global.mods = []; // Administradores del sistema
global.prems = []; // Usuarios premium

//*═══════════✧════════════✧═══════════*

global.packname = `⟢⧫ TECNO BOT ⦾ System Core AI ⧫⟣`;
global.author = '⚙️ TECNO BOT by DEYLIN ⚙️';
global.stickpack = '© TECNO - BOT ⚡';
global.stickauth = '🔧 Powered by DEYLIN ';
global.wait = '⏳ *Procesando solicitud... conectando a la red.* ⏳';
global.botname = '⟢🚀 TECNO BOT 🚀⟣';
global.textbot = `🌐 *TECNO BOT - Desarrollado por DEYLIN* 🌐`;
global.listo = '✔️ *¡Tarea completada con éxito!* 🚀';
global.namechannel = '📡 *TECNO BOT Channel* 🌠';

//*═══════════✧════════════✧═══════════*

global.catalogo = fs.readFileSync('./storage/img/catalogo.png');
global.miniurl = fs.readFileSync('./storage/img/miniurl.jpg');

//*═══════════✧════════════✧═══════════*

TODAVÍA NO TENGO GRUPO 

global.canal = '📡 https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m

//*═══════════✧════════════✧═══════════*

global.estilo = {
  key: { 
    fromMe: false, 
    participant: `0@s.whatsapp.net`, 
    ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {})
  }, 
  message: { 
    orderMessage: { 
      itemCount: -999999, 
      status: 1, 
      surface: 1, 
      message: botname, 
      orderTitle: '⚡ CrowBot System ⚡', 
      thumbnail: catalogo, 
      sellerJid: '0@s.whatsapp.net' 
    }
  }
};

//*═══════════✧════════════✧═══════════*

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;

//*═══════════✧════════════✧═══════════*

global.multiplier = 69; // Factor de experiencia
global.maxwarn = '2'; // Advertencias máximas antes del bloqueo

//*═══════════✧════════════✧═══════════*

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.greenBright("♻️ Archivo 'config.js' actualizado automáticamente"));
  import(`${file}?update=${Date.now()}`);
});