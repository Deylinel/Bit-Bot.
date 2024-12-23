import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'

let handler = async (m, { conn }) => {

  let q = m.quoted || m
  let mime = (q.msg || q).mimetype || ''
  await m.react('🕒')

  if (!mime.startsWith('image/')) return m.reply('Responde con una *Imagen* 📸.')

  let media = await q.download()
  let formData = new FormData()
  formData.append('image', media, { filename: 'file' })

  let api = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData, {
    headers: { ...formData.getHeaders() }
  })

  await m.react('✅')
  if (api.data.data) {
    let txt = `🔧 *IBB - Image Uploader*\n\n`
        txt += `*💾 ID* : ${api.data.data.id}\n`
        txt += `*🌍 ENLACE* : ${api.data.data.url}\n`
        txt += `*🔗 DIRECTO* : ${api.data.data.url_viewer}\n`
        txt += `*🗑️ ELIMINAR* : ${api.data.data.delete_url}\n`
    await conn.sendFile(m.chat, api.data.data.url, 'ibb.jpg', txt, m)
  } else {
    await m.react('❌')
  }
}

handler.tags = ['tecnología']
handler.help = ['toibb']
handler.command = /^(tourl|toibb)$/i
handler.register = true 
export default handler