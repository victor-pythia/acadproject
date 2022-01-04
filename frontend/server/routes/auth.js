const express = require('express');
const router = express.Router();        

const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const fs = require('fs');

const {User} = require('../models');
const { kStringMaxLength } = require('buffer');
const privateKEY  = fs.readFileSync('./private.key', 'utf8');

router.post('/login', (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    console.log("egal");

    User.findOne({where: {email: email}}).then(user => {
        const hash = crypto.createHash('sha256').update(pass).digest('base64');
        if(hash === user.passwordHash){
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.rol
            }
            console.log(payload);
            jwt.sign(payload, privateKEY, { algorithm: 'RS256'}, (err, token) => {
                    if(err){
                        console.log('Err');
                        console.log(err);
                        res.send({ token: null, message: "no_account"})   
                    } else{
                        console.log(`${user.username} s-a logat`);
                        res.json({
                            message: 'ok',
                            token: token,   
                            username: user.username,
                            credit: user.credit,
                            role: user.rol
                        });
                    }
                });
        } else{
            console.log('no user');
            res.send({message: "err"});
        }
    })   
});

// Returneaza userul pentru autentificare n shit
router.get('/me', (req, res) => {
    try{
        res.send({
            user: req.user
        })
    }catch(err){
        console.log('---me ', err);
    }

});



router.post('/register', (req, res) => {
    console.log('ad');
    req.body.passwordHash = crypto.createHash('sha256').update(req.body.password).digest('base64');
    delete req.body.password;
    User.create(req.body).then(() => {
        res.send({message: "ok"})
    })

});

module.exports = router