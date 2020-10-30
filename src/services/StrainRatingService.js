import { api } from '../config';

/**
 * Find the average rating of a strain.
 * @param {Integer} strainId 
 */
async function avgStrainRating(strainId) {
    const res = await fetch(`${api}/rating/strain/${strainId}`);
    try {
        return await res.json();
    } catch (e) {
        return null;
    }
}

/**
 * Add a rating for a strain.
 * @param {Integer} rating - rating in range 1-5
 */
async function addRating(rating) {
    await fetch(`${api}/rating/strain/${rating.strainId}?userId=${rating.userId}&strainUseId=${rating.strainUseId}`, {
        method: 'post',
        body: JSON.stringify(rating.rating),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

/**
 * Get the rating from a particular strain use ("post").
 * @param {*} strainUseId 
 */
async function getRatingOfUse(strainUseId) {
    const res = await fetch(`${api}/rating/use/${strainUseId}`);
    try {
        return await res.json();
    } catch (e) {
        return null;
    }
}

export default { avgStrainRating, addRating, getRatingOfUse };