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

    async searchGames(title: string) {
        const gameData = await axiosIns.get(`/game/search/${title}`)
        return gameData.data 
    },

    async sortByGenre(genre: string) {
        const gameData = await axiosIns.get(`/game/sort/${genre}`)
        return gameData.data
    },

    async sortByRatingUp() {
        const gameData = await axiosIns.get('/game/ratingUp')
        return gameData.data
    },

    async sortByRatingDown() {
        const gameData = await axiosIns.get('/game/ratingDown')
        return gameData.data
    }
}