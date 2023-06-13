const express = require('express');
const handlebars = require('express-handlebars');

const router = require('./routes');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.urlencoded({ extendet: false }));   //прасва данните от form в req.body
app.use(router);




app.listen(5000, () => console.log('Server is running on port 5000...'))