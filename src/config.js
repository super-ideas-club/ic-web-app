
const config = {
    // serverUrl: 'https://292f-5-18-162-172.eu.ngrok.io/',
    serverUrl: 'http://localhost:8000/',
    signInPath: 'api/auth/signin/',
    signUpPath: 'api/auth/signup/',
    userInfo: 'user/info/',
    getAllSkills: 'api/user-skill/all',
    getAllThemes: 'api/ideas/themes/all',
    postNewSkill: 'api/user-skill/create',
    getUserSkills: 'api/user-skill/by-user/'
}

const headers = {
    "content-type": "application/json"
};

export { config, headers }