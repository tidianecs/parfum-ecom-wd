const sequelize = require('../db/db');
const Parfum = require('../models/parfum.model');

const products = [
  {
    name: "Golden Elixir",
    brand: "LuxeScents",
    price: 120,
    imgUrl: "https://images.unsplash.com/photo-1594035910387-406691aa6981?auto=format&fit=crop&q=80&w=600",
    notes: "Amber, Vanilla, Oud"
  },
  {
    name: "Midnight Bloom",
    brand: "Noir",
    price: 95,
    imgUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    notes: "Jasmine, Black Orchid, Patchouli"
  },
  {
    name: "Oceanic Breeze",
    brand: "AquaPure",
    price: 85,
    imgUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    notes: "Sea Salt, Bergamot, Driftwood"
  },
  {
    name: "Rose Royale",
    brand: "Fleur",
    price: 110,
    imgUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    notes: "Bulgarian Rose, Peony, Musk"
  },
  {
    name: "Spiced Wood",
    brand: "EarthTones",
    price: 130,
    imgUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=600",
    notes: "Cedarwood, Cardamom, Leather"
  },
  {
    name: "Citrus Burst",
    brand: "Zest",
    price: 75,
    imgUrl: "https://images.unsplash.com/photo-1615160520973-eb95cd697b4f?auto=format&fit=crop&q=80&w=600",
    notes: "Lemon, Neroli, Green Tea"
  }
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL.');

    // sync creates the table if it doesn't exist
    await sequelize.sync({ force: true });
    console.log('Table synced.');

    await Parfum.bulkCreate(products);
    console.log('Seeded 6 parfums successfully.');

    await sequelize.close();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();