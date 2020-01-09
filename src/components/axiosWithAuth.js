import axios from 'axios'

const axiosWithAuth = () => {
    return axios.create({
        baseURL: 'https://webpt7-dad-jokes.herokuapp.com',
        headers: {
            token: localStorage.getItem('token')
        }
    })
}

export default axiosWithAuth