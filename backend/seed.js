require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('./models/Destination');

const destinations = [
  {
    name: 'Mars Colony Alpha',
    tagline: 'The Red Frontier Awaits',
    description: 'Experience humanity\'s first permanent settlement on Mars. Walk through pressurized domes, explore ancient riverbeds, and witness the most breathtaking sunsets in the solar system. Mars Colony Alpha offers a once-in-a-lifetime opportunity to be part of the pioneering spirit.',
    distance: '225 million km',
    travelTime: '6 months',
    price: 450000,
    gravity: '0.38g',
    temperature: '-60°C avg',
    atmosphere: 'Thin CO2 — Suit Required',
    image: '/destinations/mars.jpg',
    rating: 4.8,
    featured: true,
    highlights: ['Olympus Mons Trek', 'Valles Marineris Canyon Tour', 'Dome City Living', 'Martian Sunset Viewing'],
    dangerLevel: 'Moderate',
    oxygenLevel: 'Dome-Supplied (99.5%)',
  },
  {
    name: 'Europa Station',
    tagline: 'Beneath the Ice, Life Awaits',
    description: 'Dive beneath Europa\'s icy crust to explore the subsurface ocean — the most promising location for extraterrestrial life. Our deep-sea submersible tours offer unprecedented views of hydrothermal vents and alien geology.',
    distance: '628 million km',
    travelTime: '2 years',
    price: 1200000,
    gravity: '0.13g',
    temperature: '-160°C surface',
    atmosphere: 'None — Fully Enclosed',
    image: '/destinations/europa.jpg',
    rating: 4.9,
    featured: true,
    highlights: ['Subsurface Ocean Dive', 'Ice Cliff Expedition', 'Jupiter Viewing Deck', 'Bioluminescence Tours'],
    dangerLevel: 'High',
    oxygenLevel: 'Station-Supplied (99.9%)',
  },
  {
    name: 'Titan Floating City',
    tagline: 'Sail the Methane Seas',
    description: 'Saturn\'s largest moon offers a surreal landscape of methane lakes, hydrocarbon dunes, and a thick orange atmosphere. Our floating city hovers above Kraken Mare, offering luxury accommodations with views of Saturn\'s rings.',
    distance: '1.2 billion km',
    travelTime: '3 years',
    price: 2500000,
    gravity: '0.14g',
    temperature: '-179°C',
    atmosphere: 'Thick Nitrogen — Suit Required',
    image: '/destinations/titan.jpg',
    rating: 4.7,
    featured: true,
    highlights: ['Methane Sea Sailing', 'Hydrocarbon Dune Racing', 'Saturn Ring Observation', 'Cryovolcano Expedition'],
    dangerLevel: 'High',
    oxygenLevel: 'City-Supplied (98%)',
  },
  {
    name: 'Lunar Gateway',
    tagline: 'Your First Step Beyond Earth',
    description: 'The perfect introduction to space travel. Our Lunar Gateway station orbits the Moon, offering zero-gravity experiences, Earth-rise viewing, and guided moonwalks on the Sea of Tranquility.',
    distance: '384,400 km',
    travelTime: '3 days',
    price: 85000,
    gravity: '0.16g (Moon) / 0g (Station)',
    temperature: 'Controlled',
    atmosphere: 'Fully Pressurized',
    image: '/destinations/moon.jpg',
    rating: 4.6,
    featured: true,
    highlights: ['Zero-G Experience', 'Moonwalk Excursion', 'Earth-Rise Viewing', 'Lunar Rover Driving'],
    dangerLevel: 'Low',
    oxygenLevel: 'Full Earth-Standard',
  },
  {
    name: 'Enceladus Research Base',
    tagline: 'Geysers of Wonder',
    description: 'Visit Saturn\'s most enigmatic moon and witness the spectacular ice geysers that shoot water hundreds of kilometers into space. Our research base sits near the south pole, where cryovolcanic activity creates an otherworldly landscape.',
    distance: '1.27 billion km',
    travelTime: '3.5 years',
    price: 3200000,
    gravity: '0.01g',
    temperature: '-198°C',
    atmosphere: 'None — Fully Enclosed',
    image: '/destinations/enceladus.jpg',
    rating: 4.5,
    featured: false,
    highlights: ['Geyser Observation', 'Ice Cave Exploration', 'Low-G Acrobatics', 'Saturn Panorama'],
    dangerLevel: 'Extreme',
    oxygenLevel: 'Base-Supplied (99%)',
  },
  {
    name: 'Venus Cloud City',
    tagline: 'Paradise Above the Inferno',
    description: 'Float 50km above Venus\'s scorching surface in our aerostatic city. At this altitude, conditions are the most Earth-like in the solar system — enjoy near-normal gravity and pressure while gazing through sulfuric acid clouds at breathtaking alien vistas.',
    distance: '261 million km',
    travelTime: '4 months',
    price: 680000,
    gravity: '0.9g',
    temperature: '25°C (at altitude)',
    atmosphere: 'Breathable in City',
    image: '/destinations/venus.jpg',
    rating: 4.4,
    featured: false,
    highlights: ['Cloud Surfing', 'Acid Rain Observation', 'Near-Earth Gravity', 'Sunrise Every 117 Days'],
    dangerLevel: 'Moderate',
    oxygenLevel: 'City-Atmospheric (Earth-like)',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Destination.deleteMany({});
    console.log('🗑️  Cleared existing destinations');

    await Destination.insertMany(destinations);
    console.log(`🚀 Seeded ${destinations.length} destinations`);

    await mongoose.disconnect();
    console.log('✅ Done! Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
