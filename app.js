const express = require('express');
const cors = require('cors');
const sequelize = require('./db/db');
const Parfum = require('./models/parfum.model');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // tighten this in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning'],
}));

app.use(express.json());

// GET all parfums
app.get('/parfums', async (req, res) => {
  try {
    const parfums = await Parfum.findAll();
    res.json(parfums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single parfum by id
app.get('/parfums/:id', async (req, res) => {
  try {
    const parfum = await Parfum.findByPk(req.params.id);
    if (!parfum) return res.status(404).json({ error: 'Parfum not found' });
    res.json(parfum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new parfum
app.post('/parfums', async (req, res) => {
  try {
    const parfum = await Parfum.create(req.body);
    res.status(201).json(parfum);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a parfum
app.put('/parfums/:id', async (req, res) => {
  try {
    const parfum = await Parfum.findByPk(req.params.id);
    if (!parfum) return res.status(404).json({ error: 'Parfum not found' });
    await parfum.update(req.body);
    res.json(parfum);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a parfum
app.delete('/parfums/:id', async (req, res) => {
  try {
    const parfum = await Parfum.findByPk(req.params.id);
    if (!parfum) return res.status(404).json({ error: 'Parfum not found' });
    await parfum.destroy();
    res.json({ message: 'Parfum deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connect to DB then start server
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected.');
    return sequelize.sync(); // creates tables if they don't exist (no force)
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });