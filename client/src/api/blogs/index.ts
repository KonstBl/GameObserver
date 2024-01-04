import axiosIns from "../instance"

export const BlogsApi={
    async getBlogs() {
        const blogData = await axiosIns.get('/blog')
        return blogData.data
    },

    async getBlog(blogId: string) {
        const blogData = await axiosIns.get(`/blog/${blogId}`)
        return blogData.data 
    },

    async createBlog(data: any) {
        const blogData = await axiosIns.post(`/blog`, data)
        return blogData.data
    },

    async searchBlogs(title: string) {
        const blogData = await axiosIns.get(`/blog/search/${title}`)
        return blogData.data 
    },

    async getUserBlogs(userId: string) {
        const blogData = await axiosIns.get(`/blog/user/${userId}`)
        return blogData.data
    },

    async deleteBlog(blogId: string | undefined) {
        const blogData = await axiosIns.delete(`/blog/${blogId}`)
        return blogData.data 
    },

    async updateBlog(blogId: string, data: any) {
        const blogData = await axiosIns.put(`/blog/${blogId}`, data)
        return blogData.data
    }
}