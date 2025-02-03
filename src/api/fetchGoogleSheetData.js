// src/api/fetchGoogleSheetData.js
import { google } from 'googleapis';

const sheets = google.sheets('v4');

export const fetchGoogleSheetData = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json', // Ganti dengan path ke file JSON kredensial Anda
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();

  const request = {
    spreadsheetId: process.env.REACT_APP_SHEET_ID, // Ganti dengan ID Google Sheet Anda
    range: 'Data_Vouchers!A2:H', // Ganti dengan range data yang Anda inginkan
    auth: authClient,
  };

  try {
    const response = await sheets.spreadsheets.values.get(request);
    return response.data.values;
  } catch (err) {
    console.error('Error fetching data from Google Sheets', err);
    return [];
  }
};
