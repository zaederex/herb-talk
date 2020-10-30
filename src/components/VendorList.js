import React, { useEffect, useState } from 'react';
import vendorService from '../services/VendorService';
import VendorCard from './VendorCard';

/**
 * List all vendors.
 * @param {Object} props 
 */
export default function VendorList(props) {
    const { cookies } = props;
    const [vendors, setVendors] = useState([]);
    const userId = cookies.get("userId");

    async function getVendors() {
        const vendors = await vendorService.getVendors();
        setVendors(vendors);
    }

    useEffect(() => {
        getVendors();
    }, []);

    return (
        <div className="container-fluid">
            <h2>Vendors</h2>
            {vendors.map(vendor => {
                return (
                    <VendorCard key={vendor.vendorId} {...{ vendor, userId, getVendors }}></VendorCard>
                )
            })}
        </div>
    )
}