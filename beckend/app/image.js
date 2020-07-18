const express = require('express');

const Image = require('../models/Image');

const router = express.Router();

router.delete('/:id', async (req, res) => {
    await Image.deleteOne({_id: req.params.id});

    res.send({message: 'Delete success!'});
});

module.exports = router;