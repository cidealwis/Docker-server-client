const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());

// Import user model
const User = require('./User');

// Connect to MongoDB
const directUrl = process.env.DATABASE_URL;
const dataBaseName = process.env.DATABASE_NAME;
const PORT =process.env.PORT;

const mongoDbUrl = `${directUrl}/${dataBaseName}`;

mongoose.connect(mongoDbUrl);

mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB");
});

// API route to create a user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({ message: 'User created successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'User data fetched successfully', data: users });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Listen to port
app.listen(PORT, () => {
    console.log('App is listening on port '+PORT);
});
