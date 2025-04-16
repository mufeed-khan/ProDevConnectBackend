const express = require('express');
const connectDB = require('./db'); // Import MongoDB connection function
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable if available

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: 'https://your-backend.onrender.com', // अपने फ्रंटएंड का URL यहां डालें
    credentials: true,
  })
);
// Middleware to parse JSON
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/posts', require('./routes/api/posts'));

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
