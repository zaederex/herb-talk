import { api } from '../config';

/**
 * Retrieve an array of all vendors.
 */
async function getVendors() {
    const res = await fetch(`${api}/vendor/all`);
    return res.json();
}

async function rateVendor(info) {
    const { userId, vendorId, rating } = info;
    await fetch(`${api}/vendor/rate?userId=${userId}&vendorId=${vendorId}&rating=${rating}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * Sell a strain as a given vendor.
 * @param {Integer} strainId 
 * @param {Integer} vendorId 
 */
async function sellStrain(strainId, vendorId) {
    await fetch(`${api}/vendor/sell?strainId=${strainId}&vendorId=${vendorId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * Stop selling a strain as a given vendor.
 * @param {Integer} strainId 
 * @param {Integer} vendorId 
 */
async function stopSellingStrain(strainId, vendorId) {
    await fetch(`${api}/vendor/sell?strainId=${strainId}&vendorId=${vendorId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * Get all the ratings associated with a given vendor.
 * @param {Integer} vendorId 
 */
async function getVendorRatings(vendorId) {
    const res = await fetch(`${api}/vendor/${vendorId}/ratings`);
    return res.json();
}

/**
 * Get a given vendor by id.
 * @param {Integer} vendorId 
 */
async function getVendorById(vendorId) {
    const res = await fetch(`${api}/vendor/${vendorId}`);
    return res.json();
}

export default { getVendors, rateVendor, sellStrain, stopSellingStrain, getVendorRatings, getVendorById };