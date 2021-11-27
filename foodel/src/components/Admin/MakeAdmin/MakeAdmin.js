import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MakeAdmin = () => {
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
    const { token, success, setSuccess, error, setError } = firebase;

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleMakeAdmin = formData => {
        const newAdmin = { ...formData }
        fetch(`https://evil-coffin-47333.herokuapp.com/users/admins/add`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newAdmin)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    return res.json();
                }
            })
            .then(data => {
                if (data.modifiedCount > -1) {
                    reset();
                    setSuccess('You have successfully Added an Admin!');
                    setError('');
                    setOpen(true);
                }
                else if (data.message) {
                    setSuccess('');
                    setError(data.message);
                    setOpen(true);
                }
            })
    }

    return (
        <div>
            <h5 className="fw-bold limegreen py-3">Make an Admin</h5>
            <div className="bg-white m-md-3 p-md-4 p-2 rounded-1">
                <form onSubmit={handleSubmit(handleMakeAdmin)} className="row container col-md-6 d-lg-flex justify-content-center mx-auto gap-3 py-3">
                    <input type="text" {...register("name", { required: true })} className="input-auth" placeholder="Enter Name" />
                    {errors.name && <span>Name field is required</span>}
                    <br />
                    <input type="text" {...register("email", { required: true })} className="input-auth" placeholder="Enter Email" />
                    {errors.email && <span>Email field is required</span>}
                    <br />
                    <Button type="submit" variant="contained" className="bg-limegreen">Continue</Button>
                </form>
                {
                    error &&
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                            {error}
                        </Alert>
                    </Snackbar>
                }
                {
                    success &&
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {success}
                        </Alert>
                    </Snackbar>
                }
            </div>
        </div>
    );
};

export default MakeAdmin;