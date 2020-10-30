import { api } from '../config';

/**
 * Retrieve the number of likes for a given strain.
 * @param {Integer} strainId 
 */
async function getStrainLikeCount(strainId) {
    const res = await fetch(`${api}/like/strain/${strainId}`);
    return await res.json();
}

/**
 * Determine if a user has liked this strain.
 * @param {Integer} strainId 
 * @param {Integer} userId 
 */
async function isStrainLike(strainId, userId) {
    const res = await fetch(`${api}/like/strain/liked/${strainId}?userId=${userId}`);
    try {
        return await res.json();
    } catch (e) {
        return null;
    }
}

/**
 * Like the given strain as the given user.
 * @param {Integer} strainId 
 * @param {Integer} userId 
 */
async function likeStrain(strainId, userId) {
    await fetch(`${api}/like/strain/${strainId}?userId=${userId}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    });
}

/**
 * Remove a like from a strain.
 * @param {Integer} strainId 
 * @param {Integer} userId 
 */
async function unLikeStrain(strainId, userId) {
    await fetch(`${api}/like/strain/${strainId}?userId=${userId}`, {
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        }
    });
}

export default { getStrainLikeCount, likeStrain, unLikeStrain, isStrainLike };