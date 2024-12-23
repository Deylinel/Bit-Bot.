import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: "TU_CLAVE_API_AQUÍ",
});
const openai = new OpenAIApi(configuration);

(async () => {
  try {
    const response = await openai.createImage({
      prompt: "A futuristic cityscape with flying cars and neon lights",
      n: 1,
      size: "1024x1024",
    });
    console.log(response.data.data[0].url);
  } catch (error) {
    console.error("Error al probar la API:", error.message || error);
  }
})();