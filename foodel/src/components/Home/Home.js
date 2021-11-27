import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import Banner from './Banner/Banner';
import Foods from './Foods/Foods';
import useAuth from '../../hooks/useAuth';
import AboutUs from '../AboutUs/AboutUs';
import Advertise from '../Advertise/Advertise';
import LocationMap from '../LocationMap/LocationMap';
import DeliveryWorkers from '../DeliveryWorkers/DeliveryWorkers';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
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
    const { success, open, setOpen } = firebase;

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
            <Banner />
            <Advertise />
            <Foods />
            <DeliveryWorkers />
            <AboutUs />
            <LocationMap />
        </div>
    );
};

export default Home;