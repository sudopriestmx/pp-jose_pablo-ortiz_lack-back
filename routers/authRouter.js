//node modules
const router = require('express').Router();

//proyect modules
const auth = require('../auth');

console.log('authRouter');
router.post('/', auth.authenticate, auth.login);

module.exports = router;