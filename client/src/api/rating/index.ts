import axiosIns from "../instance"

export const RatingApi={
    async rateGame(data = {}) {
        const ratingData = await axiosIns.post('/rating', data)
        return ratingData.data
    },

    async getRating() {
        const ratingData = await axiosIns.get('/rating')
        return ratingData.data
    },

    async getGameRating(gameId: string) {
        const ratingData = await axiosIns.get(`/rating/${gameId}`)
        return ratingData.data.result
    },

    async isUserRatedAGame(gameId: string) {
        const response = await axiosIns.get(`/rating/game/${gameId}`)
        return response.data.result
    }
}