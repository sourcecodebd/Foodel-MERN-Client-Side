import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PrivateRoute = ({ children, ...rest }) => {
    const { firebase } = useAuth();
    const { user, isLoading } = firebase;

    if (isLoading) {
        return (
            <Skeleton count={5} />
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (user?.email || user?.displayName) ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    >

                    </Redirect>

            }
        >

        </Route>
    );
};

export default PrivateRoute;