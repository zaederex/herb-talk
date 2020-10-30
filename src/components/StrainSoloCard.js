import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ratingService from '../services/StrainRatingService';
import likeService from '../services/StrainLikeService';
import confirmationService from '../services/ConfirmationService';

/**
 * Detail-view of a singular strain.
 * @param {Object} props 
 */
export default function StrainSoloCard(props) {
    const { strain, experienceFormOpen, setExperienceFormOpen, userId } = props;
    const [likeCount, setLikeCount] = useState(strain.strainLikes.length);
    const [alreadyLike, setAlreadyLiked] = useState(true);
    const [rating, setRating] = useState(null);
    const [symptomConfirmations, setSymptomConfirmations] = useState([]);
    const [flavorConfirmations, setFlavorConfirmations] = useState([]);

    function getConfirmationCount(symptomId) {
        const validConfs = symptomConfirmations.filter(conf => conf.symptom.symptomId === symptomId);
        return validConfs.length;
    }

    function getFlavorConfirmationCount(flavorId) {
        const validConfs = flavorConfirmations.filter(conf => conf.flavor.flavorId === flavorId);
        return validConfs.length;
    }

    const memoFindIfLiked = useCallback(async function findOutIfLiked(strain) {
        if (userId) {
            const isLike = await likeService.isStrainLike(strain.strainId, userId);
            setAlreadyLiked(isLike);
        }
    }, [userId]);

    useEffect(() => {
        async function getRating(strainId) {
            const avg = await ratingService.avgStrainRating(strainId);
            setRating(avg);
        }
        getRating(strain.strainId);
        getStrainConfirmations(strain.strainId);
        getFlavorConfirmations(strain.strainId);
        memoFindIfLiked(strain);
        fetchLikes(strain.strainId);
    }, [memoFindIfLiked, strain, strain.strainId]);

    async function fetchLikes(strainId) {
        const likeCount = await likeService.getStrainLikeCount(strainId);
        setLikeCount(likeCount);
    }

    async function getStrainConfirmations(strainId) {
        const confs = await confirmationService.getStrainConfirmations(strainId);
        setSymptomConfirmations(confs);
    }

    async function getFlavorConfirmations(strainId) {
        const confs = await confirmationService.getFlavorConfirmations(strainId);
        setFlavorConfirmations(confs);
    }

    async function likeStrain(strainId) {
        if (alreadyLike) {
            await likeService.unLikeStrain(strainId, userId);
        } else {
            await likeService.likeStrain(strainId, userId);
        }
        setAlreadyLiked(!alreadyLike);
        fetchLikes(strainId);
    }

    function showStar(star) {
        return star - 1 < rating;
    }

    return (
        <Card className="bg-dark text-white">
            <Card.Body>
                <Card.Title>{strain.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{strain.race.name}</Card.Subtitle>
                <Card.Text>
                    {strain.description}
                </Card.Text>
                <div className="row">
                    <div className="pull-left">
                        <h3>
                            {rating &&
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
                            {!rating &&
                                <span className="badge badge-light">
                                    No rating available.
                                </span>
                            }
                        </h3>
                    </div>
                    <div className="ml-auto mr-1">
                        <button disabled={!userId} onClick={() => likeStrain(strain.strainId)} className={`btn ${alreadyLike ? "btn-success" : "btn-light"}`}>
                            <span className="mr-1">Like</span>
                            {<span className="fa fa-thumbs-up mr-1"></span>}
                            {likeCount}
                        </button>
                    </div>
                </div>
                <div className="row">
                    Confirmations
                </div>
                <div className="row mb-1">
                    <div className="pull-left">
                        <span className="mr-1 badge badge-light">
                            Symptoms:
                <span className="badge badge-dark">{strain.symptoms.length}</span>
                        </span>
                        {strain.symptoms.map(symptom => {
                            return (
                                <span key={symptom.symptomId} className="mr-1 badge badge-warning">
                                    {symptom.name}
                                    <span className="badge badge-dark m-1">{getConfirmationCount(symptom.symptomId)}</span>
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className="row">
                    <div className="pull-left">
                        <span className="mr-1 badge badge-light">
                            Flavors:
                <span className="badge badge-dark">{strain.flavors.length}</span>
                        </span>
                        {strain.flavors.map(flavor => {
                            return (
                                <span key={flavor.flavorId} className="mr-1 badge badge-info">
                                    {flavor.name}
                                    <span className="badge badge-dark m-1">{getFlavorConfirmationCount(flavor.flavorId)}</span>
                                </span>
                            )
                        })}
                    </div>
                </div>
                <Link className="pull-left herb-link" to={{
                    pathname: "/home",
                }}
                >
                    Return to Search
                </Link>
                <span hidden={!userId} onClick={() => setExperienceFormOpen(!experienceFormOpen)} className="pointer pull-right herb-link">
                    <span className="mr-1">Add Experience</span>
                    {!experienceFormOpen && <i className="fa fa-sort-down"></i>}
                    {experienceFormOpen && <i className="fa fa-sort-up"></i>}
                </span>
            </Card.Body>
        </Card>
    )
}