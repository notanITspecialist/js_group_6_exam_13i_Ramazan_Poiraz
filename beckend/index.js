const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const user = require('./app/user');
const institution = require('./app/institution');
const image = require('./app/image');
const review = require('./app/review');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const init = async () => {
    await mongoose.connect(config.baseUrl,config.baseConfig);

    app.use('/user', user);
    app.use('/institution', institution)
    app.use('/image', image);
    app.use('/review', review);



    app.listen(config.port, () => {
        console.log(`Server started on ${config.port} host!`);
    });
};

init().catch(e => console.log(e));