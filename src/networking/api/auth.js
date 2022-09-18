const axios = require('axios');
const settings = require('../../config.env');
const logger = require('../../common/logging/logger');
const RSAKey = require('../../cryptography/RSA').RSAKey;
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });
const FormData = require('form-data');

function Token(){
    let accessToken = '';
    let refreshToken = '';
    let timeout;

    this.login = (email, password) => { 
        return axios.post(settings.apiEndpoint + '/auth', {email: email, password: password}, {httpsAgent: agent})
            .then(response => {
                accessToken = response.data.accessToken;
                refreshToken = response.data.refreshToken;
                timeout = setTimeout(this.refresh.bind(this), settings.jwt_expiration_in_seconds*1000)
                                
                return true;
            })
            .catch(error => {
                if (error.response && error.response.status && error.response.status == 400){
                    return false;
                }
                console.error(error);
                return false;
            })
    }

    this.logout = () => {
        clearTimeout(timeout);
        accessToken = '';
        refreshToken = '';
    }

    this.refresh = () => {
        axios.post(settings.apiEndpoint + '/auth/refresh', {
            refresh_token: refreshToken
        }, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }, 
            httpsAgent: agent

        }).then(response => {
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
        
            timeout = setTimeout(this.refresh.bind(this), settings.jwt_expiration_in_seconds * 1000)
        
        }).catch(error => {
            if (error.response && error.response.status && error.response.status == 400) {
            }
        })
    }

    this.createUser = (body) => {
        return axios.post(settings.apiEndpoint + '/users', body, {httpsAgent: agent})
    }

    this.post = (apiPath, body) => {
        return axios.post(settings.apiEndpoint + apiPath, body, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }, 
            httpsAgent: agent

        })
    }

    this.get = (apiPath) => {
        return axios.get(settings.apiEndpoint + apiPath, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }, 
            httpsAgent: agent

        })
    }

    this.patch = (apiPath, body) => {
        return axios.patch(settings.apiEndpoint + apiPath, body, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }, 
            httpsAgent: agent

        })
    }

    this.delete = (apiPath) => {
        return axios.delete(settings.apiEndpoint + apiPath, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }, 
            httpsAgent: agent

        })
    }

    this.put = (apiPath, file, filetype) => {
        let formData = new FormData();
        formData.append(filetype, file);
        return axios.put(settings.apiEndpoint + apiPath, formData, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
            },
            httpsAgent: agent
        })
    } 

    this.stream = (apiPath, callback) => {
        axios.get(settings.apiEndpoint + apiPath, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            httpsAgent: agent,
            responseType: 'stream'
        }).then(response => {
            const stream = response.data;
            stream.on('data',  data => {
                callback(data);
            });
        })
        
    }
}


exports.Token = Token;



