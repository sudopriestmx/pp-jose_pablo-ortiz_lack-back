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
    registrationDate: {type: Date, required: true, default: moment().toISOString(), index: true}

});

module.exports = {
    list,
    create,
    remove,
    listByHobby,
    model: User
  }

async function list (opts = {}) {
    const { name, hobby } = opts;
    const query = {};
    if (name) query.name = { "$regex": name, "$options": "i" };
    if (hobby) query.hobby = { "$regex": hobby, "$options": "i" };

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

async function listByHobby () {

    const startDate = new Date(moment().subtract(3, 'days').toISOString());
    const endDate = new Date(moment().toISOString());

    console.log(startDate, ' ', endDate);

    const users = await User.aggregate([
        {
            $match: {
                age: {$gte: 18},
                gender: 'Masculino',
                registrationDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        { 
            $group: {
                "_id": "$hobby",
                "users": { 
                    $push: {
                        name: '$name',
                        phone: '$phone'
                    }
                } 
            }
        }
    ]);

    return users;
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