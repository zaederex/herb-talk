import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import commentService from '../services/CommentService';

/**
 * Used to Submit a new comment.
 * @param {Object} props 
 */
export default function CommentForm(props) {
    const { open, useId, fetchComments, userId } = props;
    const [commentContent, setCommentContent] = useState('');

    async function postComment() {
        await commentService.createComment(useId, userId, commentContent);
        fetchComments();
    }

    return (
        <Collapse in={open}>
            <form>
                <div className="input-group mb-3">
                    <input value={commentContent} onChange={e => setCommentContent(e.target.value)}
                        type="text" className="form-control" id="commentContent" placeholder="Comment" />
                    <div className="input-group-append">
                        <button onClick={postComment} type="button" className="btn btn-success btn-xs">Post</button>
                    </div>
                </div>
            </form>
        </Collapse>)
}