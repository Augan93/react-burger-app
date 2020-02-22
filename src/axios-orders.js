import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-b98be.firebaseio.com/'
});

export default instance;
