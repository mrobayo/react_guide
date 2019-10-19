import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://awesome-2fba0.firebaseio.com/'
});

export default instance;