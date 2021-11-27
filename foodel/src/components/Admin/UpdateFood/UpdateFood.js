import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateFood = () => {
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
    const { error, success, setError, setSuccess } = firebase;

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { id } = useParams();
    const [delivery, setDelivery] = useState([]);

    useEffect(() => {
        fetch(`https://evil-coffin-47333.herokuapp.com/deliveries/${id}`)
            .then(res => res.json())
            .then(data => setDelivery(data))
    }, [id]);

    const handleUpdateFood = (updateFood) => {
        console.log(updateFood);

        fetch(`https://evil-coffin-47333.herokuapp.com/update-food/${id}`, {
            method: 'PUT',
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(updateFood)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    reset();
                    setSuccess('Food updated successfully!');
                    setError('');
                    setOpen(true);
                }
            })
            .catch(console.dir);
    }


    return (
        <div>
            <h5 className="fw-bold limegreen py-3">Update Food Item For Delivery</h5>
            <div className="bg-offwhite p-2">
                {
                    success &&
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {success}
                        </Alert>
                    </Snackbar>
                }
                {
                    error &&
                    <div style={{ transform: 'translateY(-30px)' }}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                {error}
                            </Alert>
                        </Snackbar>
                    </div>
                }
                <div className="bg-white m-md-3 p-md-4 p-2 rounded-1">
                    <form onSubmit={handleSubmit(handleUpdateFood)} className="row container d-lg-flex justify-content-center mx-auto gap-3 py-3">
                        <input type="text" defaultValue={delivery.food} {...register("food", { required: true })} className="input-auth" placeholder="Food name" />
                        {errors.food && <span>Food field is required</span>}
                        <br />
                        <input type="date" defaultValue={delivery.date} {...register("date", { required: true })} className="input-auth" />
                        {errors.date && <span className="red">Date field is required</span>}
                        <br />
                        <textarea row="7" defaultValue={delivery.description} {...register("description", { required: true })} className="input-auth" placeholder="Description" />
                        {errors.description && <span>Description field is required</span>}
                        <br />
                        <input type="number" defaultValue={delivery.price} {...register("price", { required: true })} className="input-auth" />
                        {errors.price && <span>Price field is required</span>}
                        <br />
                        <input type="text" defaultValue={delivery.img_url} {...register("img_url", { required: true })} className="input-auth" placeholder="Image URL" />
                        {errors.img_url && <span>Image URL field is required</span>}
                        <br />
                        <input type="text" defaultValue={delivery.tag} {...register("tag", { required: true })} className="input-auth" placeholder="Tag" />
                        {errors.tag && <span>Tag field is required</span>}
                        <Button type="submit" variant="contained" className="bg-limegreen">Update Food</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateFood;