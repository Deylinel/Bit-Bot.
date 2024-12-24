import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner =  
  ['50488198573', 'Deyin', true]
]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = `⌬ 𝑻𝑬𝑪𝑵𝑶 - 𝑩𝑶𝑻 ⌬`
global.author = '𝘿𝙚𝙨𝙖𝙧𝙧𝙤𝙡𝙡𝙖𝙙𝙤 𝙥𝙤𝙧 𝘼𝙙𝙢𝙞𝙣'
global.stickpack = '© 𝑻𝑬𝑪𝑵𝑶 - 𝑩𝑶𝑻'
global.stickauth = '⟢ 𝐂𝐫𝐞𝐚𝐝𝐨 𝐏𝐨𝐫 𝐀𝐝𝐦𝐢𝐧'
global.wait = '⌛ *Procesando su solicitud... Espere por favor... ฅ^•ﻌ•^ฅ*'
global.botname = '𝑻𝑬𝑪𝑵𝑶 - 𝑩𝑶𝑻'
global.textbot = `⚙️ 𝑻𝑬𝑪𝑵𝑶 - 𝑩𝑶𝑻 | 𝐒𝐨𝐟𝐭𝐰𝐚𝐫𝐞 𝐀𝐝𝐯𝐚𝐧𝐜𝐞𝐝 ⚙️`
global.listo = '✔️ *Su solicitud ha sido completada exitosamente.*'
global.namechannel = '𝑻𝑬𝑪𝑵𝑶 - 𝑩𝑶𝑻 ⚡'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./storage/img/catalogo.png')
global.miniurl = fs.readFileSync('./storage/img/miniurl.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.group = '🔗 *Grupo Oficial:* https://chat.whatsapp.com/HvyqEIGfMOL4h5EOkzbRzC'
global.canal = '📡 *Canal Oficial:* https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: botname, orderTitle: '🛠️ Sistema', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.multiplier = 69 
global.maxwarn = '⚠️ Advertencia máxima alcanzada: 2'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("🔄 *Se detectaron cambios en 'config.js'. Recargando...*"))
  import(`${file}?update=${Date.now()}`)
})