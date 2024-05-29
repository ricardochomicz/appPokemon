const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import for generating unique IDs

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pokemonDb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define user data schema (using unique ID)
const pokemonSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name: String,
    height: String,
    weight: String,
    experience: String,
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Create API endpoint to save user data
app.use(bodyParser.json());
app.post('/pokemons', async (req, res) => {
    const data = req.body;

    const newPokemon = new Pokemon(data); // Create new Pokemon object

    try {
        const savedPokemon = await newPokemon.save(); // Save Pokemon using promises
        console.log('Pokemon saved successfully:', savedPokemon);
        res.status(200).send({ message: 'Pokemon data saved successfully' });
    } catch (err) {
        console.error('Error saving Pokemon:', err);
        res.status(500).send({ error: 'Failed to save Pokemon data' });
    }
});

// Start the webhook
app.listen(port, () => console.log(`Server listening on port ${port}`));
