const Gender = require("../gender/model")
var _ = require('lodash');
const genderInstance = new Gender()

class UserValidation {
    constructor(User) {
        this.user = User
    }

    isEmail({input}) {
        return new Promise(function(resolve, reject) {
            // eslint-disable-next-line no-control-regex
            const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            if (input === '') resolve({boolean: false, error: `The email is blank`})
            if (input.match(regex))
                resolve({boolean: true})
            resolve({boolean: false, error: `The email you entered is not correct`})
        })

    }

    isAlphaNum({input, input_name}) {
        return new Promise(function(resolve, reject) {
        const regex = /^[0-9a-zA-Z]+$/;
        if (input === '') {
            resolve({boolean: false, error: `The ${input_name} is blank`})}
        if (input.match(regex))
            resolve({boolean: true});
        resolve(({boolean: false, error: `The ${input_name} must contain only letters and numbers`}));
        })
    }

    isAlpha({input, input_name}) {
        return new Promise(function(resolve, reject) {
        const regex = /^[a-zA-Z]+$/;
        if (input === '') resolve({boolean: false, error: `The ${input_name} is blank`})
        if (input.match(regex))
            resolve({boolean: true})
        resolve(({boolean: false, error: `The ${input_name} must contain only letters`}))
        })
    }

    isBoolean({input, input_name}) {
        return new Promise(function(resolve, reject) {
        if (input === 'true' || input === 'false')
            resolve({boolean: true})
        else
            resolve(({boolean: false, error: `The ${input_name} is not a boolean`}))
        })
    }

    exists({input, input_name, model_instance}) {
        return new Promise(async function(resolve, reject) {
            let call = await model_instance.exists(input_name, input)
            if (call === true) 
                resolve( {boolean: false, error: `The ${input_name} already exists`})
            else
                resolve({boolean: true});
        })
    }

    doesntExist({input, input_name, model_instance, model_name}) {
        return new Promise(async function(resolve, reject) {
            input = parseInt(input)
            let result = await model_instance.exists(input_name, input)
            if (result === true) 
                resolve({boolean: true})
            else
                resolve({boolean: false, error: `This ${model_name} doesn't exist`});
        })
    }

    doesntExistEach({input, input_name, model_instance, model_name}) {
        return new Promise(async function(resolve, reject) {
            input = parseInt(input)
            let call = await model_instance.exists(input_name, input)
            if (call === true) 
                resolve({boolean: true})
            else
                resolve({boolean: false, error: `This ${model_name} doesn't exist`});
        })
    }

    fieldExists({input, input_name, user_instance}) { // WIP
        return new Promise(async function(resolve, reject) {
          let call = await user_instance.exists(input_name, input)
        })
    }

    passwordFormat({input}) {
        return new Promise(function(resolve, reject) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&.]).{8,10}$/;
            if (!input) resolve({boolean: false, error: "This password is empty!"})
            if (input.match(regex))
                resolve({boolean: true})
            resolve({boolean: false, error: "This password doesn't match!"})
        })
    }

    rightLength({input, input_name, min_length, max_length}) {
        return new Promise(function(resolve, reject) {
            if (input === '') {
                resolve({boolean: false, error: `The ${input_name} is blank`})
            }
            if (input.length >= min_length && input.length <= max_length){
                resolve({boolean: true})
            } else {
            resolve({boolean: false, error: `The ${input_name} must contain between ${min_length} and ${max_length} characters`})}
        })
    }

    async createUserErrors(data) {
        let errors = []
        const { firstname, surname, username, password, email } = data
        
        // doit encore checker si les variables sont undefined
        await this.inputTester({input: firstname, input_name: 'first name', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)
        await this.inputTester({input: surname, input_name: 'surname', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)        
        await this.inputTester({input: username, input_name: 'username', min_length: 2, max_length: 15, model_instance: this.user}, [this.isAlphaNum, this.rightLength, this.exists], errors)
        await this.inputTester({input: email, input_name: 'email', model_instance: this.user}, [this.isEmail, this.exists], errors)
        // Password : on sait pas comment va etre le systeme des mots de passe        
        return (errors)
    }

    async inputTester(variable, functions, errors) {
        if (variable['input'] === undefined) {
            return
        }
        const promises = functions.map(async oneFunction => {
            return oneFunction = await oneFunction(variable)
        });
        await Promise.all(promises).then(values => {
            values.forEach(value => {
                if (value['boolean'] === false && !(errors.includes(value['error']))) {
                    errors.push(value['error'])
                }
            })
        })
    
    }

    async updateUserErrors(data) {
        const { firstname, surname, username, email, gender, sexualOrientation, description, interests, images, profilePicture, location, notificationMail, birthDate } = data
    
        // Sexual orientation : pas de model encore
        // Interests : pas de model encore
        // Image: ne sait pas encore comment on va faire
        // ProfilePicture: ne sait pas encore comment on va faire
        // birthDate : ne sais pas encore le format de date
        // Password : on sait pas comment va etre le systeme des mots de passe        
        let errors = []
        await this.inputTester({input: firstname, input_name: 'first name', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)
        await this.inputTester({input: surname, input_name: 'surname', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)        
        await this.inputTester({input: username, input_name: 'username', min_length: 2, max_length: 15, model_instance: this.user}, [this.isAlphaNum, this.rightLength, this.exists], errors)
        await this.inputTester({input: email, input_name: 'email', model_instance: this.user}, [this.isEmail, this.exists], errors)
        await this.inputTester({input: gender, input_name: 'id', model_instance: genderInstance, model_name: "gender"}, [this.doesntExist], errors)
        await this.inputTester({input: notificationMail, input_name: 'notification email'}, [this.isBoolean], errors)

        return (errors)
    }

    filterInputValues(requester, values) {
        let authorized_values = []
        if (requester === 'API')
          authorized_values = ['firstname', 'surname', 'username', 'email', 'gender', 'sexualOrientation', 'description', 'interests', 'images', 'profilePicture', 'location', 'notificationMail', 'birthDate']
        else if (requester === 'backend')
          authorized_values = ['firstname', 'surname', 'username', 'email', 'gender', 'sexualOrientation', 'description', 'interests', 'images', 'profilePicture', 'location', 'notificationMail', 'lastVisit', 'popularityRate', 'birthDate']
        const filtered_values = Object.keys(values)
        .filter(key => authorized_values.includes(key))
        .reduce((obj, key) => {
          obj[key] = values[key];
          return obj;
        }, {})
        return (filtered_values)
    }
};

module.exports = UserValidation;