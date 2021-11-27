import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    // MUI Snackbar starts
    // const [open, setOpen] = useState(false);
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends


    const { firebase } = useAuth();
    const { setUser, signInUsingGoogle, signInUsingEmail, getEmail, getPassword, resetUserPassword, success, error, setSuccess, setError, setIsLoading, open, setOpen } = firebase;

    let location = useLocation();
    const redirect_uri = location.state?.from || '/home';

    let history = useHistory()

    const handleGoogleLogin = () => {
        setIsLoading(true);
        signInUsingGoogle()
            .then(result => {
                setUser(result.user);
                setSuccess('You have been logged in Successfully!');
                setError('');
                setOpen(true);
                setTimeout(() => {
                    history.push(redirect_uri);
                })
            })
            .catch(err => {
                setError(err.code);
                setSuccess('');
                setOpen(true);
            })
            .finally(() => setIsLoading(false));
    }

    const handleEmailLogin = e => {
        e.preventDefault();
        setIsLoading(true);
        signInUsingEmail()
            .then(result => {
                console.log(result.user.emailVerified);
                if (result.user.emailVerified) {
                    setUser(result.user);
                    setSuccess('You have been logged in Successfully!');
                    setError('');
                    setOpen(true);
                    setTimeout(() => {
                        history.push(redirect_uri);
                    })
                }
                else {
                    setError('You must verify your email to get access to your account!');
                    setSuccess('');
                    setOpen(true);
                }
            })
            .catch(err => {
                setError(err.code);
                setSuccess('');
                setOpen(true);
            })
            .finally(() => setIsLoading(false));
    }

    const handleResetPassword = () => {
        resetUserPassword();
    }

    return (
        <div>
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
                <form onSubmit={handleEmailLogin} className="card-custom mx-auto py-3 rounded shadow">
                    <h5 className="card-custom-title">User Login</h5>
                    <input type="email" onBlur={getEmail} className="m-2 p-2 input-auth" placeholder="Email" required />
                    <input type="password" onBlur={getPassword} className="m-2 p-2 input-auth" placeholder="Password" required />
                    <Button type="submit" variant="contained" className="bg-primary m-2 p-2"><i className="fas fa-sign-in-alt me-2"></i> Sign In</Button>
                </form>
                <br />
                <div onClick={handleGoogleLogin} className="rounded-custom bg-danger text-white shadow m-2 p-2 mx-auto"><i className="fab fa-google fa-2x"></i></div>
                <Button onClick={handleResetPassword} variant="contained" className="bg-warning m-3"><i className="fas fa-lock-open me-2"></i> Forget Password? Reset Now</Button>
                <Link to='/register'><h6 className="py-2 fw-bold text-secondary">New User? Create New Account</h6></Link>
            </div>
        </div>
    );
};

export default Login;