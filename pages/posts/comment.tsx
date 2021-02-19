import React from 'react'
import { commentType } from '../../src/redux/postsReducer'

type propsType = {
    comment: commentType
}

const Comment = (props: propsType) => {
    return (
        <div>
            {props.comment.body}
        </div>
    )
}
export { Comment }