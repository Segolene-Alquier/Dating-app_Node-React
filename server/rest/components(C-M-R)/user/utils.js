class UserValidation {
    constructor(User) {
        this.user = User
    }

    isEmail(email) {
        // eslint-disable-next-line no-control-regex
        const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (!email) return false        
        if (email.match(regex))
            return (true)
        return (false)
    }

    isAlphaNum(string) {
        const regex = /^[0-9a-zA-Z]+$/;
        if (!string) return false
        if (string.match(regex))
            return true;
        return (false);
    }

    passwordFormat(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&.]).{8,10}$/;
        if (!password) return false
        if (password.match(regex))
            return (true)
        return (false)
    }

    rightLength(string, min, max) {
        if (!string) return false
        return (string.length >= min && string.length <= max)
    }

    async createUserErrors(data) {
        let errors = []
        const { firstname, surname, username, password, email } = data

        if (!this.isEmail(email)) errors.push("The email you entered is not correct")
        if (!this.isAlphaNum(username)) errors.push("The Username must contain only letters and numbers")
        if (!this.isAlphaNum(surname)) errors.push("The surname must contain only letters and numbers")
        if (!this.isAlphaNum(firstname)) errors.push("The firstname must contain only letters and numbers")
        if (!this.passwordFormat(password)) errors.push("The password must contain at least 8 characters, 1 upper lower numeric and special character ( #$^+=!*()@%&. )")
        if (!this.rightLength(username, 2, 15)) errors.push("The username must contain between 2 and 15 characters")
        if (!this.rightLength(firstname, 2, 40)) errors.push("The firstname must contain between 2 and 40 characters")
        if (!this.rightLength(surname, 2, 40)) errors.push("The surname must contain between 2 and 40 characters")
        if (await this.user.exists('username', username)) errors.push("This username already exist")
        if (await this.user.exists('email', email)) errors.push("This email already exist")
        return (errors)
    }

    async updateUserErrors(data) {
        let errors = []
        const { firstname, surname, username, email, gender, sexualOrientation, description, interests, images, profilePicture, location, notificationMail, notificationMail, lastVisit, popularityRate, birthDate } = data
        // créer fonction qui prend en parametre une array de fonctions de tests 
        // Pour chaque valeur, j'appelle cette fonction avec les bonnes fonctions de tests en parametres
        if (!this.isEmail(email)) errors.push("The email you entered is not correct")
        if (!this.isAlphaNum(username)) errors.push("The Username must contain only letters and numbers")
        if (!this.isAlphaNum(surname)) errors.push("The surname must contain only letters and numbers")
        if (!this.isAlphaNum(firstname)) errors.push("The firstname must contain only letters and numbers")
        if (!this.passwordFormat(password)) errors.push("The password must contain at least 8 characters, 1 upper lower numeric and special character ( #$^+=!*()@%&. )")
        if (!this.rightLength(username, 2, 15)) errors.push("The username must contain between 2 and 15 characters")
        if (!this.rightLength(firstname, 2, 40)) errors.push("The firstname must contain between 2 and 40 characters")
        if (!this.rightLength(surname, 2, 40)) errors.push("The surname must contain between 2 and 40 characters")
        if (await this.user.exists('username', username)) errors.push("This username already exist")
        if (await this.user.exists('email', email)) errors.push("This email already exist")
        return (errors)
    }

    filterInputValues(requester, values) {
        let authorized_values = []
        if (requester === 'API')
          authorized_values = ['firstname', 'surname', 'username', 'email', 'gender', 'sexualOrientation', 'description', 'interests', 'images', 'profilePicture', 'location', 'notificationMail', 'notificationMail', 'lastVisit', 'popularityRate', 'birthDate']
        else if (requester === 'backend')
          authorized_values = ['firstname', 'surname', 'username', 'email', 'gender', 'sexualOrientation', 'description', 'interests', 'images', 'profilePicture', 'location', 'notificationMail', 'notificationMail', 'lastVisit', 'popularityRate', 'birthDate']
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