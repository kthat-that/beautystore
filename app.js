const express = require('express');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');


const apiRoute = require('./routes/api/auth');
const apiProduct = require('./routes/api/products');
const apiCategory = require('./routes/api/categorys');
const apibrand = require('./routes/api/brands');
const apinewPro = require('./routes/api/newpro');

const webRoute = require('./routes/web/auth');
const webProduct = require('./routes/web/products');
const webCategory = require('./routes/web/categorys');
const webBrand = require('./routes/web/brands');
const webnewPro = require('./routes/web/newpro');

const { checkUser } = require('./middlewares/auth');

const app = express();


app.set('view engine', 'ejs');


app.use(fileUpload());
app.use('/upload', express.static(path.join(__dirname, 'public/upload')));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(checkUser);


app.get('/', (req, res) => {
    res.redirect('/Homepage');
});

app.use(apiRoute);
app.use(apiProduct);
app.use(apiCategory);
app.use(apibrand);
app.use(apinewPro);

app.use(webRoute);
app.use(webProduct);
app.use(webCategory);
app.use(webBrand);
app.use(webnewPro);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
