const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: String
});

const Institution = mongoose.model('Institution', InstitutionSchema);

module.exports = Institution;