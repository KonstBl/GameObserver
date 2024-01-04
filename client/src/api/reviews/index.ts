import axiosIns from "../instance"

export const ReviewsApi={
    async createReview(data: any) {
        const reviewData = await axiosIns.post('/review', data)
        return reviewData.data
    },

    async getGameReviews(gameId: string) {
        const reviewData = await axiosIns.get(`/review/game/${gameId}`)
        return reviewData.data
    },

    async deleteReview(reviewId: string | undefined) {
        const reviewData = await axiosIns.delete(`/review/${reviewId}`)
        return reviewData.data
    },
}