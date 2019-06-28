import axios from 'axios';
const baseUrl = 'localhost:3000';
// const baseUrl = '9w7us8ac.leanapp.cn';

export const API= {
    getStoreInfo: 'store/get',
    updateStoreInfo: 'store/update'
};

const request = (url, method, params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${baseUrl}/${url}`,
            method,
            data: params
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    });
};

export default request;
