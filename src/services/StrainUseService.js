import { api } from '../config';

/**
 * Log a use of a strain.
 * @param {Integer} use 
 */
async function addUse(use) {
    const res = await fetch(`${api}/use/strain/${use.strainId}?userId=${use.userId}`, {
        method: 'post',
        body: JSON.stringify(use.description),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

/**
 * Get all uses for a particular strain.
 * @param {Integer} id 
 */
async function getUses(id) {
    const res = await fetch(`${api}/use/strain/${id}`);
    return res.json();
}

export default { addUse, getUses };