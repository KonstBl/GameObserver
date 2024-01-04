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

    async deleteBlog(blogId: string) {
        const blogData = await axiosIns.delete(`/blog/${blogId}`)
        return blogData.data 
    },

    async searchBlogs(title: string) {
        const blogData = await axiosIns.get(`/blog/search/${title}`)
        return blogData.data 
    }
}