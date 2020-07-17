const mongoose = require('mongoose');
const config = require("./config");

const run = async () => {
    await mongoose.connect(config.baseUrl, config.baseConfig);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});