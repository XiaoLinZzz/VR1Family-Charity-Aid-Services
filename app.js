const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aidManagement', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Create a schema and model for aid items
const aidItemSchema = new mongoose.Schema({
    name: String,
    category: String,
    quantity: Number
});

const AidItem = mongoose.model('AidItem', aidItemSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/category_review.html');
});

app.get('/aid-items', async (req, res) => {
    const aidItems = await AidItem.find({});
    res.json(aidItems);
});

app.get('/add-item', (req, res) => {
    res.sendFile(__dirname + '/add_item.html');
});


app.get('/add-existing-item', (req, res) => {
    res.sendFile(__dirname + '/add_existing_item.html');
});

app.get('/aid-categories', async (req, res) => {
    const aidItems = await AidItem.find({});
    const categories = [...new Set(aidItems.map(item => item.category))];
    res.json(categories);
});

app.post('/aid-items', async (req, res) => {
    const aidItem = new AidItem({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity
    });

    await aidItem.save();
    res.redirect('/');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
