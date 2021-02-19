import axios from "axios";
import { newPostType } from "../../pages/posts/new";

const createNewPostThunk = (data: newPostType) => async (dispatch: any) => {
    await axios.post(`https://simple-blog-api.crew.red/posts`, data)
}
const deletePostThunk = (id: number) => async (dispatch: any) => {
    await axios.delete(`https://simple-blog-api.crew.red/posts/${id}`)
}
const updatePostThunk = (data: newPostType, id: number) => async (dispatch: any) => {
    await axios.put(`https://simple-blog-api.crew.red/posts/${id}`, data)
}
export { createNewPostThunk, deletePostThunk, updatePostThunk }