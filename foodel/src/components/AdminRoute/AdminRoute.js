import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminRoute = ({ children, ...rest }) => {
    const { firebase } = useAuth();
    const { user, admin } = firebase;
    console.log(admin);

    if (!admin) {
        return (
            <div className="d-flex justify-content-center align-items-center bg-warning" style={{ minHeight: '50vh' }}>
                <div className="bg-blur p-md-3 m-md-3 rounded-3 d-flex flex-column">
                    <i className="fas fa-exclamation-triangle fa-4x mb-3"></i>
                    <h5>You do not have permission to access this particular route</h5>
                    <p>If You ever do this again you may be permanently banned from the server</p>
                </div>
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (admin && (user?.email || user?.displayName)) ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: '/home',
                            state: { from: location }
                        }}
                    >

                    </Redirect>

            }
        >

        </Route>
    );
};

export default AdminRoute;