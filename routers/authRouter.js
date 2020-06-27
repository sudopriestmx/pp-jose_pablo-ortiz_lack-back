//node modules
const router = require('express').Router();

//proyect modules
const auth = require('../auth');

router.post('/', auth.authenticate, auth.login);

module.exports = router;