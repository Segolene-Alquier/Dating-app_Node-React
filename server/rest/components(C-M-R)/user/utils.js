const Gender = require("../gender/model")
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
        if (input === '') resolve({boolean: false, error: `The ${input_name} is blank`})
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
                resolve( {boolean: false, error: `The ${input_name} already exist`})
            else
                resolve({boolean: true});
        })
    }

    doesntExist({input, input_name, model_instance, model_name}) {
        return new Promise(async function(resolve, reject) {
            input = parseInt(input)
            let call = await model_instance.exists(input_name, input)
            if (call === true) 
                resolve({boolean: true})
            else
                resolve({boolean: false, error: `This ${model_name} don't exist`});
        })
    }

    doesntExistEach({input, input_name, model_instance, model_name}) {
        return new Promise(async function(resolve, reject) {
            input = parseInt(input)
            let call = await model_instance.exists(input_name, input)
            if (call === true) 
                resolve({boolean: true})
            else
                resolve({boolean: false, error: `This ${model_name} don't exist`});
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
            if (input === '') resolve({boolean: false, error: `The ${input_name} is blank`})
            if (input.length >= min_length && input.length <= max_length)
                resolve({boolean: true})
            else
            resolve({boolean: false, error: `The ${input_name} must contain between ${min_length} and ${max_length} characters`})
        })
    }

    async createUserErrors(data) {
        let errors = []
        const { firstname, surname, username, password, email } = data
        
        // doit encore checker si les variables sont undefined
        this.inputTester({input: firstname, input_name: 'first name', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)
        this.inputTester({input: surname, input_name: 'surname', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)
        await this.inputTester({input: username, input_name: 'username', min_length: 2, max_length: 15, user_instance: this.user}, [this.isAlphaNum, this.rightLength, this.userExists], errors)
        await this.inputTester({input: email, input_name: 'email', min_length: 3, max_length: 80, user_instance: this.user}, [this.isEmail, this.rightLength, this.userExists], errors)
        if (await this.user.exists('username', username)) errors.push("This username already exist")
        if (await this.user.exists('email', email)) errors.push("This email already exist")

        return (errors)
    }


    async updateUserErrors(data) {
        const { firstname, surname, username, email, gender, sexualOrientation, description, interests, images, profilePicture, location, notificationMail, birthDate } = data
        var isEmail = this.isEmail({input: email})
        var emailExists = this.exists({input: email, input_name: "email", model_instance: this.user})
        var usernameExists = this.exists({input: username, input_name: "username", model_instance: this.user})
        var usernameIsAlphaNum = this.isAlphaNum({input: username, input_name: 'user name'})
        var usernameRightLength = this.rightLength({input: username, input_name: 'username', min_length: 2, max_length: 15, user_instance: this.user})
        var firstnameIsAlpha = this.isAlpha({input: firstname, input_name: 'first name'})
        var firstnameRightLength = this.rightLength({input: firstname, input_name: 'first name', min_length: 2, max_length: 40})
        var surnameIsAlpha = this.isAlpha({input: surname, input_name: 'surname'})
        var surnameRightLength = this.rightLength({input: surname, input_name: 'surname', min_length: 2, max_length: 40})
        var descriptionRightLength = this.rightLength({input: description, input_name: 'surname', min_length: 2, max_length: 5000})
        var genderDoesntExist = this.doesntExist({input: gender, input_name: 'id', model_instance: genderInstance, model_name : "gender"})
        var notificationIsBoolean = this.isBoolean({input: notificationMail, input_name: 'notification email'})
        var InterestDoesntExist = this.doesntExist({input: interests, input_name: 'id', model_instance: genderInstance, model_name : "interest"})
        // Sexual orientation : pas de model encore
        // Interests : pas de model encore
        // Image: ne sait pas encore comment on va faire
        // ProfilePicture: ne sait pas encore comment on va faire
        // birthDate : ne sais pas encore le format de date        
        let errors = []

        Promise.all([isEmail, emailExists, usernameExists, usernameIsAlphaNum, usernameRightLength, firstnameIsAlpha, firstnameRightLength, surnameIsAlpha, surnameRightLength, descriptionRightLength, genderDoesntExist, notificationIsBoolean]).then(values => console.log(values))

        // console.log(email);
        return ([])
    }

    // async updateUserErrors(data) {
    //     let errors = []
    //     const { firstname, surname, username, email, gender, sexualOrientation, description, interests, images, profilePicture, location, notificationMail, birthDate } = data

    //     this.inputTester({input: firstname, input_name: 'first name', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)
    //     this.inputTester({input: surname, input_name: 'surname', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)
        
    // //     // await ne fonctionne pas pour les fonctions de check if email exist et check if username exist
    //     await this.inputTester({input: username, input_name: 'username', min_length: 2, max_length: 15, user_instance: this.user}, [this.isAlphaNum, this.rightLength, this.userExists], errors)
    // //     this.inputTester({input: description, input_name: 'surname', min_length: 2, max_length: 5000}, [this.rightLength], errors)
    // //     // Gender a tester car await dans fonction en parametre ne fonctionne pas
    //     await this.inputTester({input: gender, input_name: 'gender'}, [this.dontExists], errors)        
    // //     // Sexual orientation : pas de model encore
    //     // Interests : pas de model encore
    //     // Image: ne sait pas encore comment on va faire
    //     // ProfilePicture: ne sait pas encore comment on va faire
    //     // Location : ne sais pas comment verifier que c'est une position correcte
    //     this.inputTester({input: notificationMail, input_name: 'notification email', min_length: 2, max_length: 5000}, [this.isBoolean], errors)
    //     // birthDate : ne sais pas encore le format de date

    //     // console.log(errors)
    //     return (errors)
    // }
    // WIP
    async inputTester(variable, functions, errors) {
        if (variable['input'] === undefined)
            return
        functions.forEach(oneFunction => {
            oneFunction = oneFunction()
        });
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