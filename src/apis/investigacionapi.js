import axios from 'axios'


const journalApi = axios.create({
    baseURL: 'https://luna-covid-efwqev.firebaseio.com'
})


export default journalApi