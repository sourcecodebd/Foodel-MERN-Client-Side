import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './components/context/AuthProvider';
import Header from './components/shared/Header/Header';
import Home from './components/Home/Home';
import Foods from './components/Home/Foods/Foods';
import Login from './components/authentication/Login/Login';
import Register from './components/authentication/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Admin from './components/Admin/Admin';
import NotFound from './components/shared/NotFound/NotFound';
import Footer from './components/shared/Footer/Footer';
import Search from './components/Home/Search/Search';
import AboutUs from './components/AboutUs/AboutUs';
import Advertise from './components/Advertise/Advertise';
import DeliveryWorkers from './components/DeliveryWorkers/DeliveryWorkers';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import MyOrders from './components/MyOrders/MyOrders';
import AdminRoute from './components/AdminRoute/AdminRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/search'>
              <Search />
            </Route>
            <Route path='/foods'>
              <Foods />
            </Route>
            <Route path='/delivery-workers'>
              <DeliveryWorkers />
            </Route>
            <Route path='/about-us'>
              <AboutUs />
            </Route>
            <Route path='/advertise'>
              <Advertise />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <PrivateRoute path='/place-order/:id'>
              <PlaceOrder />
            </PrivateRoute>
            <PrivateRoute path='/my-orders'>
              <MyOrders />
            </PrivateRoute>
            <AdminRoute path='/admin'>
              <Admin />
            </AdminRoute>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
