import { SET_POSTS } from "../constants/actionTypeConstants"

type commentType = { id: number, postId: number, body: string }
type commentsType = Array<commentType>
type postType = { id: number, title: string, body: string, comments: commentsType }

type postsType = Array<postType>

type postsStateType = {
    posts: postsType
}

const postsState = {
    posts: []
}

type actionPostsType = {
    type: typeof SET_POSTS,
    posts: postsType
}

const postsReducer = (state = postsState, action: actionPostsType): postsStateType => {
    switch (action.type) {
        case SET_POSTS: {
            return {
                ...state,
                posts: action.posts.map(p => p)
            }
        }
        default: return state
    }
}
const setPosts = (posts: postsType) => {
    return {
        type: SET_POSTS,
        posts
    }
}
export { postsReducer, setPosts }
export type { postsType, postType, commentType }