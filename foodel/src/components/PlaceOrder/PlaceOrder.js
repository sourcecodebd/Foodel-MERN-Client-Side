import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PlaceOrder = () => {
    // MUI Snackbar starts
    const [open, setOpen] = useState(false);
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const { id } = useParams();
    const { firebase } = useAuth();
    const { user, success, setSuccess } = firebase;

    const nameRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();

    const [singleFood, setSingleFood] = useState({});
    const [ordered, setOrdered] = useState([]);
    useEffect(() => {
        fetch(`https://evil-coffin-47333.herokuapp.com/deliveries/${id}`)
            .then(res => res.json())
            .then(data => setSingleFood(data));

        fetch(`https://evil-coffin-47333.herokuapp.com/my-order/${user.email}`)
            .then(res => res.json())
            .then(data => setOrdered(data));
    }, [id, user.email]);
    console.log(singleFood);
    console.log(ordered);

    const found = ordered.find(order => order.food === singleFood.food);
    console.log(found, found?.quantity);

    const handleAddToCart = e => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;
        const phone = phoneRef.current.value;
        const { food, img_url } = singleFood;
        const newOrder = { name, email, address, phone, food, payment_bill, img_url };
        newOrder.status = 'Pending';

        if (!found?.quantity) {
            newOrder.quantity = 1;
        }
        else {
            newOrder.quantity = 1;
            newOrder.quantity += found.quantity;
        }

        fetch(`https://evil-coffin-47333.herokuapp.com/add-order/${id}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > -1) {
                    setOpen(true);
                    setSuccess('Order Placed Successfully! Please be patient and wait untill approving your order');
                }
            })

    }
    const vat = parseFloat(singleFood?.price) * 0.45;
    const delivery_charge = 100;
    const payment_bill = parseFloat(singleFood?.price) + vat + delivery_charge;

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
            <h2 className="fw-bold limegreen my-3">Place Order</h2>
            <div className="container row row-cols-1 row-cols-md-2 d-flex justify-content-center mx-auto gap-5">
                <div className="p-3 col-md-5 mx-auto shadow my-3 rounded-3">
                    <p>Food Id: {id}</p>
                    <img src={singleFood?.img_url} className="img-fluid" alt={singleFood?.food} />
                    <h5 className="fw-bold"> Ordered Item:</h5>
                    <h5 className="fw-bold limegreen">{singleFood?.food}</h5>
                    <p
                    >Price: {parseFloat(singleFood?.price).toFixed(2)} taka only
                        <span> + VAT(45%): BDT. {vat}
                            + Delivery Charge: BDT. {parseFloat(delivery_charge).toFixed(2)}</span>
                    </p>
                    <p>Payment Bill: {parseFloat(payment_bill).toFixed(2)} taka only</p>
                </div>
                <div className="bg-white m-md-3 p-md-4 p-2 rounded-1">
                    <form onSubmit={handleAddToCart} className="row container d-lg-flex justify-content-center mx-auto gap-3 py-3">
                        <input type="text" ref={nameRef} defaultValue={user.displayName} className="input-auth col-md-5 me-md-2" placeholder="Name" required />
                        <input type="email" ref={emailRef} defaultValue={user.email} className="input-auth col-md-5 ms-md-2" placeholder="Email" required />
                        <input type="text" ref={addressRef} className="input-auth col-md-5 me-md-2" placeholder="Enter Address" required />
                        <input type="number" ref={phoneRef} className="input-auth col-md-5 ms-md-2" placeholder="Phone Number" required />
                        <Button type="submit" variant="contained" className="bg-limegreen"><i className="fas fa-plus me-2"></i> Continue</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;