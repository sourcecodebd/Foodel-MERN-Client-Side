import React from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom';
import AdminRoute from '../AdminRoute/AdminRoute';
import NotFound from '../shared/NotFound/NotFound';
import AddFood from './AddFood/AddFood';
import AdminPanel from './AdminPanel/AdminPanel';
import Dashboards from './DashBoards/DashBoards';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import ManageOrders from './ManageOrders/ManageOrders';
import UpdateFood from './UpdateFood/UpdateFood';

const Admin = () => {
    const activeStyle = {
        color: 'white',
        backgroundColor: 'limegreen',
    }

    return (
        <div className="container-fluid row gap-4 mx-auto my-3 d-flex justify-content-center">
            <Router>
                <div className="col-md-3 fw-bold shadow p-5 my-5 d-flex flex-column gap-3">
                    <NavLink to='/admin' className="p-2 limegreen rounded-3"><i className="fas fa-user-cog me-2"></i> Admin Panel</NavLink>
                    <NavLink activeStyle={activeStyle} to="/admin/admin-dashboard" className="p-2 limegreen rounded-3"><i className="fas fa-list me-2"></i> Food List</NavLink>
                    <NavLink activeStyle={activeStyle} to='/admin/add-food' className="p-2 limegreen rounded-3"><i className="fas fa-plus me-2"></i> Add Food</NavLink>
                    <NavLink activeStyle={activeStyle} to='/admin/manage-orders' className="p-2 limegreen rounded-3"><i className="fas fa-tools me-2"></i> Manage Orders</NavLink>
                    <NavLink activeStyle={activeStyle} to='/admin/make-admin' className="p-2 limegreen rounded-3"><i className="fas fa-cog me-2"></i> Settings</NavLink>
                </div>
                <div className="col-md-8 shadow p-md-3 p-2">
                    <Switch>
                        <AdminRoute exact path='/admin'>
                            <AdminPanel />
                        </AdminRoute>
                        <AdminRoute path='/admin/admin-dashboard'>
                            <Dashboards />
                        </AdminRoute>
                        <AdminRoute path='/admin/add-food'>
                            <AddFood />
                        </AdminRoute>
                        <AdminRoute path='/admin/update-food/:id'>
                            <UpdateFood />
                        </AdminRoute>
                        <AdminRoute path='/admin/make-admin'>
                            <MakeAdmin />
                        </AdminRoute>
                        <AdminRoute path='/admin/manage-orders'>
                            <ManageOrders />
                        </AdminRoute>
                        <Route path='*'>
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default Admin;