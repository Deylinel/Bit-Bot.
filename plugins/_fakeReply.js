import fetch from 'node-fetch'

export async function before(m, { conn }) {
let name = '⛄𝑩𝑰𝑻 - 𝑩𝑶𝑻 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍🌲'
let imagenes = ["https://i.ibb.co/5k65Cgt/file.jpg",
"https://i.ibb.co/kG05JL4/file.jpg",
"https://i.ibb.co/BggvH9q/file.jpg",
"https://i.ibb.co/tLxD6KZ/file.jpg",
"https://i.ibb.co/Zhxwn6g/file.jpg",
"https://i.ibb.co/rcKPVdk/file.jpg",
"https://i.ibb.co/rcKPVdk/file.jpg"]

let icono = imagenes[Math.floor(Math.random() * imagenes.length)]


global.rcanal = {
 contextInfo: {
             isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363317263885467@newsletter",
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