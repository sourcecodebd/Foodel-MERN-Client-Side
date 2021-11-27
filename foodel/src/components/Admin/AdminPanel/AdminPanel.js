import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import swal from 'sweetalert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminPanel = () => {
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
    const { user, success, setSuccess, setError } = firebase;

    const [admins, setAdmins] = useState([]);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        fetch('https://evil-coffin-47333.herokuapp.com/users/admins')
            .then(res => res.json())
            .then(data => setAdmins(data));
    }, [deleted]);

    const safeMsg = document.createElement("div");
    safeMsg.innerHTML =
        `<div class="d-flex justify-content-center align-items-center gap-2" style="transform: translateY(30px)">
            <i class="fas fa-user-shield"></i>
            Admin Role is safe!
        </div>`;
    const handleDeletePermission = id => {
        new swal({
            title: "Are you sure?",
            text: "Once dismissed, you won't be able to recover admin role!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            // showCancelButton: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://evil-coffin-47333.herokuapp.com/users/admins/remove/${id}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount === 1) {
                                setSuccess('Admin Kicked Out successfully!');
                                setError('');
                                setOpen(true);
                                setDeleted(true)
                                /* new swal("Poof! Your imaginary file has been deleted!", {
                                    icon: "success",
                                }); */
                            }
                            else {
                                setDeleted(false);
                            }
                        })
                } else {
                    new swal({
                        content: safeMsg
                    });
                }
            });
    }

    return (
        <div>
            <h5 className="fw-bold limegreen py-3">Admin Panel</h5>
            <div className="overflow-auto">
                {
                    admins?.map((admin, i) =>
                        <div className="d-md-flex justify-content-center align-items-center mb-5">
                            <div className="shadow bg-limegreen text-white p-2 m-3 col-md-6 rounded-3 overflow-auto">
                                Admin-{i + 1}: {admin.email}
                            </div>

                            {
                                user.email === 'nafiaiubian17@gmail.com' &&
                                <div>
                                    {
                                        admin.email === 'nafiaiubian17@gmail.com' ?
                                            <Button onClick={() => handleDeletePermission(admin._id)} variant='contained' className="bg-danger">Remove Yourself</Button>
                                            :
                                            <Button onClick={() => handleDeletePermission(admin._id)} variant='contained' className="bg-danger">Remove Admin</Button>
                                    }
                                </div>
                            }
                        </div>
                    )
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

export default AdminPanel;