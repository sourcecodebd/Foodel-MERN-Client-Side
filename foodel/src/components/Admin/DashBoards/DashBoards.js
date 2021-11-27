import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LinearProgress, Stack } from '@mui/material';
import DashBoard from '../DashBoard/DashBoard';
import { useHistory } from 'react-router';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboards = () => {
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
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        fetch('https://evil-coffin-47333.herokuapp.com/deliveries')
            .then(res => res.json())
            .then(data => {
                setFoods(data);
            })
    }, []);

    const handleDeleteFood = id => {
        fetch(`https://evil-coffin-47333.herokuapp.com/deliveries/delete/${id}`, {
            method: 'DELETE',
            headers: { "content-type": "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    const deleted = foods.filter(food => food._id !== id);
                    setFoods(deleted);
                    setSuccess('Food Item has been removed successfully!');
                    setOpen(true);
                }
            })
    }
    let history = useHistory();
    const handleUpdateFood = id => {
        history.push(`/admin/update-food/${id}`);
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
            <h5 className="fw-bold limegreen py-3">Manage Foods</h5>
            {
                foods.length === 0 ?
                    <Stack sx={{ width: '100%', color: 'grey.500', minHeight: '100vh' }} spacing={2}>
                        <LinearProgress color="secondary" />
                    </Stack>
                    :
                    <Table responsive className="overflow-auto">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Food</th>
                                <th>Tag</th>
                                <th>Foods Manage</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                foods.map(order => <DashBoard order={order} key={order._id}
                                    handleUpdateFood={handleUpdateFood}
                                    handleDeleteFood={handleDeleteFood} />)
                            }

                        </tbody>
                    </Table>
            }
        </div>
    );
};

export default Dashboards;