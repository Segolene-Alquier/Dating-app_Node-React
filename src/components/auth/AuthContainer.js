import decode from "jwt-decode";

const auth = callback => {

    const getToken = () => {
        return (localStorage.getItem("token"))
    }

    const isTokenExpired = token => {
        const currentTime = Date.now() / 1000
        try {
            const decoded = decode(token)
            if (decoded.exp < currentTime) {
                console.log("Your token is expired")
                return (true)
            }
            else {
                return (false)
            }
        } catch (err) {
            console.log(err)
            return (true)
        }
    }

    const isLoggedIn = () => {
        const token = getToken()
        if (token === null || token === undefined) {
            // pas connecté
            return (false)
        }
        else {
            if (isTokenExpired(token)) {
                // need to delete expired token ?
                return (false)
            }
            // verifier le token avec le serveur
            
        }
        console.log('TOKEN : ', token)
        return (true)
    }
    return {
        getToken,
        isLoggedIn
    }
}

export default auth