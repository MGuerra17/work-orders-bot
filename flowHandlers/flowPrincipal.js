import { getOrderArray } from '../services/openai.js'
import { adjustDateRange, createDateTimeObject, getDateTimeInMilitaryFormat } from '../utils/dates.js'
import sheets, { SHEET_ID } from '../services/googleSheets.js'

export const flowPrincipalHandler = async (ctx, { endFlow, flowDynamic }) => {
  if (ctx.body.trim().toLowerCase() === 'cancelar') return endFlow({ body: '🚫 Orden cancelada' })

  flowDynamic([{ body: '⏳ Procesando orden...' }])

  let orderArray = []

  try {
    const orderArrayString = (await getOrderArray(ctx.body)).choices[0].message.content
    orderArray = JSON.parse(orderArrayString)
  } catch (error) {
    return endFlow({
      body: '⚠️ No se pudo procesar la orden, intente nuevamente. Si el problema persiste contacte con soporte.'
    })
  }

  const currentDateTime = new Date(ctx.messageTimestamp * 1000)
  const currentDateTimeInMilitaryFormat = getDateTimeInMilitaryFormat(currentDateTime)
  const initialDate = orderArray[1] === '' ? currentDateTimeInMilitaryFormat[0] : orderArray[1]
  const finalDate = orderArray[3] === '' ? currentDateTimeInMilitaryFormat[0] : orderArray[3]
  const dateError = orderArray[1] === '' || orderArray[3] === '' ? '\n⚠️ No se ha ingresado la fecha de la orden' : ''

  const orderDates = {
    initialDateTime: createDateTimeObject(initialDate, orderArray[2]),
    finalDateTime: createDateTimeObject(finalDate, orderArray[4]),
    currentDateTime
  }

  const { initialDateTimeAdjusted, finalDateTimeAdjusted, error } = adjustDateRange(orderDates)

  const errorAdvise = error != null ? `\n⚠️ ${error}` : ''

  const initialDateAdjustedMilitaryFormat = getDateTimeInMilitaryFormat(initialDateTimeAdjusted)
  const finalDateAdjustedMilitaryFormat = getDateTimeInMilitaryFormat(finalDateTimeAdjusted)

  orderArray[1] = initialDateAdjustedMilitaryFormat[0]
  orderArray[2] = initialDateAdjustedMilitaryFormat[1]
  orderArray[3] = finalDateAdjustedMilitaryFormat[0]
  orderArray[4] = finalDateAdjustedMilitaryFormat[1]

  try {
    sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Data!A2:F2',
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'RAW',
      requestBody: {
        values: [orderArray]
      }
    })
  } catch (error) {
    console.log(error)
    return endFlow({
      body: '⚠️ No se pudo registrar la orden en la hoja de cálculo, intente nuevamente. Si el problema persiste contacte con soporte.'
    })
  }

  endFlow({ body: `🚀 Orden registrada` + dateError + errorAdvise })
}
