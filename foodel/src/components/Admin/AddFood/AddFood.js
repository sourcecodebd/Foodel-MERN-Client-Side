import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddFood = () => {
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

    const foodRef = useRef();
    const dateRef = useRef('');
    const descRef = useRef('');
    const priceRef = useRef('');
    const imgRef = useRef('');
    const tagRef = useRef('');
    const ratingRef = useRef('');
    const ratingCountRef = useRef('');

    const handleAddFood = e => {
        const food = foodRef.current.value;
        const date = dateRef.current.value;
        const description = descRef.current.value;
        const img_url = imgRef.current.value;
        const price = priceRef.current.value;
        const tag = tagRef.current.value;
        const rating = ratingRef.current.value;
        const rating_count = ratingCountRef.current.value;
        const colors = [
            'red',
            'limegreen',
            'darkblue',
            'green',
            'rgb(44, 100, 255)',
            'grey',
            'rgb(223, 132, 13)',
            'rgb(173, 3, 173)'
        ]
        const random_color = colors[Math.floor(Math.random() * 8)];
        const newFood = { food, date, description, price, img_url, tag, random_color, rating, rating_count };
        fetch(`https://evil-coffin-47333.herokuapp.com/add-food`, {
            method: 'POST',
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(newFood)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    e.target.reset();
                    setSuccess('Food added successfully!');
                    setError('');
                    setOpen(true);
                }
            })
        e.preventDefault();
    }


    return (
        <div>
            <h5 className="fw-bold limegreen py-3">Add Food Item For Delivery</h5>
            <div className="p-2">
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
                    <form onSubmit={handleAddFood} className="row container d-lg-flex justify-content-center mx-auto gap-3 py-3">
                        <input type="text" ref={foodRef} className="input-auth col-md-5 me-md-2" placeholder="Food name" required />
                        <input type="date" ref={dateRef} className="input-auth col-md-5 ms-md-2" required />
                        <input type="text" ref={descRef} className="input-auth col-md-5 ms-md-2" placeholder="description" required />
                        <input type="number" ref={priceRef} className="input-auth col-md-5 ms-md-2" placeholder="Price" required />
                        <input type="text" ref={imgRef} className="input-auth col-md-5 ms-md-2" placeholder="Image URL" required />
                        <input type="text" ref={tagRef} className="input-auth col-md-5 ms-md-2" placeholder="Tag" required />
                        <input type="number" ref={ratingCountRef} className="input-auth col-md-5 ms-md-2" placeholder="Rating Count" required />
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <label className="ms-md-2 font-med text-secondary" htmlFor="customRange1">Set Rating: </label>
                            <input type="range" min="0" max="5" step="1" defaultValue={1} ref={ratingRef} id="customRange1" className="custom-range input-auth col-md-5 ms-md-2" required />
                        </div>
                        <Button type="submit" variant="contained" className="bg-limegreen"><i className="fas fa-plus me-2"></i> Add Food</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;