import { google } from 'googleapis'

import key from '../config/sheets_secret.json' assert { type: 'json' }

export const SHEET_ID = '1J203mhpCuP7sMW_K1_SWdUobjmpRS4H1Z1C7XARQUAA'

const client = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/spreadsheets'])

const sheets = google.sheets({ version: 'v4', auth: client })

export default sheets
