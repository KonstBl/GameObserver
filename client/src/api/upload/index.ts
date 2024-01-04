import axiosIns from "../instance"

export const UploadApi={
    async fileUpload(file: any) {
        const fileData = await axiosIns.post('/image/upload', file)
        return fileData.data
    },
}