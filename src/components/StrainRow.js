import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';
import vendorService from '../services/VendorService';

/**
 * Single result row of strain search.
 * @param {Object} props 
 */
export default function StrainRow(props) {
    const { strain, vendorId, memoGetVendorStrainsSold, vendorStrainsSold } = props;
    const [open, setOpen] = useState(false);
    const [isSold, setIsSold] = useState(true);

    useEffect(() => {
        if (vendorId) {
            const has = vendorStrainsSold.find(s => s.strainId === strain.strainId);
            if (!has) {
                setIsSold(false);
            } else {
                setIsSold(true);
            }
        }
    }, [strain.strainId, vendorId, vendorStrainsSold])

    async function sellStrain() {
        if (isSold) {
            await vendorService.stopSellingStrain(strain.strainId, vendorId);
        } else {
            await vendorService.sellStrain(strain.strainId, vendorId);
        }
        setIsSold(!isSold);
        memoGetVendorStrainsSold();
    }

    return (
        <>
            <tr>
                <td>
                    <Link className="herb-link" to={{
                        pathname: "StrainSoloView",
                        state: { strain },
                    }}
                    >
                        {strain.name}
                    </Link>
                    <button className="btn btn-default" onClick={() => setOpen(!open)}>
                        {!open && <i className="fa fa-sort-down"></i>}
                        {open && <i className="fa fa-sort-up"></i>}
                    </button>
                </td>
                <td>
                    {strain.race.name}
                </td>
                <td>
                    {strain.strainLikes.length}
                    <span className="m-2">
                        {vendorId &&
                            <button onClick={sellStrain} className={`btn ${isSold ? "btn-danger" : "btn-success"} pull-right`}>
                                {`${isSold ? "Stop Selling" : "Sell Strain"}`}
                            </button>}
                    </span>
                </td>
            </tr>
            {open &&
                (<tr>
                    <td colSpan="3">
                        <Collapse in={open}>
                            <div>
                                {strain.description || 'No description available for this strain.'}
                            </div>
                        </Collapse>
                    </td>
                </tr>)}
        </>
    );
};