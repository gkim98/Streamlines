/*
    private route that can only be accessed if authenticated
*/

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// ...rest allows you to destructure remaining props
export const PrivateRoute = ({ 
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to='/'/>
        )
    )} />
);

const mapStateToProps = (state) => ({
    // converts null into false
    // or value into true
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);