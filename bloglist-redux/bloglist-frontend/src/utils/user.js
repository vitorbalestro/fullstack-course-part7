import jwtDecode from 'jwt-decode'

function getLoggedUserId() {

    var loggedUserId = ''
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
        var loggedUser = JSON.parse(loggedUserJSON)
        var token = loggedUser.token
        // eslint-disable-next-line
        loggedUserId = jwtDecode(token, process.env.SECRET).id
    }

    return loggedUserId

}

export default getLoggedUserId