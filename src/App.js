import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StrainSearch from './components/StrainSearch';
import StrainSoloView from './components/StrainSoloView';
import StrainSearchDispatcher from './dispatchers/StrainSearchDispatcher';
import Login from './components/Login';
import Register from './components/Register';
import StrainSearchBar from './components/StrainSearchBar';
import VendorList from './components/VendorList';
import Analysis from './components/Analysis';
import AboutUs from './components/AboutUs';
import { withCookies } from 'react-cookie';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <StrainSearchBar {...this.props}></StrainSearchBar>
          <div>
            <Route exact path={"/login"} render={() => <Login {...this.props} />} />
            <Route exact path={"/register"} render={() => <Register {...this.props} />} />
            <Route exact path={["/home", "/"]} render={() => <StrainSearch {...this.props} />} />
            <Route exact path="/StrainSoloView" render={(props) => <StrainSoloView {...this.props} {...props} />} />
            <Route exact path="/vendors" render={() => <VendorList {...this.props} />} />
            <Route exact path="/Analysis" component={Analysis} />
            <Route exact path="/AboutUs" component={AboutUs} />
          </div>
        </Router>
      </>
    );
  }
}

export default withCookies(connect((state, ownProps) => {
  return {
    state: state.strains,
    cookies: ownProps.cookies
  }
}, StrainSearchDispatcher)(App));