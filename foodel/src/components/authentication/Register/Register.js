import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Register = () => {
    // MUI Snackbar starts
    const [open, setOpen] = useState(false);
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const dateRef = useRef('');
    const descRef = useRef('');
    const serviceRef = useRef('');
    const imageRef = useRef('');

    const { firebase } = useAuth();
    const { signUpUsingEmail, updateUserName, verifyEmail, name, email, password, getName, getEmail, getPassword, error, success, setError, setSuccess } = firebase;

    const handleRegister = (e) => {
        e.preventDefault();
        const date = dateRef.current.value;
        const description = descRef.current.value;
        const service = serviceRef.current.value;
        const image = imageRef.current.value;
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
        const randomColor = colors[Math.floor(Math.random() * 8)];
        const newUser = { name, email, password, description, date, service, image, randomColor }

        signUpUsingEmail()
            .then(result => {
                console.log(result.user.emailVerified);
                handleUpdateUserProfile();
                setTimeout(() => {
                    handleVerifyEmail();
                }, 2000)


                fetch(`https://evil-coffin-47333.herokuapp.com/register`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            e.target.reset();
                        }
                    })


                setSuccess('You have successfully registered!');
                setOpen(true);
                setError('');
                console.log('registered user: ', result);
            })
            .catch(err => {
                setError(err.code);
                setOpen(true);
                setSuccess('');
            })

        const handleUpdateUserProfile = () => {
            updateUserName();
        }

        const handleVerifyEmail = () => {
            verifyEmail()
                .then(() => {
                    setSuccess('Account verification sent to your mail address!');
                })
        }

    }


    return (
        <div className="bg-offwhite py-5">
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
            <form onSubmit={handleRegister} className="card-custom mx-auto py-3 rounded shadow">
                <h5 className="card-custom-title">Create New Account</h5>
                <input type="text" onBlur={getName} className="m-2 p-2 input-auth" placeholder="Full Name" required />
                <input type="email" onBlur={getEmail} className="m-2 p-2 input-auth" placeholder="Email" required />
                <input type="password" onBlur={getPassword} className="m-2 p-2 input-auth" placeholder="Password" required />
                <input type="date" ref={dateRef} className="m-2 p-2 input-auth" placeholder="Date" required />
                <textarea row="7" ref={descRef} className="m-2 p-2 input-auth" placeholder="Description" required />
                <input type="text" ref={serviceRef} className="m-2 p-2 input-auth" placeholder="Social Service" required />
                <input type="text" ref={imageRef} className="m-2 p-2 input-auth" placeholder="Upload Image URL" required />
                <Button type="submit" variant="contained" className="bg-primary m-2 p-2"><i className="fas fa-user-plus me-2"></i> Sign Up</Button>
            </form>

            <Link to='/login'><h6 className="py-3 fw-bold text-secondary">Already Registered? Login now</h6></Link>
        </div>
    );
};

export default Register;