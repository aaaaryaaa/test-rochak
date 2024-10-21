const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
// {
//   origin: 'http://localhost:3000' // Replace with your frontend URL
// }

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next(); // Pass the request to the next middleware/route handler
});

// Connect to MongoDB Atlas using the connection string from the .env file
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// User schema
const userSchema = new mongoose.Schema({
    prolificId: {
        type: String,
        required: true,
        unique: true // Ensure each ID is unique
    },
    startTime: {
        type: Date,
        default: Date.now // Automatically set to the current date/time
    },
    endTime: {
        type: Date,
        default: Date.now // This can be updated later
    },
    page: {
        type: String,
        default: ""
    },
    selectedOption: {
        type: String,
        default: ""
    }
});

const User = mongoose.model('User', userSchema);

// Route to get user by prolificId
app.get('/api/users/:prolificId', async (req, res) => {
  const { prolificId } = req.params;

  try {
    // Find the user by prolificId
    const user = await User.findOne({ prolificId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// User creation route
app.post('/api/users/create', async (req, res) => {
    const { prolificId } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ prolificId });

        if (!user) {
            // Create a new user if not found
            user = new User({ prolificId });
            await user.save();
        }

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User update route
app.patch('/api/users/update', async (req, res) => {
  const { prolificId, endTime, selectedOption } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { prolificId },
      { endTime, selectedOption },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.patch('/api/users/update-page', async (req, res) => {
    const { prolificId, page } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { prolificId },
            { page },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Page updated successfully', user });
    } catch (error) {
        console.error('Error updating page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Fridge Schema
const fridgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fridgeImage: {
      type: String,
      required: true,
    },
    reviewImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dimensions: {
      height: { type: Number, required: true },
      width: { type: Number, required: true },
      depth: { type: Number, required: true },
    },
    coolingSpace: {
      type: Number,
      required: true,
    },
    freezerSpace: {
      type: Number,
      required: true,
    },
    totalSpace: {
      type: Number,
      required: true,
    },
    productWeight: {
      type: Number,
      required: true,
    },
    energyConsumption: {
      type: Number,
      required: true,
    },
    iceMaker: {
      type: Boolean,
      required: true,
    },
    garageReady: {
      type: Boolean,
      required: true,
    },
    internalWaterDispenser: {
      type: Boolean,
      required: true,
    },
    warranty: {
      type: String,
      required: true,
    },
  });

const Fridge = mongoose.model('Fridge', fridgeSchema);

app.get('/api/fridges', async (req, res) => {
    try {
      const fridges = await Fridge.find();
      res.status(200).json(fridges);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving fridges', error });
    }
  });

app.post('/api/fridges/create', async (req, res) => {
    const fridgeData = req.body;

    const newFridge = new Fridge({
        name: fridgeData.name,
        fridgeImage: fridgeData.fridgeImage,
        reviewImage: fridgeData.reviewImage,
        price: fridgeData.price,
        dimensions: {
        height: fridgeData.dimensions.height,
        width: fridgeData.dimensions.width,
        depth: fridgeData.dimensions.depth,
        },
        coolingSpace: fridgeData.coolingSpace,
        freezerSpace: fridgeData.freezerSpace,
        totalSpace: fridgeData.totalSpace,
        productWeight: fridgeData.productWeight,
        energyConsumption: fridgeData.energyConsumption,
        iceMaker: fridgeData.iceMaker,
        garageReady: fridgeData.garageReady,
        internalWaterDispenser: fridgeData.internalWaterDispenser,
        warranty: fridgeData.warranty,
    });

    try {
        const savedFridge = await newFridge.save();
        res.status(201).json(savedFridge);
    } catch (error) {
        res.status(400).json({ message: 'Error adding fridge', error });
    }
});

// Add a new endpoint to get specific fridges by name array
app.post('/api/fridges/compare', async (req, res) => {
    const { names } = req.body; // Expecting the names as an array in the request body
  
    if (!Array.isArray(names) || names.length === 0) {
      return res.status(400).json({ message: 'Fridge names must be a non-empty array' });
    }
  
    try {
      const fridges = await Fridge.find({ name: { $in: names } });
      res.status(200).json(fridges);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving fridges', error });
    }
  });
  

// Visit schema for tracking page visits
const visitSchema = new mongoose.Schema({
    page: String,
    count: { type: Number, default: 0 },
});

const Visit = mongoose.model('Visit', visitSchema);

// Initialize visit counters for each page if not already present
const initializeVisits = async () => {
    const pages = ['page1', 'page2', 'page3'];
    for (let page of pages) {
        const existingVisit = await Visit.findOne({ page });
        if (!existingVisit) {
            await Visit.create({ page });
        }
    }
};

initializeVisits();

// API endpoint to determine the route
app.get('/route', async (req, res) => {
    try {
        // Get the page with the minimum count
        const visit = await Visit.find().sort({ count: 1 }).limit(1);
        const selectedPage = visit[0];

        // Increment the count for the selected page
        await Visit.updateOne({ _id: selectedPage._id }, { $inc: { count: 1 } });

        res.json({ route: selectedPage.page });
    } catch (error) {
        console.error("Error determining the route", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
