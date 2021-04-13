/* Api endpoints */

enum endpoints {
    login = '/api/auth/login',
    signup = '/api/auth/signup',
    getUser = '/api/auth/user/',
    refreshToken = '/api/auth/refresh-token',
    verifyAccessToken = '/api/auth/verifyAccessToken',

    getUrls = '/api/urls/',
    addUrl = '/api/urls/addUrl',
    deleteUrl = '/api/urls/delete',
};

export default endpoints;