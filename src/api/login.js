const express = require('express');
const cors = require('cors');
const path = require('path');
const { verifyUser } = require('./loginHandler'); // Impor fungsi verifyUser
const { registerUser } = require('./registerHandler'); // Impor fungsi registerUser

const app = express();
app.use(express.json());
app.use(cors());

// Tambahkan middleware untuk melayani file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Tambahkan rute GET dasar untuk menghindari pesan kesalahan "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Server Express.js berjalan dengan benar.');
});

app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const isValid = await verifyUser(identifier, password);
    if (isValid) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error verifying user:', error.message);
    res.status(500).json({ success: false, error: 'An error occurred during login' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, fullname, email, password } = req.body;
  try {
    console.log('Received registration request for:', email);
    await registerUser(username, fullname, email, password);
    res.json({ success: true });
  } catch (error) {
    console.error('Error registering user:', error.message); // Tambahkan logging error
    if (error.message === 'Username is already taken') {
      res.status(400).json({ success: false, error: 'Username is already taken' });
    } else {
      res.status(500).json({ success: false, error: 'An error occurred during registration' });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
