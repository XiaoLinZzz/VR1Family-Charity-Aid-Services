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
    quantity: Number,
    details: String
});

const PrivateDonorSchema = new mongoose.Schema({
    donorType: {
        type: String,
        enum: ['individual', 'organization'],
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    identityDocuments: [{
        document: {
            type: String,
            required: false
        },
        expiryDate: {
            type: Date,
            required: false
        }
    }],
    abn: {
        type: String,
        required: false
    }
});

const PublicDonorSchema = new mongoose.Schema({
    donorType: {
        type: String,
        enum: ['individual', 'organization'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    headquarters: {
        type: String,
        required: false
    },
    principalContact: {
        type: String,
        required: false
    },
    mailingAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    preferredCommunication: {
        type: String,
        enum: ['email', 'phone', 'mail'],
        required: true
    }
});

const PublicDonor = mongoose.model('PublicDonor', PublicDonorSchema);
const PrivateDonor = mongoose.model('PrivateDonor', PrivateDonorSchema);
const AidItem = mongoose.model('AidItem', aidItemSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.get('/category_review.html', (req, res) => {
    res.sendFile(__dirname + '/category_review.html');
});


app.get('/about_us.html', (req, res) => {
    res.sendFile(__dirname + '/about_us.html');
});

app.get('/donor_private_information.html', (req, res) => {
    res.sendFile(__dirname + '/donor_private_information.html');
});

app.get('/donor_general_information.html', (req, res) => {
    res.sendFile(__dirname + '/donor_general_information.html');
});

app.get('/donor_info.html', (req, res) => {
    res.sendFile(__dirname + '/donor_info.html');
});

app.get('/aid-items', async (req, res) => {
    const aidItems = await AidItem.find({});
    res.json(aidItems);
});

app.get('/donor_info', async (req, res) => {
    const publicDonors = await PublicDonor.find({});
    // const privateDonors = await PrivateDonor.find({});
    res.json(publicDonors);
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
    // Find an existing item with the same name, category, and details
    const existingItem = await AidItem.findOne({ 
        name: req.body.name, 
        category: req.body.category,
        details: req.body.details
    });

    if (existingItem) {
        // If the item exists, update its quantity
        existingItem.quantity += parseInt(req.body.quantity);
        // print(existingItem.quantity);
        // console.log(existingItem.quantity);
        await existingItem.save();
    } else {
        // If the item doesn't exist, create a new one
        const aidItem = new AidItem({
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            details: req.body.details
        });

        await aidItem.save();
    }

    res.redirect('/');
});

app.post('/donors/general', async (req, res) => {
    const donorData = {
        donorType: req.body.donorType,
        name: req.body.name,
        mailingAddress: req.body.mailingAddress,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        preferredCommunication: req.body.preferredCommunication
    };

    if (donorData.donorType === 'individual') {
        donorData.age = req.body.age;
    } else {
        donorData.headquarters = req.body.headquarters;
        donorData.principalContact = req.body.principalContact;
    }

    const publicDonor = new PublicDonor(donorData);
    await publicDonor.save();

    // console.log(publicDonor);

    res.redirect('/donor_info.html');
});

app.post('/donors/private', async (req, res) => {
    const donorData = {
        donorType: req.body.donorType,
        nationality: req.body.nationality
    };

    if (donorData.donorType === 'individual') {
        donorData.identityDocuments = [
            {
                document: req.body.idDocument1,
                expiryDate: req.body.expiryDate1
            }
        ];
        if (req.body.idDocument2) {
            donorData.identityDocuments.push({
                document: req.body.idDocument2,
                expiryDate: req.body.expiryDate2
            });
        }
        if (req.body.idDocument3) {
            donorData.identityDocuments.push({
                document: req.body.idDocument3,
                expiryDate: req.body.expiryDate3
            });
        }
    } else {
        donorData.abn = req.body.abn;
    }

    const privateDonor = new PrivateDonor(donorData);
    await privateDonor.save();

    res.redirect('/donor_info.html');
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
