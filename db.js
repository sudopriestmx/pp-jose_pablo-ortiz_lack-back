const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URI || 'mongodb+srv://joselack:super-secret-password@cluster0.g6psj.azure.mongodb.net/test',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

module.exports = mongoose;
