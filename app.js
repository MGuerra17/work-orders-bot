import botWhatsapp from '@bot-whatsapp/bot'
import QRPortalWeb from '@bot-whatsapp/portal'
import BaileysProvider from '@bot-whatsapp/provider/baileys'
import MockAdapter from '@bot-whatsapp/database/mock'
import { PRINCIPAL_FLOW_ANSWER, PRINCIPAL_FLOW_KEYWORDS } from './config/constants.js'
import { flowPrincipalHandler } from './flowHandlers/flowPrincipal.js'

const { createBot, createProvider, createFlow, addKeyword } = botWhatsapp

const flowPrincipal = addKeyword(PRINCIPAL_FLOW_KEYWORDS).addAnswer(
  PRINCIPAL_FLOW_ANSWER,
  { capture: true },
  flowPrincipalHandler
)

const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([flowPrincipal])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB
  })

  QRPortalWeb()
}

main()
