import fetch from 'node-fetch'

export async function before(m, { conn }) {
let name = '⛄𝑪𝒓𝒐𝒘𝑩𝒐𝒕- 𝑴𝑫 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍🌲'
let imagenes = ["https://i.ibb.co/JmcS3kv/Sylph.jpg",
"https://i.ibb.co/Cs6Tt9V/Sylph.jpg",
"https://i.ibb.co/JmcS3kv/Sylph.jpg",
"https://i.ibb.co/Cs6Tt9V/Sylph.jpg",
"https://i.ibb.co/JmcS3kv/Sylph.jpg",
"https://i.ibb.co/Cs6Tt9V/Sylph.jpg",
"https://i.ibb.co/JmcS3kv/Sylph.jpg"]

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

//Imagen
let category = "imagen"
const db = './storage/databases/database.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

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