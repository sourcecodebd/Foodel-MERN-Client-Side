import React from 'react';

const MyOrder = ({ ord, handleDeleteOrder }) => {

    console.log(ord);
    const { _id, food, payment_bill, status, img_url, quantity } = ord;

    return (
        <div>
            <div className="p-3 mx-auto shadow my-3 rounded-3">
                <div className="d-flex justify-content-center gap-2">
                    <p>Id:</p>
                    <p className="overflow-auto">{_id}</p>
                </div>
                <img src={img_url} className="img-fluid" alt={food} />
                <h5 className="fw-bold"> Ordered Item: {quantity}</h5>
                <h5 className="fw-bold limegreen">{food}</h5>
                <p>Payment Bill: {parseFloat(payment_bill).toFixed(2)} taka only</p>
                <span className="badge bg-warning text-dark mb-3 fs-6"><span className="text-white">Order Status:</span> {status}</span>
                <br />
                <button onClick={() => handleDeleteOrder(ord)} className="btn btn-danger">Delete</button>
            </div>

        </div>
    );
};

export default MyOrder;