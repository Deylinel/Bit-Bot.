import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {

  // Verificar si se está usando el número principal del bot
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(m.chat, '🚩 *Utiliza este comando directamente en el número principal del Bot*', m);
  }

  await conn.reply(m.chat, '🚩 *Iniciando proceso de eliminación de todos los archivos de sesión, excepto el archivo creds.json...*', m);
  m.react('⏳');  // Espera, puedes usar el emoji de espera o el que prefieras.

  const sessionPath = './CrowSession/';

  try {
    // Verificar si la carpeta de sesión existe
    if (!existsSync(sessionPath)) {
      return await conn.reply(m.chat, '🚩 *La carpeta está vacía*', m);
    }

    // Obtener los archivos en la carpeta
    let files = await fs.readdir(sessionPath);
    let filesDeleted = 0;

    // Eliminar todos los archivos que no sean creds.json
    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }

    // Comprobar si se eliminaron archivos
    if (filesDeleted === 0) {
      await conn.reply(m.chat, '🚩 *No se eliminaron archivos, ya que todos los archivos de sesión son necesarios.*', m);
    } else {
      m.react('✅');  // Marca de éxito
      await conn.reply(m.chat, `🚩 *Se eliminaron ${filesDeleted} archivos de sesión, excepto el archivo creds.json*`, m);
      await conn.reply(m.chat, '🚩 *¡Hola! ¿logras verme?*', m);
    }

  } catch (err) {
    console.error('Error al leer la carpeta o los archivos de sesión:', err);
    await conn.reply(m.chat, '🚩 *Ocurrió un fallo al procesar la solicitud. Por favor, intenta nuevamente.*', m);
  }

}

handler.help = ['dsowner'];
handler.tags = ['fix', 'owner'];
handler.command = /^(delzero|dsowner|clearallsession)$/i;

handler.rowner = true;

export default handler;