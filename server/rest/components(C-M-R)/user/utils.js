const Gender = require("../gender/model")
const gender = new Gender()

class UserValidation {
    constructor(User) {
        this.user = User
    }

    isEmail({input}) {
        // eslint-disable-next-line no-control-regex
        const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (input === '') return {boolean: false, error: `The email is blank`}      
        if (input.match(regex))
            return ({boolean: true})
        return ({boolean: false, error: `The email you entered is not correct`})
    }

    isAlphaNum({input, input_name}) {
        const regex = /^[0-9a-zA-Z]+$/;
        if (input === '') return {boolean: false, error: `The ${input_name} is blank`}
        if (input.match(regex))
            return true;
        return ({boolean: false, error: `The ${input_name} must contain only letters and numbers`});
    }

    isAlpha({input, input_name}) {
        const regex = /^[a-zA-Z]+$/;
        if (input === '') return {boolean: false, error: `The ${input_name} is blank`}
        if (input.match(regex))
            return {boolean: true};
        return ({boolean: false, error: `The ${input_name} must contain only letters`});
    }

    isBoolean({input, input_name}) {
        if (input === true || input === false)
            return {boolean: true};
        else
            return ({boolean: false, error: `The ${input_name} is not a boolean`}); 
    }

    async exists({input, input_name, model_instance}) {
        let call = await model_instance.exists(input_name, input)
        console.log(call)
        if (call === true) 
            return {boolean: false, error: `The ${input_name} already exist`}
        else
            return ({boolean: true});
    }

    async dontExists({input, input_name, model_instance}) {
        let call = await model_instance.exists(input_name, input)
        console.log(call)
        if (call === true) 
            return ({boolean: true})
        else
            return {boolean: false, error: `This ${model_instance} don't exist`};
    }

    async fieldExists({input, input_name, user_instance}) {
        let call = await user_instance.exists(input_name, input)
    }

    passwordFormat(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&.]).{8,10}$/;
        if (!password) return false
        if (password.match(regex))
            return (true)
        return (false)
    }

    rightLength({input, input_name, min_length, max_length}) {
        if (input === '') return {boolean: false, error: `The ${input_name} is blank`}
        if (input.length >= min_length && input.length <= max_length)
            return ({boolean: true})
        else
        return ({boolean: false, error: `The ${input_name} must contain between ${min_length} and ${max_length} characters`})
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
        let errors = []
        const { firstname, surname, username, email, gender, sexualOrientation, description, interests, images, profilePicture, location, notificationMail, birthDate } = data

        this.inputTester({input: firstname, input_name: 'first name', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)
        this.inputTester({input: surname, input_name: 'surname', min_length: 2, max_length: 40}, [this.isAlpha, this.rightLength], errors)
        
        // await ne fonctionne pas pour les fonctions de check if email exist et check if username exist
        await this.inputTester({input: username, input_name: 'username', min_length: 2, max_length: 15, user_instance: this.user}, [this.isAlphaNum, this.rightLength, this.userExists], errors)
        this.inputTester({input: description, input_name: 'surname', min_length: 2, max_length: 5000}, [this.rightLength], errors)
        // Gender a tester car await dans fonction en parametre ne fonctionne pas
        await this.inputTester({input: gender, input_name: 'gender'}, [this.dontExists], errors)        
        // Sexual orientation : pas de model encore
        // Interests : pas de model encore
        // Image: ne sait pas encore comment on va faire
        // ProfilePicture: ne sait pas encore comment on va faire
        // Location : ne sais pas comment verifier que c'est une position correcte
        this.inputTester({input: notificationMail, input_name: 'notification email', min_length: 2, max_length: 5000}, [this.isBoolean], errors)
        // birthDate : ne sais pas encore le format de date

        // console.log(errors)
        return (errors)
    }
    // WIP
    // async inputTester(variable, functions, errors) {
    //     if (variable['input'] === undefined)
    //         return
    //     const requests = functions.map((func) => {
    //         return func(variable).then((a) => {
    //             return a
    //         })
    //     })
    //     return Promise.all(requests).then(a => console.log(JSON.stringify(a)))
    //     // functions.forEach(async test_function => {
    //     //     const result = await test_function(variable)
    //     //     if (result['boolean'] === false)
    //     //         errors.push(result['error'])
    //     // });
    // }
    async inputTester(variable, functions, errors) {
        if (variable['input'] === undefined)
            return
        functions.forEach(async test_function => {
            const result = await test_function(variable)
            if (result['boolean'] === false)
                errors.push(result['error'])
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