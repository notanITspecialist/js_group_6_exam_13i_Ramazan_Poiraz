const path = require('path');
const rootPath = __dirname;

const env = process.env.NODE_ENV;

let database = 'mongodb://localhost/exam13';
let port = 8000;

if (env === 'test') {
    database = 'mongodb://localhost/exam13-test';
    port = 8010;
}

module.exports = {
    rootPath,
    uploads: path.join(rootPath, 'public', 'uploads'),
    baseUrl: database,
    port,
    baseConfig: {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}
};