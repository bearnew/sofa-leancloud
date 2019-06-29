import axios from 'axios';
import qs from 'qs';
const baseUrl = 'http://localhost:3000';
// const baseUrl = '9w7us8ac.leanapp.cn';

export const API = {
    getStoreInfo: 'store/get',
    updateStoreInfo: 'store/update'
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
