const cuid = require('cuid');
const { isEmail, isMobilePhone, contains } = require('validator');
const moment = require('moment');

const db = require('../db');

const User = db.model('User', {
    _id: { type: String, default: cuid },
    name: { type: String, required: true, index: true},
    email: emailSchema({required: true}),
    phone: phoneSchema({required: true}),
    password: { type: String, required: true},
    age: { type: Number, required: true},
    gender: {type: String, enum: ['Masculino', 'Femenino', 'Otro'] },
    hobby: {type: String, required: true, index: true},
    registrationDate: {type: Date, required: true, default: Date.now(), index: true}

});

module.exports = {
    list,
    create,
    remove,
    model: User
  }

async function list (opts = {}) {
    const { name, hobby } = opts;
    let query;
    if (name) {
        if (hobby) {
            query = {
                name: name,
                hobby: hobby
            };
        } else {
            query = {
                name: name
            };
        }
    } else {
        query = {};
    }

    const users = await User.find(query)
        .sort({registrationDate: 1});
    
    return users;
}

async function create (fields) {
    const user = await new User(fields).save();

    return user;
}

async function remove (_id) {

    await User.deleteOne({ _id })
}

function emailSchema (opts = {}) {
    const { required } = opts
    return {
        type: String,
        required: !!required,
        validate: {
            validator: isEmail,
            message: props => `${props.value} no es un correo válido`
        }
    }
}

function phoneSchema (opts = {}) {
    const { required } = opts
    return {
        type: String,
        required: !!required,
        validate: {
            validator: isMobilePhone,
            message: props => `${props.value} no es un teléfono válido`
        }
    }

}