const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Destination = require('./models/Destination');
const Booking = require('./models/Booking');

const testDB = async () => {
  try {
    // Connect
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear old test data
    await User.deleteMany({ email: 'test@example.com' });
    console.log('🧹 Cleared old test data');

    // CREATE - Add a test user
    console.log('\n📝 CREATE: Adding test user...');
    const newUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'TestPassword123',
      preferences: {
        travelStyle: 'adventure',
        riskTolerance: 'high',
        preferredDestinations: ['Mars', 'Venus'],
      },
    });
    console.log('✅ User created:', newUser.email);

    // READ - Get the user back
    console.log('\n📖 READ: Fetching user...');
    const fetchedUser = await User.findById(newUser._id).select('-password');
    console.log('✅ User fetched:', fetchedUser);

    // UPDATE - Modify user
    console.log('\n✏️ UPDATE: Updating user...');
    fetchedUser.preferences.travelStyle = 'explorer';
    const updatedUser = await fetchedUser.save();
    console.log('✅ User updated:', updatedUser.preferences.travelStyle);

    // DELETE - Remove user
    console.log('\n🗑️ DELETE: Removing user...');
    await User.deleteOne({ _id: newUser._id });
    const deletedUser = await User.findById(newUser._id);
    console.log('✅ User deleted:', deletedUser === null ? 'Yes' : 'No');

    console.log('\n✨ All CRUD operations successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testDB();
