import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import commentService from '../services/CommentService';

/**
 * Display a post in the forum.
 * @param {Object} props 
 */
export default function ExperiencePost(props) {
    const { use, userId } = props;
    const [open, setOpen] = useState(null);
    const [commentOpen, setCommentOpen] = useState(null);
    const [comments, setComments] = useState(use.comments);

    function showStar(star) {
        return star - 1 < use.strainRating.rating;
    }

    async function fetchComments() {
        const updatedComments = await commentService.getComments(use.strainUseId);
        setComments(updatedComments);
    }

    let symptomConfirmations;
    if (use.confirmations.length) {
        symptomConfirmations =
            use.confirmations.length && use.confirmations.map(con => {
                return (
                    <span key={con.symptom.symptomId} className="mr-1 badge badge-warning">
                        {con.symptom.name}
                    </span>
                )
            })
    } else {
        symptomConfirmations = "No symptom confirmations.";
    }

    let flavorConfirmations;
    if (use.flavorConfirmations.length) {
        flavorConfirmations =
            use.flavorConfirmations.map(con => {
                return (
                    <span key={con.flavor.flavorId} className="mr-1 badge badge-info">
                        {con.flavor.name}
                    </span>
                )
            })
    } else {
        flavorConfirmations = "No flavor confirmations.";
    }

    return (
        <div className="container-fluid mt-1">
            <Card>
                <Card.Header bg="info" text="white">
                    <h3 className="pull-right">
                        {use.strainRating &&
                            <span className="badge badge-light">
                                Rating: {
                                    <>
                                        <span className={`fa fa-star ${showStar(1) ? 'checked' : ''}`}></span>
                                        <span className={`fa fa-star ${showStar(2) ? 'checked' : ''}`}></span>
                                        <span className={`fa fa-star ${showStar(3) ? 'checked' : ''}`}></span>
                                        <span className={`fa fa-star ${showStar(4) ? 'checked' : ''}`}></span>
                                        <span className={`fa fa-star ${showStar(5) ? 'checked' : ''}`}></span>
                                    </>
                                }
                            </span>}
                        {!use.strainRating &&
                            <span className="badge badge-light">
                                No rating available.
                        </span>
                        }
                    </h3>
                    <Card.Subtitle className="mb-2 text-muted">{use.user.userName}</Card.Subtitle>
                    <span className="mt-3">{use.strain.name}</span>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {use.description}
                    </Card.Text>
                    <div className="row">
                        <div className="pull-left">
                            {symptomConfirmations}
                        </div>
                    </div>
                    <div className="row">
                        <div className="pull-left">
                            {flavorConfirmations}
                        </div>
                        <span className="ml-auto badge badge-light">
                            <button disabled={!userId} className="btn btn-default" onClick={() => setCommentOpen(!commentOpen)}>
                                {!commentOpen && <i className="fa fa-sort-down"></i>}
                                {commentOpen && <i className="fa fa-sort-up"></i>}
                            </button>
                            <span>Comments</span>
                        </span>
                        <span className="badge badge-light">
                            <button disabled={!userId} className="btn btn-default" onClick={() => setOpen(!open)}>
                                {!open && <i className="fa fa-sort-down"></i>}
                                {open && <i className="fa fa-sort-up"></i>}
                            </button>
                            <span>Reply</span>
                        </span>
                    </div>
                </Card.Body>
            </Card >
            <CommentForm open={open} useId={use.strainUseId} userId={userId} fetchComments={fetchComments}>
            </CommentForm>
            <CommentList open={commentOpen} comments={comments}></CommentList>
        </div>
    )
}