import { Button } from '@mui/material';
import React from 'react';

const ManageOrder = ({ order, handleApprove, handleDeleteOrder }) => {
    const { _id, name, email, food, status } = order;
    return (
        <tr>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{food}</td>
            <td>{status}</td>
            {
                status === 'Pending' ?
                    <td><Button onClick={() => handleApprove(order)} variant="contained" className="bg-primary"><i className="fas fa-check-circle me-2"></i>Approve</Button></td>
                    :
                    ""
            }
            <td><Button onClick={() => handleDeleteOrder(_id)} variant="contained" className="bg-danger"><i className="fas fa-trash-alt me-2"></i>Cancel</Button>
            </td>
        </tr>
    );
};

export default ManageOrder;