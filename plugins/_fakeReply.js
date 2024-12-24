import fetch from 'node-fetch'

export async function before(m, { conn }) {
let name = '🌐𝑻𝑬𝑪𝑵𝑶 - 𝑩𝑶𝑻⚙️'
let imagenes = ["https://qu.ax/GXtuE.jpg",
"https://qu.ax/nZSJg.jpg",
"https://qu.ax/gBatQ.jpg",
"https://qu.ax/WXnku.jpg",
"https://qu.ax/oogDv.jpg ",
"https://qu.ax/RdSoo.jpg",
"https://qu.ax/gKDcJ.jpg"]

let icono = imagenes[Math.floor(Math.random() * imagenes.length)]


global.rcanal = {
 contextInfo: {
             isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363365444927738@newsletter",
      serverMessageId: 100,
      newsletterName: name,
   }, 
   externalAdReply: {
    showAdAttribution: true, 
    title: botname, 
    body: textbot, 
    mediaUrl: null, 
    description: null, 
    previewType: "PHOTO", 
    thumbnailUrl: icono, 
    sourceUrl: canal, 
    mediaType: 1, 
    renderLargerThumbnail: false }, 
    }, 
    }

 global.fake = {
    contextInfo: {
            isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363317263885467@newsletter",
      serverMessageId: 100,
      newsletterName: name,
    },
    },
  }
}