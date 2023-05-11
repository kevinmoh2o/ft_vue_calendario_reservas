import axios from 'axios'


const investigacionApi = axios.create({
    baseURL: 'https://luna-covid-efwqev.firebaseio.com'
})

export default investigacionApi