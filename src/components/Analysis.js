import React, { useState, useEffect } from 'react'
import service from '../services/AnalysisService';

/**
 * Provide basic insights into the contents of the forum and strain usage.
 */
export default function Comment() {
    const [mostLikeUsers, setMostLikeUsers] = useState([]);
    const [mostCommentUsers, setMostCommentUsers] = useState([]);
    const [mostRatingUsers, setMostRatingUsers] = useState([]);
    const [highestLikeStrains, setHighestLikeStrains] = useState([]);
    const [highestRatingStrains, setHighestRatingStrains] = useState([]);

    useEffect(() => {
        async function fetchMostLikeUsers() {
            const users = await service.getMostUserLikes();
            setMostLikeUsers(users);
        }

        async function fetchMostCommentUsers() {
            const users = await service.getMostUserComments();
            setMostCommentUsers(users);
        }

        async function fetchMostRatingUsers() {
            const users = await service.getMostUserRatings();
            setMostRatingUsers(users);
        }

        async function fetchHighestLikeStrains() {
            const strains = await service.getHighestStrainLikes();
            setHighestLikeStrains(strains);
        }

        async function fetchHighestRatingStrains() {
            const strains = await service.getHighestStrainRatings();
            setHighestRatingStrains(strains);
        }

        fetchMostLikeUsers();
        fetchMostCommentUsers();
        fetchMostRatingUsers();
        fetchHighestLikeStrains();
        fetchHighestRatingStrains();
    }, [])

    return (
        <div className="info-page">
            <h2>
                Most Active Users
            </h2>
            <hr className="break-line" />
            <div className="row">
                <div className="col-4 center">
                    <h5 className="herb-link">Most Likes</h5>
                    <ol className="center">
                        {mostLikeUsers.map(user => {
                            return (
                                <li key={user.user.userId}>
                                    <span className="badge badge-info m-1">
                                        <h4>
                                            {user.user.userName}
                                        </h4>
                                    </span>
                                    <span className="badge badge-success m-1">
                                        <h4>
                                            {user.count}
                                        </h4>
                                    </span>
                                </li>
                            )
                        })}
                    </ol>
                </div>
                <div className="col-4">
                    <h5 className="herb-link">Most Comments</h5>
                    <ol className="center">
                        {mostCommentUsers.map(user => {
                            return (
                                <li key={user.user.userId}>
                                    <span className="badge badge-info m-1">
                                        <h4>
                                            {user.user.userName}
                                        </h4>
                                    </span>
                                    <span className="badge badge-success m-1">
                                        <h4>
                                            {user.count}
                                        </h4>
                                    </span>
                                </li>
                            )
                        })}
                    </ol>
                </div>
                <div className="col-4">
                    <h5 className="herb-link">Most Ratings</h5>
                    <ol className="center">
                        {mostRatingUsers.map(user => {
                            return (
                                <li key={user.user.userId}>
                                    <span className="badge badge-info m-1">
                                        <h4>
                                            {user.user.userName}
                                        </h4>
                                    </span>
                                    <span className="badge badge-success m-1">
                                        <h4>
                                            {user.count}
                                        </h4>
                                    </span>
                                </li>
                            )
                        })}
                    </ol>
                </div>

            </div>
            <h2>
                Top Strains
            </h2>
            <hr className="break-line" />
            <div className="row">
                <div className="col-6">
                    <h5 className="herb-link">Most Likes</h5>
                    <ol className="center">
                        {highestLikeStrains.map(strain => {
                            return (
                                <li key={strain.strain.strainId}>
                                    <span className="badge badge-info m-1">
                                        <h4>
                                            {strain.strain.name}
                                        </h4>
                                    </span>
                                    <span className="badge badge-success m-1">
                                        <h4>
                                            {strain.count}
                                        </h4>
                                    </span>
                                </li>
                            )
                        })}
                    </ol>
                </div>
                <div className="col-6">
                    <h5 className="herb-link">Highest Ratings</h5>
                    <ol className="center">
                        {highestRatingStrains.map(strain => {
                            return (
                                <li key={strain.strain.strainId}>
                                    <span className="badge badge-info m-1">
                                        <h4>
                                            {strain.strain.name}
                                        </h4>
                                    </span>
                                    <span className="badge badge-success m-1">
                                        <h4>
                                            {strain.count}
                                        </h4>
                                    </span>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}