const axios = require('axios');
const apiCallbacks = require('../../UI/callbacks/api.callback');
const settings = require('../../config.env');
const logger = require('../../common/logging/logger');
const RSAKey = require('../../cryptography/RSA').RSAKey;

function Token(){
    let accessToken = '';
    let refreshToken = '';
    let privateKey = '';

    this.login = (email, password) => { 
        return axios.post(settings.apiEndpoint + '/auth', {email: email, password: password})
            .then(response => {
                accessToken = response.data.accessToken;
                refreshToken = response.data.refreshToken;

                setTimeout(this.refresh.bind(this), settings.jwt_expiration_in_seconds*1000)
                
                privateKey = new RSAKey(); //read from file
                
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
            }

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
        return axios.post(settings.apiEndpoint + '/users', body)
    }

    this.post = (apiPath, body) => {
        return axios.post(settings.apiEndpoint + apiPath, body, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }

        })
    }

    this.get = (apiPath, body) => {
        return axios.get(settings.apiEndpoint + apiPath, body, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }

        })
    }

    this.patch = (apiPath, body) => {
        return axios.patch(settings.apiEndpoint + apiPath, body, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }

        })
    }

    this.delete = (apiPath, body) => {
        return axios.delete(settings.apiEndpoint + apiPath, body, {
            headers: {
                Authorization: 'Bearer ' + this.accessToken
            }

        })
    }
}


exports.Token = Token;



