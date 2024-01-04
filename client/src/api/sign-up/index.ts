import axios from "axios"

export const SignUpApi={
    signUp(data = {}) {
        return axios.post('http://localhost:3000/auth/sign-up', data)
    }
}