const express = require('express');

const Review = require('../models/Review');

const router = express.Router();

router.delete('/:id', async (req, res) => {
    await Review.deleteOne({_id: req.params.id});

    res.send({message: 'Delete success!'});
});

module.exports = router;