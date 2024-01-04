import axios from "axios"

export const LoginApi={
    login(data = {}) {
        return axios.post('http://localhost:3000/auth/login', data)
    }
}