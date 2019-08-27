import axios from 'axios';

export default axios.create({
    // baseURL: 'http://172.16.6.171/ota-price-comparison'
    // baseURL: 'http://192.168.24.77/ota-price-comparison'
    baseURL: '/ota-price-comparison'
});