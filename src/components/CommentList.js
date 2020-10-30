import React from 'react'
import Comment from './Comment';
import Collapse from 'react-bootstrap/Collapse';

/**
 * Displays a list of comments.
 * @param {Object} props 
 */
export default function CommentList(props) {
    const { open, comments } = props;

    return (
        <Collapse in={open}>
            <div className="container-fluid">
                {comments.map(comment => {
                    return (
                        <Comment key={comment.commentId} {...{ comment }} />
                    )
                })}
            </div>
        </Collapse>
    )
}