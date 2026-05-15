const mongoose = require('mongoose');
const Operator = require('./models/Operator');
require('dotenv').config();

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const count = await Operator.countDocuments();
    console.log('Total Operators:', count);
    
    const approvedCount = await Operator.countDocuments({ status: 'approved' });
    console.log('Approved Operators:', approvedCount);
    
    const sample = await Operator.find().limit(1);
    console.log('Sample Operator:', JSON.stringify(sample, null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkData();
