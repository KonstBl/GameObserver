import axiosIns from "../instance"

export const GamesApi={
    async getGames() {
        const gameData = await axiosIns.get('/game')
        return gameData.data
    },

    async getGame(gameId: string) {
        const gameData = await axiosIns.get(`/game/${gameId}`)
        return gameData.data 
    },

    async updateGame(gameId: string, data: any)  {
        const gameData = await axiosIns.put(`/game/${gameId}`, data)
        return gameData.data 
    },

    async deleteGame(gameId: string) {
        const gameData = await axiosIns.delete(`/game/${gameId}`)
        return gameData.data 
    },

    async createGame(data: any) {
        const gameData = await axiosIns.post(`/game`, data)
        return gameData.data 
    },

    async searchGames(title: string) {
        const gameData = await axiosIns.get(`/game/search/${title}`)
        return gameData.data 
    }
}

