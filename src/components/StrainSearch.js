import React, { useState, useEffect, useCallback } from 'react';
import StrainList from './StrainList';
import Alert from 'react-bootstrap/Alert';
import vendorService from '../services/VendorService';

/**
 * Manage strain search results;
 * @param {Object} props 
 */
export default function StrainSearch(props) {
    const { strainList } = props.state;
    const vendorId = props.cookies.get("vendorId");
    const userId = props.cookies.get("userId");
    const [vendorStrainsSold, setVendorStrainsSold] = useState([]);

    const memoGetVendorStrainsSold = useCallback(async function getVendorStrainsSold() {
        if (vendorId) {
            const vendor = await vendorService.getVendorById(vendorId);
            const vendorStrains = vendor.strainsSold;
            setVendorStrainsSold(vendorStrains);
        }
    }, [vendorId]);

    useEffect(() => {
        memoGetVendorStrainsSold();

    }, [memoGetVendorStrainsSold]);

    return (
        <div>
            {(!userId && !vendorId) &&
                <Alert variant="info">
                    Login for full features.
                </Alert>
            }
            <StrainList {...{ strainList, vendorId, vendorStrainsSold, memoGetVendorStrainsSold }} />
        </div>
    )
}