const baseUri = 'http://192.168.160.60:8080/api/';

export default {
    restApi: {
        baseUri: baseUri,
        houses: baseUri + 'houses',
        signin: baseUri + '/users/login',
        signout: baseUri + 'users/logout',
        locadores: baseUri + 'locadores',
        locatarios: baseUri + 'locatarios',
        wishlist: baseUri + 'locatarios/wishlist'
    }
}
