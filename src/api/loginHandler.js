require('dotenv').config();
const { google } = require('googleapis');
const credentials = require('../../credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

const verifyUser = async (identifier, password) => {
  const spreadsheetId = process.env.REACT_APP_SHEET_ID;
  const range = process.env.REACT_APP_USER_LOGIN_RANGE;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;
  if (rows.length) {
    for (const row of rows) {
      // Periksa login menggunakan username (kolom A) atau email (kolom C)
      if ((row[0] === identifier || row[2] === identifier) && row[3] === password) {
        return true;
      }
    }
  }
  return false;
};

module.exports = { verifyUser };
