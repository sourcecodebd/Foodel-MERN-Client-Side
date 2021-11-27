import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import ManageOrder from '../ManageOrder/ManageOrder';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LinearProgress, Stack } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ManageOrders = () => {
    // MUI Snackbar starts
    const [open, setOpen] = useState(false);
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const { firebase } = useAuth();
    const { success, setSuccess } = firebase;
    const [approved, setApproved] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://evil-coffin-47333.herokuapp.com/all-orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            })
    }, [orders, deleted, approved])

    const handleApprove = order => {
        const newOrder = {};
        newOrder.status = 'Approved';
        fetch(`https://evil-coffin-47333.herokuapp.com/manage-order/approve/${order._id}`, {
            method: 'PUT',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setSuccess('Order has been approved successfully!');
                    setOpen(true);
                    setApproved(true);
                }
                else {
                    setApproved(false);
                }
            })
    }

    const handleDeleteOrder = id => {
        fetch(`https://evil-coffin-47333.herokuapp.com/manage-order/delete/${id}`, {
            method: 'DELETE',
            headers: { "content-type": "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    setSuccess(`Customer's order has been cancelled successfully!`);
                    setOpen(true);
                    setDeleted(true);
                }
                else {
                    setDeleted(false);
                }
            })
    }

    return (
        <div>
            {
                success &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                </Snackbar>
            }
            <h5 className="fw-bold limegreen py-3">Manage Orders</h5>
            {
                orders.length === 0 ?
                    <Stack sx={{ width: '100%', color: 'grey.500', minHeight: '100vh' }} spacing={2}>
                        <LinearProgress color="secondary" />
                    </Stack>
                    :
                    <Table responsive className="overflow-auto">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Ordered Food</th>
                                <th>Status</th>
                                <th>Order Manage</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                orders.map(order => <ManageOrder order={order} key={order._id} handleApprove={handleApprove} handleDeleteOrder={handleDeleteOrder} />)
                            }

                        </tbody>
                    </Table>
            }
        </div>
    );
};

export default ManageOrders;