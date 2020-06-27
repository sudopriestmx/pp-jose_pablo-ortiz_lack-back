#Fullstack MEAN Test (Backend)

API for user registration and querying implemented in **NodeJS** using **MongoDB** as NoSQL database and **JWT** authentication. Developed for knowledge asessment test.

##Quick start
> Note: Use Node.JS v. 12.16.1, npm 6.14.5 and mongodb v. 4.2 for guaranteed working results
> Clone/Download the repo and create a .env file based on the `.env-example` file for the environment variables needed for the server to work
```bash
# clone the repo
$ git clone https://github.com/sudopriestmx/pp-jose_pablo-ortiz_lack-back my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

access the API endpoint at [http://localhost:3000](http://localhost:3000) using cURL, postman or your API client of choice.

# Table of Contents

* [API structure](#api-structure)
    * [Login](#login)
    * [GET users](#get-users)
    * [POST user](#post-user)
    * [DELETE user](#delete-user)
    * [GET custom query](#get-custom-query)
* [License](#license)

# API structure

## Login ['/login']
Authenticates the user to use the API
* (param: required) username: the username to access the API. to access all functionality use the 'admin' username
* (param: required) password: the password of the username used to access the API. The admin password is set through the environment variables and by default is `sudo make me a sandwich`
* (returns) a jwt inside a cookie to access the API

Example result:

```json
{
    "success": true,
    "token": "encoded jwt token string"
}
```

## GET Users ['/users']
Obtains an array of users in the database. Can be filtered with optional parameters by name and/or hobby
* (query param: optional) name: name of the user to filter the database by.
* (query param: optional) hobby: name of the hobby to filter the database by.
* (query param: optional) offset: number of entries to skip.
* (query param: optional) limit: number of entries to show.
* (returns) a JSON array with users

Example result:

```json
[
    {
        "registrationDate": "2020-06-26T23:32:17.187Z",
        "_id": "ckbwuq6w30000tku53qg58vhu",
        "name": "Adam Driver",
        "email": "adam.driver@outlook.com",
        "phone": "2223861724",
        "password": "$2b$10$2z0i4Xu3y3lipjmUwB1bgOKOEODXmVkJ0KaBYkk8T7AufDAnvfAy6",
        "age": 17,
        "gender": "Masculino",
        "hobby": "writing",
        "__v": 0
    },
    {
        "registrationDate": "2020-06-26T23:35:04.315Z",
        "_id": "ckbww0p7s0003p4u59v8gc2hs",
        "name": "Adam West",
        "email": "adam.west@hotmail.com",
        "phone": "2222837462",
        "password": "$2b$10$8ltbJBWaXsVSw2/djwEoC.8VdXRm6CnMJcq3TM.Xd.i4icAaaiNGG",
        "age": 20,
        "gender": "Masculino",
        "hobby": "reading",
        "__v": 0
    }
]
```

## POST User ['/users']
Adds a new user to the database
* (param: required) name: name of the user.
* (param: required) email: email and username of the user.
* (param: required) phone: phone of the user.
* (param: required) password: password of the user.
* (param: required) age: age of the user.
* (param: required) gender: gender of the user. Can be `Masculino`, `Femenino` or `Otro`
* (param: required) hobby: hobby of the user.
* (returns) a JSON object with the information of the new user

Example result:

```json
{
    "registrationDate": "2020-06-27T03:19:24.274Z",
    "name": "Eve Doe",
    "email": "eve.doe@outlook.com",
    "phone": "2222457689",
    "password": "$2b$10$4DGZUblnOO.kOExVzf07UOumnU3JkITwLj1HyjetAGzfFhbQDWbJe",
    "age": 22,
    "gender": "Femenino",
    "hobby": "reading",
    "_id": "ckbx8xygh0000b0u5f45ndhzs",
    "__v": 0
}
```

## DELETE User ['/users/:id']
Deletes a user from the database
* (param: required) id: unique id of the user to be deleted.
* (returns) a JSON object with a delete confirmation

Example result:

```json
{
    "success": true
}
```

## GET Custom Query ['/users/hobby']
Obtains an array with users grouped by hobby, showing their name and phone number, if they are 18 years or older, male, and were created in the last 3 days.
* (returns) a JSON array with the matched users

Example result:

```json
[
    {
        "_id": "writing",
        "users": [
            {
                "name": "Carlos Perez",
                "phone": "2222837462"
            },
            {
                "name": "Pedro Paramo",
                "phone": "2222837462"
            }
        ]
    },
    {
        "_id": "reading",
        "users": [
            {
                "name": "Juan Rulfo",
                "phone": "2222837462"
            },
            {
                "name": "Luis Lopez",
                "phone": "2222837462"
            }
        ]
    }
]
```
# Licence
[MIT]('LICENSE')



