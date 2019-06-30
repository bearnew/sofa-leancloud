import axios from 'axios';
import qs from 'qs';
// const baseUrl = 'http://localhost:3000';
const baseUrl = '';

export const API = {
    getStoreText: 'store/getText',
    updateStoreText: 'store/updateText',
    getStorePic: 'store/getPic',
    updateStorePic: 'store/updatePic'
};

const request = (url, method, params) => {
    console.log(params)
    return new Promise((resolve, reject) => {
        axios({
            url: `${baseUrl}/${url}`,
            method,
            data: qs.stringify(params),
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
};

export default request;
