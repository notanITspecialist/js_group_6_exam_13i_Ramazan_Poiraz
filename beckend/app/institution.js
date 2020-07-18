const express = require('express');

const Institution = require('../models/Institution');
const Image = require('../models/Image');
const Review = require('../models/Review');

const authorization = require('../middlewerase/authorization');

const router = express.Router();
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.uploads)
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.post('/review/:id', authorization, async (req, res) => {
    try {

        const newReview = await Review.create({
            user: req.currentUser._id,
            institution: req.params.id,
            comment: req.body.comment,
            quality: parseInt(req.body.quality),
            service: parseInt(req.body.service),
            interior: parseInt(req.body.interior)
        });

        res.send(newReview)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.post('/image/:id', [authorization, upload.single('image')], async (req, res) => {
    try {
        if (req.file) {
            req.body.image = 'http://localhost:8000/uploads/' + req.file.filename;
        }

        if(req.body.image === '') return  res.status(404).send('Image not found!')

        const newImage = await Image.create({
            user: req.currentUser._id,
            institution: req.params.id,
            image: req.body.image
        });

        res.send(newImage)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.post('/', [authorization, upload.single('image')], async (req, res) => {
    try {
        if(req.body.agreement === false || req.body.agreement === 'false') return  res.status(400).send('To create an establishment, you need to agree to the license agreement!')
        if (req.file) {
            req.body.image = 'http://localhost:8000/uploads/' + req.file.filename;
        }


        const newInstitution = await Institution.create({
            title: req.body.title,
            user: req.currentUser._id,
            description: req.body.description,
            image: req.body.image
        });

        res.send(newInstitution)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.get('/', async (req, res) => {
   try {
       const institutions = await Institution.find();
       const reviews = await Review.find();
       const images = await Image.find();

       const data = institutions.map(institution => {
           const place = institution.toObject();
           place.images = images.filter(image => image.institution.toString() === place._id.toString()).length
           place.reviews = reviews.filter(review => review.institution.toString() === place._id.toString()).length

           let quality = 0;
           let service = 0;
           let interior = 0;

           reviews.filter(review => review.institution.toString() === place._id.toString()).forEach(e => {
               quality += e.quality;
               service += e.service;
               interior += e.interior;
           });

           place.rating = ( (
               Number((quality /= place.reviews).toString().slice(0, 3)) +
               Number((service /= place.reviews).toString().slice(0, 3)) +
               Number((interior /= place.reviews).toString().slice(0, 3))
           ) / 3).toString().slice(0,3)

           return place
       })

       res.send(data);
   } catch (e) {
       console.log(e)
       res.status(404).send(e)
   }
});

router.get('/:id', async (req, res) => {
    try {
        let institution = await Institution.findOne({_id: req.params.id});
        const reviews = await Review.find({institution: req.params.id}).populate('user');
        institution = institution.toObject()
        institution.images = await Image.find({institution: req.params.id}).populate('user');

        if(reviews[0]) {
            let quality = 0;
            let service = 0;
            let interior = 0;

            reviews.forEach(e => {
                quality += e.quality;
                service += e.service;
                interior += e.interior;
            });

            institution.reviews = reviews;

            institution.ratings = {};
            institution.ratings.quality = (quality /= reviews.length).toString().slice(0, 3);
            institution.ratings.service = (service /= reviews.length).toString().slice(0, 3);
            institution.ratings.interior = (interior /= reviews.length).toString().slice(0, 3);
        }

        res.send(institution);
    } catch (e) {
        res.status(404).send(e)
    }
});

router.delete('/:id', async (req, res) => {
    await Institution.deleteOne({_id: req.params.id});

    res.send({message: 'Delete success!'});
});

module.exports = router;