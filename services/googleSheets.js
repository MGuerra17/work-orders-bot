import { google } from 'googleapis'

const client = new google.auth.JWT(process.env.SHEETS_CLIENT_EMAIL, null, process.env.SHEETS_PRIVATE_KEY, [
  'https://www.googleapis.com/auth/spreadsheets'
])

const sheets = google.sheets({ version: 'v4', auth: client })

export default sheets
