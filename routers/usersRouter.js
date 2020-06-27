const router = require('express').Router();
const User = require('../models/user');

router.get ('/', async (req, res, next) => {
    const { name, hobby } = req.query;
    try {
        const users = await User.list({
            name,
            hobby
        });
    
        res.json(users);

    } catch(err) {
        return next(err);
    }
});

router.get ('/hobby', async (req, res, next) => {
    
    try {
        const users = await User.listByHobby();
    
        res.json(users);

    } catch(err) {
        return next(err);
    }
});

router.post ('/', async (req, res, next) => {

    try {
        const user = await User.create(req.body);
    
        res.json(user);

    } catch(err) {
        return next(err);
    }
});

router.delete ('/:id', async (req, res, next) => {

    try {

        await User.remove(req.params.id);
    
        res.json({success: true});

    } catch(err) {
        return next(err);
    }
});

module.exports = router;