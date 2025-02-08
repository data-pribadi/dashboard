require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const credentials = require('../../credentials.json');
const moment = require('moment-timezone');

const router = express.Router();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

const voucherSheetName = process.env.REACT_APP_VOUCHERS_RANGE.split('!')[0];
const laporanSheetName = process.env.REACT_APP_LAPORAN_RANGE.split('!')[0];

// Fungsi untuk mendapatkan baris terakhir
async function getLastRow(spreadsheetId, sheetName) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:A`,
  });
  return response.data.values ? response.data.values.length + 1 : 2;
}

// Endpoint untuk memperbarui Google Sheet
router.post('/update-sheet', async (req, res) => {
  const { item } = req.body;
  const spreadsheetId = process.env.REACT_APP_SHEET_ID;
  const rangeUserAktif = `${voucherSheetName}!G${item.rowIndex}`;
  const rangeStatus = `${voucherSheetName}!H${item.rowIndex}`;
  const rangeTanggal = `${voucherSheetName}!E${item.rowIndex}`;
  const rangeWaktu = `${voucherSheetName}!F${item.rowIndex}`;

  const currentDate = moment().tz('Asia/Jakarta').format('DD/MM/YYYY');
  const currentTime = moment().tz('Asia/Jakarta').format('HH:mm:ss');

  try {
    // Perbarui data di Data_Vouchers
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: rangeUserAktif,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [['Aktif']],
      },
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: rangeStatus,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [['Sukses']],
      },
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: rangeTanggal,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[currentDate]],
      },
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: rangeWaktu,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[currentTime]],
      },
    });

    // Tambahkan logika untuk memperbarui Data_Laporan di baris terakhir
    const lastRow = await getLastRow(spreadsheetId, laporanSheetName);
    const laporanRange = `${laporanSheetName}!A${lastRow}`;
    const laporanData = [
      [
        item.id,
        item.username,
        item.password,
        item.harga,
        currentDate,
        currentTime,
        'Aktif',
        'Sukses',
      ],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: laporanRange,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: laporanData,
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating sheet:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while updating the sheet',
    });
  }
});

module.exports = router;
