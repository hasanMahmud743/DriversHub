const mongoose = require('mongoose');
require('dotenv').config();
const Operator = require('./models/Operator');

const dummyOperators = [
  { name: 'Abdur Rahman', phone: '01712345678', category: 'CNG', location: 'Uttara, Dhaka', addedBy: 'admin', status: 'approved' },
  { name: 'Sumon Ahmed', phone: '01823456789', category: 'CNG', location: 'Mirpur, Dhaka', addedBy: 'admin', status: 'approved' },
  { name: 'Karim Ullah', phone: '01934567890', category: 'Auto Rickshaw', location: 'Banani, Dhaka', addedBy: 'admin', status: 'approved' },
  { name: 'Habib Ali', phone: '01545678901', category: 'Auto Rickshaw', location: 'Dhanmondi, Dhaka', addedBy: 'admin', status: 'approved' },
  { name: 'Rafiqul Islam', phone: '01356789012', category: 'Train Blacker', location: 'Komalapur, Dhaka', addedBy: 'admin', status: 'approved' },
  { name: 'Sajid Khan', phone: '01467890123', category: 'Shuttle Bus', location: 'Gulsan, Dhaka', addedBy: 'admin', status: 'approved' },
  { name: 'Jasim Uddin', phone: '01778901234', category: 'Van Driver', location: 'Mohakhali, Dhaka', addedBy: 'admin', status: 'approved' },
  { name: 'Mofizul Islam', phone: '01889012345', category: 'CNG', location: 'Badda, Dhaka', addedBy: 'admin', status: 'approved' },
  { name: 'Anwar Hossain', phone: '01990123456', category: 'Auto Rickshaw', location: 'Rampura, Dhaka', addedBy: 'admin', status: 'approved' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    // Clear existing data (optional, but good for clean test)
    await Operator.deleteMany({});
    console.log('Cleared existing operators.');

    await Operator.insertMany(dummyOperators);
    console.log('Seeded database with dummy operators!');
    
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
