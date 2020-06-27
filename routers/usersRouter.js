//node modules
const router = require('express').Router();

//proyect modules
const User = require('../models/user');
const auth = require('../auth');

router.get ('/', auth.ensureUser, async (req, res, next) => {
    const { offset, limit, name, hobby } = req.query;
    try {
        const users = await User.list({
            offset: parseInt(offset),
            limit: parseInt(limit),
            name,
            hobby
        });
    
        res.json(users);

    } catch(err) {
        return next(err);
    }
});

router.get ('/hobby', auth.ensureUser, async (req, res, next) => {
    
    try {
        const users = await User.listByHobby();
    
        res.json(users);

    } catch(err) {
        return next(err);
    }
});

router.post ('/', auth.ensureAdmin, async (req, res, next) => {

    try {
        const user = await User.create(req.body);
    
        res.json(user);

    } catch(err) {
        return next(err);
    }
});

router.delete ('/:id', auth.ensureAdmin, async (req, res, next) => {

    try {

        await User.remove(req.params.id);
    
        res.json({success: true});

    } catch(err) {
        return next(err);
    }
});

module.exports = router;