// config/db.js
const mongoose = require('mongoose');

module.exports = async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set in environment');
  await mongoose.connect(uri, {
    // mongoose default options are fine for modern versions
  });
  console.log('MongoDB connected to', mongoose.connection.name);
};
