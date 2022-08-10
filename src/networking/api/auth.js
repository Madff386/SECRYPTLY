const axios = require('axios');
const settings = require('../../config.env');
const logger = require('../../common/logging/logger');
const RSAKey = require('../../cryptography/RSA').RSAKey;
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });

function Token(){
    let accessToken = '';
    let refreshToken = '';

    this.login = (email, password) => { 
        return axios.post(settings.apiEndpoint + '/auth', {email: email, password: password}, {httpsAgent: agent})
            .then(response => {
                accessToken = response.data.accessToken;
                refreshToken = response.data.refreshToken;
                setTimeout(this.refresh.bind(this), settings.jwt_expiration_in_seconds*1000)
                                
                return true;
            })
            .catch(error => {
                return false;
            })
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
        
            setTimeout(this.refresh.bind(this), settings.jwt_expiration_in_seconds * 1000)
        
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

    this.delete = (apiPath, body) => {
        return axios.delete(settings.apiEndpoint + apiPath, body, {
            headers: {
                Authorization: 'Bearer ' + this.accessToken
            }, 
            httpsAgent: agent

        })
    }
}


exports.Token = Token;



