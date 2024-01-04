import axiosIns from "../instance"


export const UsersApi = {
    async getUsers() {
        const userData = await axiosIns.get('/user')
        return userData.data
    },

    async getUserById(id: string) {
        const userData = await axiosIns.get(`/user/${id}`)
        return userData.data
    },

    async deleteUser(id: string) {
        const userData = await axiosIns.delete(`/user/${id}`)
        return userData.data
    },

    async searchUsers(userName: string) {
        const userData = await axiosIns.get(`/user/search/${userName}`)
        return userData.data 
    }
}