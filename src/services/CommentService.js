import { api } from '../config';

/**
 * Get all comments associated with the given strain use ("post").
 * @param {*} strainUseId 
 */
async function getComments(strainUseId) {
    const res = await fetch(`${api}/comment/use/${strainUseId}`);
    return res.json();
}

/**
 * Create a comment.
 * @param {Integer} strainUseId - post that comment is regarding
 * @param {Integer} userId - user creating comment
 * @param {String} content - comment content
 */
async function createComment(strainUseId, userId, content) {
    await fetch(`${api}/comment/${strainUseId}?userId=${userId}`, {
        method: 'post',
        body: JSON.stringify(content),
        headers: {
            'content-type': 'application/json'
        }
    });
}

export default { getComments, createComment }