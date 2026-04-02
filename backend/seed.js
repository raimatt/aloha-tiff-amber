const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Error:', err));

const testProducts = [
  {
    name: 'Ocean Wave Bracelet',
    price: 45,
    description: 'Handcrafted ocean-inspired bracelet featuring turquoise beads and sterling silver accents. Perfect for everyday wear.',
    category: 'bracelets',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'],
    inStock: true
  },
  {
    name: 'Hawaiian Sunset Pendant',
    price: 78,
    description: 'Gold-plated pendant featuring sunset colors in resin. A wearable piece of Hawaiian paradise.',
    category: 'necklaces',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'],
    inStock: true
  },
  {
    name: 'Plumeria Drop Earrings',
    price: 42,
    description: 'Hand-painted plumeria flowers on sterling silver hooks. Lightweight and comfortable.',
    category: 'earrings',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'],
    inStock: true
  },
  {
    name: 'Coral Reef Charm Bracelet',
    price: 52,
    description: 'Delicate charm bracelet with coral-inspired designs. Each charm tells a story of island paradise.',
    category: 'bracelets',
    images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'],
    inStock: true
  }
];

const seedDatabase = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(testProducts);
    console.log('✅ Test products added!');
    process.exit();
  } catch (err) {
    console.log('❌ Error:', err);
    process.exit(1);
  }
};

seedDatabase();