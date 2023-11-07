import 'dotenv/config'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const getOrderArray = async (order) => {
  return await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'Tu eres un asistente para creación de ordenes de trabajo. Vas a recibir la información de un trabajo que se ha realizado en un formato cualquiera y debes retornar un array con el contenido de la orden pero en un orden determinado. El orden que debes seguir es el siguiente: ["reporte // hallazgo // equipo // componente // solucion", "fecha", "hora inicio", "fecha", "hora final", "tecnicos" ]. El parámetro componente por lo general se encuentra mezclado con el campo equipo, intenta identificar cual es el componente y cual es el equipo. Si no logras identificar alguno de los campos coloca un string vacío en su lugar. Para el campo "equipo" debes comparar, identificar y reemplazar el valor ingresado con el valor corregido proveniente del siguiente listado de equipos: Dragalina 2570, Pala 18, Subestacion 54, Campamento florida. Debes garantizar que el contenido del la primera posición del array no ocupe mas de 250 caracteres, para esto, resume los campos mas extensos si es necesario. Corrige los errores ortográficos en los campos y en tu respuesta no incluyas ningún contenido extra que no sea el array.'
      },
      {
        role: 'user',
        content:
          '31/10/2023\n\nEQUIPO: Tubería Draga 2570\n\nREPORTE: Revisión e inspección de temperatura en draga 2570\n\nSOLUCIÓN: Se inspecciona niveles de aceite y toma temperatura en MGSet’s de dragalina de acuerdo a programación preventiva.\n\nORDEN: CERRADA\n\nHORA: 15:40 - 16:00\n\nTécnicos: Samuel Pallares / Jorge Arias'
      },
      {
        role: 'assistant',
        content:
          '["Revisión e inspección de temperatura en draga 2570 //  // Dragalina 2570 //  Tubería // Se inspecciona niveles de aceite y toma temperatura en MGSet’s de dragalina de acuerdo a programación preventiva.","31/10/2023","15:40","31/10/2023","16:00","Samuel Pallares / Jorge Arias"]'
      },
      { role: 'user', content: order }
    ]
  })
}
