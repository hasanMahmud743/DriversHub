const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Operator = require('./models/Operator');
const Review = require('./models/Review');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Local Data Persistence Paths
const DATA_DIR = path.join(__dirname, 'data');
const OPERATORS_FILE = path.join(DATA_DIR, 'operators.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(OPERATORS_FILE)) fs.writeFileSync(OPERATORS_FILE, JSON.stringify([]));
if (!fs.existsSync(REVIEWS_FILE)) fs.writeFileSync(REVIEWS_FILE, JSON.stringify([]));

// Helper to handle local data
const getLocalData = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const saveLocalData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Database Connection
let isConnected = false;
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    isConnected = true;
  })
  .catch(err => {
    console.error('MongoDB connection error. Falling back to Local Mode:', err.message);
    isConnected = false;
  });

// Routes

// PUBLIC: GET /api/operators/:category - Fetch ONLY approved drivers
app.get('/api/operators/:category', async (req, res) => {
  const { category } = req.params;
  
  try {
    if (isConnected) {
      let query = { status: 'approved' };
      if (category !== 'All') query.category = category;
      const operators = await Operator.find(query).sort({ createdAt: -1 });
      return res.json(operators);
    } else {
      // Local Mode
      let operators = getLocalData(OPERATORS_FILE);
      let filtered = operators.filter(op => op.status === 'approved');
      if (category !== 'All') filtered = filtered.filter(op => op.category === category);
      return res.json(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operators', error: error.message });
  }
});

// ADMIN: GET /api/admin/operators - Fetch all drivers for dashboard
app.get('/api/admin/operators', async (req, res) => {
  try {
    if (isConnected) {
      const operators = await Operator.find().sort({ createdAt: -1 });
      return res.json(operators);
    } else {
      return res.json(getLocalData(OPERATORS_FILE).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin operators', error: error.message });
  }
});

// PROTECTED: POST /api/operators - New operators are 'pending' by default
app.post('/api/operators', async (req, res) => {
  try {
    const { name, phone, category, location, addedBy } = req.body;

    if (!addedBy) {
      return res.status(401).json({ message: 'Unauthorized: Firebase UID is required' });
    }

    const operatorData = {
      name,
      phone,
      category,
      location,
      addedBy,
      status: 'pending',
      createdAt: new Date()
    };

    if (isConnected) {
      const newOperator = new Operator(operatorData);
      const savedOperator = await newOperator.save();
      res.status(201).json(savedOperator);
    } else {
      const operators = getLocalData(OPERATORS_FILE);
      const newOp = { ...operatorData, _id: Date.now().toString() };
      operators.push(newOp);
      saveLocalData(OPERATORS_FILE, operators);
      res.status(201).json(newOp);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error saving operator', error: error.message });
  }
});

// REVIEWS: GET /api/reviews/:operatorId - Fetch reviews for a driver
app.get('/api/reviews/:operatorId', async (req, res) => {
  const { operatorId } = req.params;
  try {
    if (isConnected) {
      const reviews = await Review.find({ operatorId }).sort({ createdAt: -1 });
      return res.json(reviews);
    } else {
      const reviews = getLocalData(REVIEWS_FILE);
      return res.json(reviews.filter(r => r.operatorId === operatorId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// REVIEWS: POST /api/reviews - Post a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { operatorId, userId, userName, rating, comment } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: Login required' });
    }

    const reviewData = {
      operatorId,
      userId,
      userName,
      rating,
      comment,
      createdAt: new Date()
    };

    if (isConnected) {
      const newReview = new Review(reviewData);
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } else {
      const reviews = getLocalData(REVIEWS_FILE);
      const newRev = { ...reviewData, _id: Date.now().toString() };
      reviews.push(newRev);
      saveLocalData(REVIEWS_FILE, reviews);
      res.status(201).json(newRev);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error saving review', error: error.message });
  }
});

// ADMIN: PATCH /api/admin/operators/:id - Approve/Edit/Reject
app.patch('/api/admin/operators/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    if (isConnected) {
      const updatedOperator = await Operator.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedOperator) return res.status(404).json({ message: 'Operator not found' });
      res.json(updatedOperator);
    } else {
      let operators = getLocalData(OPERATORS_FILE);
      const index = operators.findIndex(op => op._id === id);
      if (index === -1) return res.status(404).json({ message: 'Operator not found' });
      operators[index] = { ...operators[index], ...updates };
      saveLocalData(OPERATORS_FILE, operators);
      res.json(operators[index]);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating operator', error: error.message });
  }
});

// ADMIN: DELETE /api/admin/operators/:id
app.delete('/api/admin/operators/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (isConnected) {
      const deletedOperator = await Operator.findByIdAndDelete(id);
      if (!deletedOperator) return res.status(404).json({ message: 'Operator not found' });
      res.json({ message: 'Operator deleted successfully' });
    } else {
      let operators = getLocalData(OPERATORS_FILE);
      const filtered = operators.filter(op => op._id !== id);
      if (filtered.length === operators.length) return res.status(404).json({ message: 'Operator not found' });
      saveLocalData(OPERATORS_FILE, filtered);
      res.json({ message: 'Operator deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting operator', error: error.message });
  }
});

// PUBLIC: GET /api/stats - Fetch counts for Home Page
app.get('/api/stats', async (req, res) => {
  try {
    let driversCount, citiesCount, reviewsCount, categoryCounts = {};

    if (isConnected) {
      driversCount = await Operator.countDocuments({ status: 'approved' });
      const cities = await Operator.distinct('location', { status: 'approved' });
      citiesCount = cities.length;
      reviewsCount = await Review.countDocuments();
      
      // Category counts from DB
      const catStats = await Operator.aggregate([
        { $match: { status: 'approved' } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
      catStats.forEach(item => {
        categoryCounts[item._id] = item.count;
      });
    } else {
      const operators = getLocalData(OPERATORS_FILE);
      const approved = operators.filter(op => op.status === 'approved');
      driversCount = approved.length;
      citiesCount = new Set(approved.map(op => op.location)).size;
      reviewsCount = getLocalData(REVIEWS_FILE).length;

      // Category counts from Local File
      approved.forEach(op => {
        categoryCounts[op.category] = (categoryCounts[op.category] || 0) + 1;
      });
    }

    res.json({
      drivers: driversCount,
      cities: citiesCount,
      reviews: reviewsCount,
      categoryCounts,
      satisfaction: 99
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
