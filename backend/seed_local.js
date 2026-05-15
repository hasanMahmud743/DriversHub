const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const OPERATORS_FILE = path.join(DATA_DIR, 'operators.json');

const dummyOperators = [
  { _id: '1', name: 'Abdur Rahman', phone: '01712345678', category: 'CNG', location: 'Uttara, Dhaka', addedBy: 'admin', status: 'approved', createdAt: new Date() },
  { _id: '2', name: 'Sumon Ahmed', phone: '01823456789', category: 'CNG', location: 'Mirpur, Dhaka', addedBy: 'admin', status: 'approved', createdAt: new Date() },
  { _id: '3', name: 'Karim Ullah', phone: '01934567890', category: 'Auto Rickshaw', location: 'Banani, Dhaka', addedBy: 'admin', status: 'approved', createdAt: new Date() },
  { _id: '4', name: 'Habib Ali', phone: '01545678901', category: 'Auto Rickshaw', location: 'Dhanmondi, Dhaka', addedBy: 'admin', status: 'approved', createdAt: new Date() },
  { _id: '5', name: 'Rafiqul Islam', phone: '01356789012', category: 'Train Blacker', location: 'Komalapur, Dhaka', addedBy: 'admin', status: 'approved', createdAt: new Date() },
  { _id: '6', name: 'Sajid Khan', phone: '01467890123', category: 'Shuttle Bus', location: 'Gulsan, Dhaka', addedBy: 'admin', status: 'approved', createdAt: new Date() },
  { _id: '7', name: 'Jasim Uddin', phone: '01778901234', category: 'Van Driver', location: 'Mohakhali, Dhaka', addedBy: 'admin', status: 'approved', createdAt: new Date() },
  { _id: '8', name: 'Mofizul Islam', phone: '01889012345', category: 'CNG', location: 'Badda, Dhaka', addedBy: 'admin', status: 'approved', createdAt: new Date() },
  { _id: '9', name: 'Anwar Hossain', phone: '01990123456', category: 'Auto Rickshaw', location: 'Rampura, Dhaka', addedBy: 'admin', status: 'approved', createdAt: new Date() },
];

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
fs.writeFileSync(OPERATORS_FILE, JSON.stringify(dummyOperators, null, 2));
console.log('Local database seeded successfully!');
