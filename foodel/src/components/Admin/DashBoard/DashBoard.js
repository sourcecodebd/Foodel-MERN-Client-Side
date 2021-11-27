import { Button } from '@mui/material';
import React from 'react';

const DashBoard = ({ order, handleUpdateFood, handleDeleteFood }) => {
    const { _id, food, tag } = order;
    return (
        <tr>
            <td>{_id}</td>
            <td>{food}</td>
            <td>{tag}</td>
            <td><Button onClick={() => handleUpdateFood(_id)} variant="contained" className="bg-primary"><i className="fas fa-edit me-2"></i>Update</Button>
            </td>
            <td><Button onClick={() => handleDeleteFood(_id)} variant="contained" className="bg-danger"><i className="fas fa-trash-alt me-2"></i>Remove</Button>
            </td>
        </tr>
    );
};

export default DashBoard;