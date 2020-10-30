import { api } from '../config';

/**
 * Register the given account object as a regular user.
 * @param {Object} account 
 */
async function register(account) {
    const { userName, password, confPassword, firstName, lastName, dob, gender } = account;
    const res = await fetch(`${api}/user/register?userName=${userName}&password=${password}&confPassword=${confPassword}&firstName=${firstName}&lastName=${lastName}&dob=${dob}&gender=${gender}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        throw new Error("Unable to register");
    }
}

/**
 * Register the given account object as a vendor.
 * @param {Object} account 
 */
async function registerVendor(account) {
    const { vendorName, password, confPassword, contact, street, city, state } = account;
    const res = await fetch(`${api}/vendor/register?vendorName=${vendorName}&password=${password}&confPassword=${confPassword}&contact=${contact}&street=${street}&city=${city}&state=${state}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        throw new Error("Unable to register");
    }
}

/**
 * Attempt to login.
 * @param {Object} info 
 */
async function login(info) {
    const { userName, password } = info;
    const res = await fetch(`${api}/user/login?username=${userName}&password=${password}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',

    });
    return await res.json();
}

/**
 * Attempt to login as a vendor.
 * @param {Object} info 
 */
async function loginVendor(info) {
    const { vendorName, password } = info;
    const res = await fetch(`${api}/vendor/login?vendorName=${vendorName}&password=${password}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });
    return await res.json();
}

export default { register, login, registerVendor, loginVendor };