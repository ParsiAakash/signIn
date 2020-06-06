const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const User = require('./models/user.model');
const controller = require('./controllers/user.controller');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/simplilearn', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const userRoutes = express.Router();

userRoutes.post('/signIn', controller.signIn);
userRoutes.post('/signUp', controller.signUp);

app.use('/user', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


// app.use('/todos', todoRoutes);

// app.listen(PORT, function() {
//     console.log("Server is running on Port: " + PORT);
// });
