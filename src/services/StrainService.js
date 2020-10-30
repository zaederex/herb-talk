import { api } from '../config';

/**
 * Retrieve an array of strains with the given name.
 * @param {String} name 
 */
async function searchStrainName(name) {
    const res = await fetch(`${api}/strain?name=${name}`);
    return await res.json();
}

/**
 * Retrieve a strain object associated with the given id.
 * @param {Integer} strainId 
 */
async function getStrainById(strainId) {
    const res = await fetch(`${api}/strain/${strainId}`);
    return await res.json();
}

export default { searchStrainName, getStrainById };