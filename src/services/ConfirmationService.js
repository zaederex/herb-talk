import { api } from '../config';

/**
 * Retrieve all confirmations for symptoms of this strain.
 * @param {Integer} strainId 
 */
async function getStrainConfirmations(strainId) {
    const res = await fetch(`${api}/confirmation/${strainId}`);
    return await res.json();
}

/**
 * Retrieve all confirmations for flavors of this strain.
 * @param {Integer} strainId 
 */
async function getFlavorConfirmations(strainId) {
    const res = await fetch(`${api}/confirmation/flavors/${strainId}`);
    return await res.json();
}

/**
 * Add a symptom confirmation.
 * @param {Integer} strainId 
 * @param {Array<Integer>} symptoms 
 * @param {Integer} strainUseId 
 * @param {Boolean} conf 
 */
async function postSymptomConfirmations(strainId, symptoms, strainUseId, conf) {
    for (let i = 0; i < symptoms.length; i++) {
        await fetch(`${api}/confirmation/${strainId}?symptomId=${symptoms[i]}&userId=${2}&strainUseId=${strainUseId}&conf=${conf}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            }
        });
    };
}

/**
 * Add a flavor confirmation.
 * @param {Integer} strainId 
 * @param {Array<Integer>} flavors 
 * @param {Integer} strainUseId 
 * @param {Boolean} conf 
 */
async function postFlavorConfirmations(strainId, flavors, strainUseId, conf) {
    for (let i = 0; i < flavors.length; i++) {
        await fetch(`${api}/confirmation/flavor/${strainId}?flavorId=${flavors[i]}&userId=${2}&strainUseId=${strainUseId}&conf=${conf}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            }
        });
    };
}

export default { getStrainConfirmations, getFlavorConfirmations, postSymptomConfirmations, postFlavorConfirmations };