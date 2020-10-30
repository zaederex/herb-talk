import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import vendorService from '../services/VendorService';

/**
 * Displays vendor information.
 * @param {Object} props 
 */
export default function VendorCard(props) {
    const { vendor, userId } = props;
    const [userRating, setUserRating] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [strainOpen, setStrainOpen] = useState(false);

    const memoAvg = useCallback(function getAvgRating() {
        let total = 0.0;
        if (vendor.ratings.length > 0) {
            vendor.ratings.forEach(rating => {
                total += rating.rating;
                if (rating.user.userId === parseInt(userId)) {
                    setUserRating(rating.rating);
                }
            });
            setAvgRating(total / vendor.ratings.length);
        }
    }, [userId, vendor.ratings]);

    useEffect(() => {
        memoAvg();
    }, [memoAvg]);

    function showStar(star) {
        return star - 1 < userRating;
    }

    function showStarAvg(star) {
        return star - 1 < avgRating;
    }

    async function rateVendor(rate) {
        setUserRating(rate);
        await vendorService.rateVendor({
            userId,
            vendorId: vendor.vendorId,
            rating: rate
        });
        getVendorRatings();
    };

    async function getVendorRatings() {
        vendor.ratings = await vendorService.getVendorRatings(vendor.vendorId);
        memoAvg();
    }

    return (
        <div className="m-1">
            <Card>
                <Card.Header bg="info" text="white">
                    <Card.Title>
                        {vendor.vendorName}
                        <span className="pull-right ml-auto badge badge-light">
                            <button className="btn btn-default" onClick={() => setStrainOpen(!strainOpen)}>
                                {!strainOpen && <i className="fa fa-sort-down"></i>}
                                {strainOpen && <i className="fa fa-sort-up"></i>}
                            </button>
                            <span>Show Strains Sold</span>
                        </span>
                    </Card.Title>
                </Card.Header>
                <Collapse in={strainOpen}>
                    <div className="container-fluid">
                        {(vendor.strainsSold.length > 0) && vendor.strainsSold.map(sold => {
                            return (
                                <span key={sold.strainId} className="m-2 badge badge-success">
                                    <Link className="white-text" to={{
                                        pathname: "StrainSoloView",
                                        state: { strain: sold },
                                    }}
                                    >
                                        <h3>{sold.name}</h3>
                                    </Link>
                                </span>
                            )
                        })}
                        {(vendor.strainsSold.length === 0) &&
                            <span>This vendor has no strains listed.</span>
                        }
                    </div>
                </Collapse>
                <Card.Body>
                    <div className="row">
                        <div className="col-2">
                            Contact: {vendor.contact}
                        </div>
                        <div className="col-3">
                            Address:
                            {` ${vendor.address.street}, ${vendor.address.city}, ${vendor.address.state}`}
                        </div>
                        <div className="col-7">
                            <h3 className="pull-left">
                                {userId &&
                                    <span className="badge badge-light pointer">
                                        Your Rating: {
                                            <>
                                                <span onClick={() => rateVendor(1)} className={`fa fa-star ${showStar(1) ? 'checked' : ''}`}></span>
                                                <span onClick={() => rateVendor(2)} className={`fa fa-star ${showStar(2) ? 'checked' : ''}`}></span>
                                                <span onClick={() => rateVendor(3)} className={`fa fa-star ${showStar(3) ? 'checked' : ''}`}></span>
                                                <span onClick={() => rateVendor(4)} className={`fa fa-star ${showStar(4) ? 'checked' : ''}`}></span>
                                                <span onClick={() => rateVendor(5)} className={`fa fa-star ${showStar(5) ? 'checked' : ''}`}></span>
                                            </>
                                        }
                                    </span>}
                            </h3>
                            <h3 className="pull-right">
                                <span className="badge badge-light">
                                    Average Rating: {
                                        <>
                                            <span className={`fa fa-star ${showStarAvg(1) ? 'checked' : ''}`}></span>
                                            <span className={`fa fa-star ${showStarAvg(2) ? 'checked' : ''}`}></span>
                                            <span className={`fa fa-star ${showStarAvg(3) ? 'checked' : ''}`}></span>
                                            <span className={`fa fa-star ${showStarAvg(4) ? 'checked' : ''}`}></span>
                                            <span className={`fa fa-star ${showStarAvg(5) ? 'checked' : ''}`}></span>
                                        </>
                                    }
                                </span>
                            </h3>
                        </div>
                    </div>
                </Card.Body>
            </Card >
        </div>
    )
}