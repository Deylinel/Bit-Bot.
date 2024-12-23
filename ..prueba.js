const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*👻 Por favor ingrese una descripción del dibujo o imagen que desea generar*`;

  m.react('🕒');
  await conn.sendMessage(m.chat, { text: '*👻 Generando imagen...*' }, { quoted: m });

  try {
    const response = await openai.createImage({
      prompt: text,
      n: 1,
      size: "1024x1024",
    });

    if (!response || !response.data || !response.data.data || !response.data.data[0]) {
      throw new Error("La API de OpenAI no devolvió resultados válidos.");
    }

    const imageUrl = response.data.data[0].url;

    // Descargar la imagen generada
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error("Error al descargar la imagen generada.");
    }

    const buffer = await imageResponse.buffer();

    m.react('✔️');
    await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
  } catch (error) {
    console.error(error.message || error);
    throw `*🚨 Error: ${error.message || "Ha ocurrido un error al generar la imagen"}*`;
  }
};