const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dogsRouter = require('./routers/dogs');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use('/public', express.static('public'));

// Serve static files from the 'images' directory
app.use('/images', express.static('public/images'));

// Routes
app.use('/dogs', dogsRouter);
app.use('/categories', categoriesRouter); 
app.use('/users', usersRouter);

// Default route for '/'
app.get('/', (req, res) => {
    res.send('Welcome to the Dogz API! Use /api/dogs to access the data.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});