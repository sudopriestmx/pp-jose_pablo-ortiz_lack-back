const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const User = require('./models/user');

const jwtSecret = process.env.JWT_SECRET || 'crazy little secret called love'
const adminPassword = process.env.ADMIN_PASSWORD || 'sudo make me a sandwich'
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' }

passport.use(adminStrategy())
const authenticate = passport.authenticate('local', { session: false })

module.exports = {
  authenticate,
  login,
  ensureAdmin,
  ensureUser
}

async function login (req, res, next) {
    try {

        const token = await sign({ username: req.user.email });
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ success: true, token: token });

    } catch(err) {

        return next(err);
    }
    
}

async function ensureAdmin (req, res, next) {
  
    try {

        const jwtString = req.headers.authorization || req.cookies.jwt;

        const payload = await verify(jwtString);

        if (payload.username) {
            req.user = payload
            if (req.user.email === 'admin') req.isAdmin = true
            return next()
        }
    
            const err = new Error('Unauthorized')
            err.statusCode = 401
            next(err)

    } catch(err) {
        return next(err);
    }
}

async function ensureUser (req, res, next) {
  
    try {

        const jwtString = req.headers.authorization || req.cookies.jwt;

        const payload = await verify(jwtString);
        if (payload.username) {
            return next()
        }
    
            const err = new Error('Unauthorized')
            err.statusCode = 401
            next(err)

    } catch(err) {
        return next(err);
    }
}



async function sign (payload) {
    try {

        const token = await jwt.sign(payload, jwtSecret, jwtOpts);
        return token;

    } catch(err) {

        return next(err);
    }
}

async function verify (jwtString = '') {
  jwtString = jwtString.replace(/^Bearer /i, '')

  try {
    const payload = await jwt.verify(jwtString, jwtSecret)
    return payload
  } catch (err) {
    err.statusCode = 401
    throw err
  }
}

function adminStrategy () {

    return new Strategy(async function (username, password, cb) {
    
    const isAdmin = username === 'admin' && password === adminPassword;

    if (isAdmin) return cb(null, { email: 'admin' });

    try {

        const user = await User.get(username);
        if (!user) return cb(null, false);
        console.log(password);
        console.log(user.password);
        const isUser = await bcrypt.compare(password, user.password);
        console.log(isUser);
        if (isUser) return cb(null, { username: user.email });
    } catch (err) { }

        cb(null, false);
    });
}
