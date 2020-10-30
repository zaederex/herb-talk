import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import accountService from '../services/AccountService';

/**
 * Sign-up page.
 * @param {Object} props 
 */
export default function Register(props) {
    const [successRegister, setSuccessRegister] = useState(false);
    const [alert, setAlert] = useState(false);
    const [userType, setUserType] = useState("user");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("MALE");
    const [contact, setContact] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    async function executeRegistration() {
        if (userType === "user") {
            try {
                const user = await accountService.register({
                    userType,
                    userName,
                    password,
                    confPassword,
                    firstName,
                    lastName,
                    dob,
                    gender
                });
                props.cookies.remove('vendorId', { path: '/' });
                props.cookies.set('userId', user.userId, { path: '/' });
                setSuccessRegister(true);
            } catch (e) {
                console.log(e);
                setAlert(true);
            }
        } else if (userType === "vendor") {
            try {
                const vendor = await accountService.registerVendor({
                    vendorName: userName,
                    password,
                    confPassword,
                    contact,
                    street,
                    city,
                    state
                });
                props.cookies.remove('userId', { path: '/' });
                props.cookies.set('vendorId', vendor.vendorId, { path: '/' });
                setSuccessRegister(true);
            } catch (e) {
                console.log(e);
                setAlert(true);
            }
        }
    }

    if (successRegister) {
        return <Redirect to="/home"></Redirect>
    }

    return (
        <div className="container">
            {alert &&
                <div className="alert alert-danger">
                    Failed to register.
                </div>
            }
            <h1>Register</h1>
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
                {userType === "user" &&
                    <>
                        <div className="form-group row">
                            <label
                                htmlFor="username" className="col-sm-2 col-form-label">
                                Username </label>
                            <div className="col-sm-10">
                                <input value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="username" placeholder="whiterabbit" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="password" className="col-sm-2 col-form-label">
                                Password </label>
                            <div className="col-sm-10">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password"
                                    placeholder="123qwe#$%" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="verify-password" className="col-sm-2 col-form-label">
                                Verify Password </label>
                            <div className="col-sm-10">
                                <input value={confPassword} onChange={(e) => setConfPassword(e.target.value)} type="password" className="form-control" id="verify-password"
                                    placeholder="123qwe#$%" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="firstname" className="col-sm-2 col-form-label">
                                First Name </label>
                            <div className="col-sm-10">
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" id="firstname" placeholder="Alice" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="lastname" className="col-sm-2 col-form-label">
                                Last Name </label>
                            <div className="col-sm-10">
                                <input value={lastName} onChange={e => setLastName(e.target.value)} className="form-control" id="lastname" placeholder="Wonderland" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="dob" className="col-sm-2 col-form-label">
                                Date of Birth </label>
                            <div className="col-sm-10">
                                <input value={dob} onChange={e => setDob(e.target.value)} type="date" className="form-control" id="dob"
                                    placeholder="1999-12-12" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="gender" className="col-sm-2 col-form-label">
                                Gender </label>
                            <div className="col-sm-10">
                                <select value={gender} onChange={e => setGender(e.target.value)} id="gender" className="form-control">
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="UNSPECIFIED">Prefer not to specify</option>
                                </select>
                            </div>
                        </div>
                    </>
                }
                {userType === "vendor" &&
                    <>
                        <div className="form-group row">
                            <label htmlFor="vendorname" className="col-sm-2 col-form-label">
                                Vendor Name </label>
                            <div className="col-sm-10">
                                <input value={userName} onChange={e => setUserName(e.target.value)} className="form-control" id="vendorname" placeholder="Vendor Name" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="vendorpassword" className="col-sm-2 col-form-label">
                                Password </label>
                            <div className="col-sm-10">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="vendorpassword"
                                    placeholder="123qwe#$%" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label
                                htmlFor="verify-vendorpassword" className="col-sm-2 col-form-label">
                                Verify Password </label>
                            <div className="col-sm-10">
                                <input value={confPassword} onChange={(e) => setConfPassword(e.target.value)} type="password" className="form-control" id="verify-vendorpassword"
                                    placeholder="123qwe#$%" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="vendorcontact" className="col-sm-2 col-form-label">
                                Contact </label>
                            <div className="col-sm-10">
                                <input value={contact} onChange={e => setContact(e.target.value)} className="form-control" type="email" id="vendorcontact" placeholder="vendor@yahoo.com" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                                Address </label>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="vendorstreet" className="col-sm-2 col-form-label">
                                Street </label>
                            <div className="col-sm-10">
                                <input value={street} onChange={e => setStreet(e.target.value)} className="form-control" id="vendorstreet" placeholder="1 Main St" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="vendorcity" className="col-sm-2 col-form-label">
                                City </label>
                            <div className="col-sm-10">
                                <input value={city} onChange={e => setCity(e.target.value)} className="form-control" id="vendorcity" placeholder="Boston" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="vendorstate" className="col-sm-2 col-form-label">
                                State </label>
                            <div className="col-sm-10">
                                <input value={state} onChange={e => setState(e.target.value)} className="form-control" id="vendorstate" placeholder="MA" />
                            </div>
                        </div>
                    </>
                }
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button className="btn btn-success btn-block" type="button" onClick={executeRegistration}>
                            Register
                        </button>
                        <div className="row">
                            <div className="col-6">
                                <Link to={{
                                    pathname: "/login",
                                }}
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}