class UserValidation {
    // constructor(props) {
    //     super(props);
    //     console.log(props)
    // }
    isEmail(email) {
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        console.log(email)
        if (email.match(regex) == null)
            return (false)
        return (true)
    }
};
module.exports = UserValidation;