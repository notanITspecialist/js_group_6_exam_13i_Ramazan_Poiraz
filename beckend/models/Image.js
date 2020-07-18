const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    institution: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Institution'
    },
    image: {
        type: String,
        required: true
    },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;