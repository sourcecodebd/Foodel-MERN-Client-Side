import React from 'react';

const NotFound = () => {
    return (
        <div className="py-5">
            <i className="fas fa-exclamation-circle fa-4x text-danger"></i>
            <h2 className="text-warning fw-bold">404</h2>
            <h5>The Page You're trying to access is not available!</h5>
        </div>
    );
};

export default NotFound;