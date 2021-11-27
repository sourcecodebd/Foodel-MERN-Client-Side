import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import MyOrder from '../MyOrder/MyOrder';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyOrders = () => {
    // MUI Snackbar starts
    const [open, setOpen] = useState(false);
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const [order, setOrder] = useState([]);
    const { firebase } = useAuth();
    const { email } = firebase.user;
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        fetch(`https://evil-coffin-47333.herokuapp.com/my-order/${email}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
            })
    }, [order, email, deleted])
    console.log(order);

    let total = 0;
    for (let tot of order) {
        total += parseFloat(tot.payment_bill);
    }

    const handleDeleteOrder = orderData => {
        console.log(orderData);
        if (orderData.status !== 'Approved') {
            const proceed = window.confirm('Are you sure you want to delete this order?');
            if (proceed) {
                fetch(`https://evil-coffin-47333.herokuapp.com/my-order/delete/${orderData._id}`, {
                    method: 'DELETE',
                    headers: { "content-type": "application/json" }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount === 1) {
                            setSuccess('Your order has been cancelled successfully!');
                            setOpen(true);
                            setDeleted(true);
                            setError('');
                        }
                        else {
                            setDeleted(false);
                        }
                    })
            }
        }
        else {
            setError('Approved Order cannot be cancelled!');
            setSuccess('');
            setOpen(true);
        }
    }

    return (
        <div style={{ minHeight: '80vh' }}>
            {
                error &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
            {
                success &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                </Snackbar>
            }
            <h2 className="fw-bold my-3 limegreen">My Order</h2>
            <h5><span className="fw-bold">Grand Total Bill:</span> BDT. {parseFloat(total).toFixed(1)}</h5>
            <div className="container row row-cols-1 row-cols-md-2 row-cols-lg-3 d-flex justify-content-center align-items-center gap-2 mx-auto">

                {
                    order?.map(ord => <MyOrder ord={ord} key={ord._id} handleDeleteOrder={handleDeleteOrder} />)
                }
            </div>

        </div>
    );
};

export default MyOrders;