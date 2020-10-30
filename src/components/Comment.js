import React from 'react'

/**
 * Displays a comment.
 * @param {*} props 
 */
export default function Comment(props) {
    const { comment } = props;

    return (
        <div className="container-fluid">
            <span className="badge badge-pill badge-info"><h6>{comment.user.userName}</h6></span>
            <i className="fa fa-chevron-right m-2"></i>
            {comment.content}
        </div>
    )
}