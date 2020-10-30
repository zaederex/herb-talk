import { api } from '../config';

/**
 * Retrieve the users with the most comments.
 */
async function getMostUserComments() {
    const res = await fetch(`${api}/analysis/usercomments`);
    return await res.json();
}

/**
 * Retrieve the users who have given the most likes.
 */
async function getMostUserLikes() {
    const res = await fetch(`${api}/analysis/userlikes`);
    return await res.json();
}

/**
 * Retrieve the users who have given the most ratings.
 */
async function getMostUserRatings() {
    const res = await fetch(`${api}/analysis/userratings`);
    return await res.json();
}

/**
 * Retrieve the strains with the highest received like count.
 */
async function getHighestStrainLikes() {
    const res = await fetch(`${api}/analysis/strainlikes`);
    return await res.json();
}

/**
 * Retrieve the strains with the highest average ratings.
 */
async function getHighestStrainRatings() {
    const res = await fetch(`${api}/analysis/strainratings`);
    return await res.json();
}

export default { getMostUserLikes, getMostUserRatings, getMostUserComments, getHighestStrainRatings, getHighestStrainLikes };