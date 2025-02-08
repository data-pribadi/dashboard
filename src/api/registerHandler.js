require("dotenv").config();
const { google } = require("googleapis");
const credentials = require("../../credentials.json");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

const checkUsernameAvailability = async (username) => {
  const spreadsheetId = process.env.REACT_APP_SHEET_ID;
  const range = process.env.REACT_APP_USER_LOGIN_RANGE;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows && rows.length > 0) {
      for (const row of rows) {
        if (row[0] === username) {
          return false; // Username already exists
        }
      }
    }
    return true; // Username is available
  } catch (error) {
    console.error("Error checking username availability:", error.message);
    throw error;
  }
};

const registerUser = async (username, fullname, email, password) => {
  const spreadsheetId = process.env.REACT_APP_SHEET_ID;
  const range = process.env.REACT_APP_USER_LOGIN_RANGE;

  try {
    console.log("Starting registration process for:", email);
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      throw new Error("Username is already taken");
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[username, fullname, email, password]],
      },
    });
    console.log("Registration successful for:", email);
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

module.exports = { registerUser };
