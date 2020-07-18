const mongoose = require('mongoose');
const config = require("./config");

const User = require('./models/User');
const Institution = require('./models/Institution');
const Review = require('./models/Review');



const run = async () => {
    await mongoose.connect(config.baseUrl, config.baseConfig);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const user = await User.create({
        username: '123',
        password: '123',
        token: '123',
        role: 'admin',
        displayName: 'Админ ежже'
    })

    const place = await Institution.create({
        user: user,
        description: '123',
        title: '123'
    });

    await Review.create({
        user: user,
        institution: place,
        comment: '123321123321',
        quality: 1,
        service: 3,
        interior: 5
    })

    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});