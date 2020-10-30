import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import service from '../services/StrainService';

/**
 * Application Nav-bar.
 * @param {Object} props 
 */
export default function StrainSearchBar(props) {
    const { strainSearchName } = props.state;
    const { searchStrainName, setStrainList, cookies } = props;
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(strainSearchName);
    const userId = cookies.get("userId");
    const vendorId = cookies.get("vendorId");

    async function search(name) {
        setLoading(true);
        searchStrainName(name);
        const strains = await service.searchStrainName(name);
        setStrainList(strains);
        setLoading(false);
    }

    function searchSubmit(name, evt) {
        evt.preventDefault();
        search(name);
    }

    function logText() {
        return vendorId || userId ? "Logout" : "Login";
    }

    function logClick() {
        props.cookies.remove('userId', { path: '/' });
        props.cookies.remove('vendorId', { path: '/' });
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>Herb Talk</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link href="home">Home</Nav.Link>
                    <Nav.Link href="login" onClick={logClick}>{logText()}</Nav.Link>
                    <NavDropdown title="Directory">
                        <NavDropdown.Item href="AboutUs">About Us</NavDropdown.Item>
                        <NavDropdown.Item href="vendors">Vendors</NavDropdown.Item>
                        <NavDropdown.Item href="Analysis">Analysis</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form onSubmit={(evt) => searchSubmit(name, evt)} inline>
                    {loading && <i className="fa fa-spinner fa-pulse fa-spin fa-2x fa-fw"></i>}
                    <FormControl onChange={(e) => setName(e.target.value)} value={name}
                        type="text" placeholder="Enter Strain" className="mr-sm-2" />
                    <Link onClick={() => search(name)} className={`${!name ? "disabled-link disabled" : ""} btn btn-success`} to={{
                        pathname: "/home",
                    }}
                    >
                        Search
                    </Link>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

