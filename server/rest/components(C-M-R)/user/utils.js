class UserValidation {
    constructor(User) {
        this.user = User
    }
    isEmail(email) {
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        console.log(email)
        if (email.match(regex) == null)
            return (false)
        return (true)
    }
    isAlphaNum(string) {
        var letterNumber = /^[0-9a-zA-Z]+$/;
        if (string.match(letterNumber))
            return true;
        return (false);
    }
    passwordFormat(password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;
        if (password.match(regex))
            return (true)
        return (false)
    }
    rightLength(string, min, max) {
        return (string.length >= min && string.length <= max)
    }
    async isAlreadyInDB(data) {
        // {username, email} = data
        return (await this.user.exists('username', data.username) || await this.user.exists('email', data.email))
    }
};
module.exports = UserValidation;