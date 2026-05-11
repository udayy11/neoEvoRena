const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    // Use in-memory MongoDB if no external URI is configured or if connection fails
    const externalUri = process.env.MONGO_URI;
    let uri;

    try {
      if (externalUri && !externalUri.includes('localhost')) {
        uri = externalUri;
      } else {
        throw new Error('Use memory server');
      }
    } catch {
      console.log('📦 Starting in-memory MongoDB...');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Auto-seed if using memory server
    if (mongoServer) {
      await seedData();
    }
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

async function seedData() {
  const Destination = require('../models/Destination');
  const count = await Destination.countDocuments();
  if (count > 0) return;

  console.log('🌱 Auto-seeding destinations...');
  const destinations = [
    {
      name: 'Mars Colony Alpha',
      tagline: 'The Red Frontier Awaits',
      description: 'Experience humanity\'s first permanent settlement on Mars. Walk through pressurized domes, explore ancient riverbeds, and witness the most breathtaking sunsets in the solar system.',
      distance: '225 million km',
      travelTime: '6 months',
      price: 450000,
      gravity: '0.38g',
      temperature: '-60°C avg',
      atmosphere: 'Thin CO2 — Suit Required',
      rating: 4.8,
      featured: true,
      highlights: ['Olympus Mons Trek', 'Valles Marineris Canyon Tour', 'Dome City Living', 'Martian Sunset Viewing'],
      dangerLevel: 'Moderate',
      oxygenLevel: 'Dome-Supplied (99.5%)',
    },
    {
      name: 'Europa Station',
      tagline: 'Beneath the Ice, Life Awaits',
      description: 'Dive beneath Europa\'s icy crust to explore the subsurface ocean — the most promising location for extraterrestrial life.',
      distance: '628 million km',
      travelTime: '2 years',
      price: 1200000,
      gravity: '0.13g',
      temperature: '-160°C surface',
      atmosphere: 'None — Fully Enclosed',
      rating: 4.9,
      featured: true,
      highlights: ['Subsurface Ocean Dive', 'Ice Cliff Expedition', 'Jupiter Viewing Deck', 'Bioluminescence Tours'],
      dangerLevel: 'High',
      oxygenLevel: 'Station-Supplied (99.9%)',
    },
    {
      name: 'Titan Floating City',
      tagline: 'Sail the Methane Seas',
      description: 'Saturn\'s largest moon offers a surreal landscape of methane lakes, hydrocarbon dunes, and a thick orange atmosphere.',
      distance: '1.2 billion km',
      travelTime: '3 years',
      price: 2500000,
      gravity: '0.14g',
      temperature: '-179°C',
      atmosphere: 'Thick Nitrogen — Suit Required',
      rating: 4.7,
      featured: true,
      highlights: ['Methane Sea Sailing', 'Hydrocarbon Dune Racing', 'Saturn Ring Observation', 'Cryovolcano Expedition'],
      dangerLevel: 'High',
      oxygenLevel: 'City-Supplied (98%)',
    },
    {
      name: 'Lunar Gateway',
      tagline: 'Your First Step Beyond Earth',
      description: 'The perfect introduction to space travel. Our Lunar Gateway station orbits the Moon, offering zero-gravity experiences and guided moonwalks.',
      distance: '384,400 km',
      travelTime: '3 days',
      price: 85000,
      gravity: '0.16g (Moon) / 0g (Station)',
      temperature: 'Controlled',
      atmosphere: 'Fully Pressurized',
      rating: 4.6,
      featured: true,
      highlights: ['Zero-G Experience', 'Moonwalk Excursion', 'Earth-Rise Viewing', 'Lunar Rover Driving'],
      dangerLevel: 'Low',
      oxygenLevel: 'Full Earth-Standard',
    },
    {
      name: 'Enceladus Research Base',
      tagline: 'Geysers of Wonder',
      description: 'Visit Saturn\'s most enigmatic moon and witness the spectacular ice geysers that shoot water hundreds of kilometers into space.',
      distance: '1.27 billion km',
      travelTime: '3.5 years',
      price: 3200000,
      gravity: '0.01g',
      temperature: '-198°C',
      atmosphere: 'None — Fully Enclosed',
      rating: 4.5,
      featured: false,
      highlights: ['Geyser Observation', 'Ice Cave Exploration', 'Low-G Acrobatics', 'Saturn Panorama'],
      dangerLevel: 'Extreme',
      oxygenLevel: 'Base-Supplied (99%)',
    },
    {
      name: 'Venus Cloud City',
      tagline: 'Paradise Above the Inferno',
      description: 'Float 50km above Venus\'s scorching surface in our aerostatic city. Near-normal gravity and Earth-like pressure.',
      distance: '261 million km',
      travelTime: '4 months',
      price: 680000,
      gravity: '0.9g',
      temperature: '25°C (at altitude)',
      atmosphere: 'Breathable in City',
      rating: 4.4,
      featured: false,
      highlights: ['Cloud Surfing', 'Acid Rain Observation', 'Near-Earth Gravity', 'Sunrise Every 117 Days'],
      dangerLevel: 'Moderate',
      oxygenLevel: 'City-Atmospheric (Earth-like)',
    },
  ];

  await Destination.insertMany(destinations);
  console.log(`🚀 Seeded ${destinations.length} destinations`);
}

module.exports = connectDB;
