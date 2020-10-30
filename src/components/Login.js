import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import accountService from '../services/AccountService';

/**
 * Login page.
 * @param {Object} props 
 */
export default function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [failed, setFailed] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const [userType, setUserType] = useState("user");

    async function executeSignIn() {
        if (userType === "user") {
            try {
                const user = await accountService.login({
                    userName,
                    password
                });
                if (user) {
                    props.cookies.remove('vendorId', { path: '/' });
                    props.cookies.set('userId', user.userId, { path: '/' });
                    setSuccessLogin(true);
                } else {
                    throw new Error("Unable to login");
                }
            } catch (e) {
                console.log(e);
                setFailed(true);
            }
        } else if (userType === "vendor") {
            try {
                const vendor = await accountService.loginVendor({
                    vendorName: userName,
                    password
                });
                if (vendor) {
                    props.cookies.remove('userId', { path: '/' });
                    props.cookies.set('vendorId', vendor.vendorId, { path: '/' });
                    setSuccessLogin(true);
                } else {
                    throw new Error("Unable to login");
                }
            } catch (e) {
                console.log(e);
                setFailed(true);
            }
        }
    }

    if (successLogin) {
        return <Redirect to="/home"></Redirect>
    }

    return (
        <div className="container">
            <h1>Login</h1>
            {failed &&
                <div className="alert alert-danger">
                    Failed to login.
                </div>
            }
            <form>
                <div className="form-group row">
                    <label htmlFor="usertype" className="col-sm-2 col-form-label">
                        User Type </label>
                    <div onChange={(e) => setUserType(e.target.value)} className="col-sm-10">
                        <select id="usertype" className="form-control">
                            <option value="user">User</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-2 col-form-label">
                        {userType === "user" && `UserName`}
                        {userType === "vendor" && `Vendor Name`}
                    </label>
                    <div className="col-sm-10">
                        <input value={userName} onChange={e => setUserName(e.target.value)} className="form-control" id="username" placeholder="Alice" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                        Password </label>
                    <div className="col-sm-10">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password"
                            placeholder="123qwe#$%" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button type="button" onClick={executeSignIn} className="btn btn-primary btn-block">
                            Sign in
                        </button>
                        <div className="row">
                            <div className="col-6">
                                <span>Forgot Password?</span>
                            </div>
                            <div className="col-6">
                                <Link className="float-right" to={{
                                    pathname: "/register",
                                }}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}