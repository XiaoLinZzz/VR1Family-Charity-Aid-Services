const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Connect to MongoDB
mongoose.connect('mongodb+srv://xiaolinzzz2002:Mlj20020716@cluster0.buhizxf.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
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


const PublicRecipientSchema = new mongoose.Schema({
    principalRecipient: String,
    age: Number,
    previousAddress: String,
    totalFamilyMembers: Number,
    commonLawPartner: String,
    commonLawPartnerAge: Number,
    kidsInfo: String,
});

const DocumentSchema = new mongoose.Schema({
    number: String,
    expiry: Date,
    documentImage: String,
});

const PrivateRecipientSchema = new mongoose.Schema({
    nationality: String,
    identityDocuments: [DocumentSchema],
});

  
const kitItemSchema = new mongoose.Schema({
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
});
  
const kitSchema = new mongoose.Schema({
    kitName: {
      type: String,
      required: true,
    },
    // status: {
    //   type: String,
    //   enum: ['low', 'medium', 'high', 'excess'],
    //   required: true,
    // },
    items: [kitItemSchema],
});


const requestkititemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const request_kitSchema = new mongoose.Schema({
    request_name: {
        type: String,
        required: true,
    },
    kit_item: [requestkititemSchema],
    details: {
        type: String,
    },
});


const categoriesSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const request_categorySchema = new mongoose.Schema({
    request_name: {
        type: String,
        required: true,
    },
    category_name: {
        type: String,
        required: true,
    },
    item: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    details: {
        type: String,
    },
});


  

const PublicRecipient = mongoose.model('PublicRecipient', PublicRecipientSchema);
const PrivateRecipient = mongoose.model('PrivateRecipient', PrivateRecipientSchema);
const PublicDonor = mongoose.model('PublicDonor', PublicDonorSchema);
const PrivateDonor = mongoose.model('PrivateDonor', PrivateDonorSchema);
const AidItem = mongoose.model('AidItem', aidItemSchema);
const Kit = mongoose.model('Kit', kitSchema);
const Requestkit = mongoose.model('Request_kit', request_kitSchema);
const Requestcategory = mongoose.model('Request_category', request_categorySchema);
const Requestkititem = mongoose.model('Request_kit_item', requestkititemSchema);
const Categories = mongoose.model('Categories', categoriesSchema);

// Middleware
// const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line
// app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.get('/request_category.html', (req, res) => {
    res.sendFile(__dirname + '/request_category.html');
});

app.get('/image/download.png', (req, res) => {
    res.sendFile(__dirname + '/image/download.png');
});

app.get('/image/service.jpeg', (req, res) => {
    res.sendFile(__dirname + '/image/service.jpeg');
});

app.get('/category_overview.html', (req, res) => {
    res.sendFile(__dirname + '/category_overview.html');
});


app.get('/category_review.html', (req, res) => {
    res.sendFile(__dirname + '/category_review.html');
});

app.get('/request_kit.html', (req, res) => {
    res.sendFile(__dirname + '/request_kit.html');
});

app.get('/about_us.html', (req, res) => {
    res.sendFile(__dirname + '/about_us.html');
});

app.get('/reciption_general_info.html', (req, res) => {
    res.sendFile(__dirname + '/reciption_general_info.html');
});

app.get('/reciption_private_info.html', (req, res) => {
    res.sendFile(__dirname + '/reciption_private_info.html');
});

app.get('/reciption_info.html', (req, res) => {
    res.sendFile(__dirname + '/reciption_info.html');
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

app.get('/create_kit.html', (req, res) => {
    res.sendFile(__dirname + '/create_kit.html');
});

app.get('/kit_review.html', (req, res) => {
    res.sendFile(__dirname + '/kit_review.html');
});

app.get('/items_in_kit.html', (req, res) => {
    res.sendFile(__dirname + '/items_in_kit.html');
});

app.get('/api/find-kits', async (req, res) => {
    try {
        const kits = await Kit.find({});
        res.json(kits);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching kits' });
        }
});


app.get('/aid-items', async (req, res) => {
    const aidItems = await AidItem.find({});
    res.json(aidItems);
});

app.get('/api/get-categories', async (req, res) => {
    try {
        const categories = await AidItem.find({})

        // Sum up the same category, and set a status
        const categoryMap = new Map();
        categories.forEach(item => {
            const currentQuantity = categoryMap.has(item.category) ? categoryMap.get(item.category).quantity + item.quantity : item.quantity;

            let status;
            if (currentQuantity >= 0 && currentQuantity <= 100) {
                status = 'Low';
            } else if (currentQuantity > 100 && currentQuantity <= 200) {
                status = 'Medium';
            } else if (currentQuantity > 200 && currentQuantity <= 300) {
                status = 'High';
            } else {
                status = 'Excess';
            }

            categoryMap.set(item.category, {
                quantity: currentQuantity,
                status: status
            });
        });

        // console.log(categoryMap);
        res.json([...categoryMap].map(([category, data]) => ({ ...data, category })));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching categories' });
    }
});


app.get('/donor_info', async (req, res) => {
    const publicDonors = await PublicDonor.find({});
    // const privateDonors = await PrivateDonor.find({});
    res.json(publicDonors);
});

app.get('/reciption_info', async (req, res) => {
    const publicRecipients = await PublicRecipient.find({});
    // const privateRecipients = await PrivateRecipient.find({});
    res.json(publicRecipients);
});


app.get('/api/kit-items', async (req, res) => {
    try {
      const items = await AidItem.find({});
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching items' });
    }
});


app.get('/api/kits', async (req, res) => {
    try {
        const kits = await Kit.find({});
        // console.log(kits);
        res.json(kits);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching kits' });
    }
});

app.get('/add-item', (req, res) => {
    res.sendFile(__dirname + '/add_item.html');
});


app.get('/add-existing-item', (req, res) => {
    res.sendFile(__dirname + '/add_existing_item.html');
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await AidItem.find({}).distinct('category');
        // console.log(categories);
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching categories' });
    }
});


app.get('/api/items', async (req, res) => {
    try {
        const categoryName = req.query.category_id;
        if (!categoryName) {
            return res.status(400).json({ error: 'category_id is required' });
        }
  
        const items = await AidItem.find({ category: categoryName });
        res.json(items);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching items' });
    }
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

    res.redirect('/category_review.html');
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

    res.redirect('/donor_private_information.html');
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

app.post('/recp/private', upload.array('identity-documents'), async (req, res) => {
    const nationality = req.body.nationality;
    const identityDocuments = req.files;
    const documentDetails = [];

    for (let i = 1; i <= 3; i++) {
        const documentNumber = req.body[`document-${i}-number`];
        const documentExpiry = req.body[`document-${i}-expiry`];

        if (documentNumber && documentExpiry) {
            documentDetails.push({ number: documentNumber, expiry: documentExpiry });
        }
    }

    const privateRecipient = new PrivateRecipient({ nationality, identityDocuments, identityDocuments: documentDetails });
    await privateRecipient.save();

    res.redirect('/reciption_info.html');
});

app.post('/recp/general', async (req, res) => {
    const principalRecipient = req.body.principalRecipient;
    const age = req.body.age;
    const previousAddress = req.body.previousAddress;
    const totalFamilyMembers = req.body.totalFamilyMembers;
    const commonLawPartner = req.body.commonLawPartner;
    const commonLawPartnerAge = req.body.commonLawPartnerAge;
    const kidsInfo = req.body.kidsInfo

    const publicRecipient = new PublicRecipient({ principalRecipient, age, previousAddress, totalFamilyMembers, commonLawPartner, commonLawPartnerAge, kidsInfo });
    await publicRecipient.save();

    res.redirect('/reciption_private_info.html');
});

app.post('/create-kit', async (req, res) => {
    const { kit_name, item_name, quantity } = req.body;

    const items = [];

    // Check if there's only one item and convert it into an array
    const itemNameArray = Array.isArray(item_name) ? item_name : [item_name];
    const quantityArray = Array.isArray(quantity) ? quantity.map(q => parseInt(q)) : [parseInt(quantity)];

    for (let i = 0; i < itemNameArray.length; i++) {
        items.push({ itemName: itemNameArray[i], quantity: quantityArray[i] });
    }

    const kit = new Kit({ kitName: kit_name, items });
    await kit.save();

    res.redirect('/kit_review.html');
});


app.post('/request-kit', async (req, res) => {
    try {
        // console.log(req.body);

        const { request_name, kit_item, details } = req.body;
        const newRequestKit = new Requestkit({ request_name, kit_item, details });

        await newRequestKit.save();
        res.status(201).json({ message: 'Request kit created successfully', data: newRequestKit });
    } catch (error) {
        res.status(400).json({ message: 'Error creating request kit', error: error.message });
    }
});




app.post('/request-category', async (req, res) => {
    try {
    //   console.log(req.body);
  
      const { request_name, category_name, items, details } = req.body;
      const newRequestCategory = new Requestcategory({ request_name, category_name, item: items, details });
  
      await newRequestCategory.save();
      res.status(201).json({ message: 'Request category created successfully', data: newRequestCategory });
    } catch (error) {
      res.status(400).json({ message: 'Error creating request category', error: error.message });
    }
});
  





// Start the server
const port = process.env.PORT || 3001;
const url = process.env.URL || 'http://localhost';
app.listen(port, () => {
    console.log(`Server is running on ${url}:${port}`);
});
