const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express App
const app = express();
const PORT = 5500;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/your-db-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Import Routes
const attractions = require('./routes/attractions'); // Ensure correct file paths
const visitors = require('./routes/visitors');       // Ensure correct file paths
const reviews = require('./routes/reviews');         // Ensure correct file paths

// Use Routes
app.use('/attractions', attractions);
app.use('/visitors', visitors);
app.use('/reviews', reviews);

app.get('/', (req, res) => {
    res.send("Tourism Mangaement Server is up and running");
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
