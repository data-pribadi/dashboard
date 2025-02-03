// src/api/fetchGoogleSheetData.js
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config(); // Memuat variabel lingkungan dari file .env

const sheets = google.sheets('v4');

export const fetchGoogleSheetData = async (range) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json', // Path ke file JSON kredensial Anda
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  try {
    const authClient = await auth.getClient();
    const request = {
      spreadsheetId: process.env.REACT_APP_SHEET_ID, // ID Google Sheet Anda
      range: range, // Range data yang dinamis
      auth: authClient,
    };

    const response = await sheets.spreadsheets.values.get(request);
    console.log('Data fetched from Google Sheets:', response.data.values);
    return response.data.values;
  } catch (err) {
    console.error('Error fetching data from Google Sheets:', err);
    return [];
  }
};
