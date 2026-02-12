const express = require('express');
const cors = require('cors');
const db = require('./db/db');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'https://dara-sourceful-giselle.ngrok-free.dev',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning'],
}));

app.use(express.json());


// GET all parfums
app.get('/parfums', (req, res) => {
  db.all('SELECT * FROM parfums', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET a parfum
app.get('/parfums/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM parfums WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
