const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

// TODO: change name
const dbName = 'crypto';

databaseConnect()
    .then(() => console.log('Database connected successfuly!'))
    .catch(err => console.log(err));


const router = require('./routes');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));   //прасва данните от form в req.body
app.use(router);


async function databaseConnect() {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
}

app.listen(5000, () => console.log('Server is running on port 5000...'));