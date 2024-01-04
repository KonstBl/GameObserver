import { AccessToken } from "@/utils/auth"
import axiosIns from "../instance"

export const UsersApi = {
    async getUserById(id: string) {
        const userData = await axiosIns.get(`/user/${id}`)
        return userData.data
    },

    async userUpdate(id: string, data: any) {
        const userData = await axiosIns.put(`/user/${id}`, data)
        return userData.data
    },

    async getAllUsers() {
        const userData = await axiosIns.get('/user')
        return userData.data
    },

    async getUserInfo() {
        const userData = await axiosIns.get('/user/profile')
        return userData.data
    }
}