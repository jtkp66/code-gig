const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

router.get('/', (req, res) => 
    Gig.findAll()
        .then(gigs => {
            res.render('gigs', {
                gigs
            });
        })
        .catch(err => console.log(err)));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
    const data = {
        title: 'Looking for a wordpress developer',
        technologies: 'wordpress,php,html,css',
        budget: '1000',
        description: 'lorum ipsum',
        contact_email: 'user2@gmail.com'
    }

    let { title, technologies, budget, description, contact_email } = data;

    // Insert into table
    Gig.create({
        title,
        technologies,
        description,
        budget,
        contact_email
    })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err));
});

module.exports = router;
