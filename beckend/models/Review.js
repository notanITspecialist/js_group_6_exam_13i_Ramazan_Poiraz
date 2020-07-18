const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
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
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    quality: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5]
    },
    service: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5]
    },
    interior: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5]
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;