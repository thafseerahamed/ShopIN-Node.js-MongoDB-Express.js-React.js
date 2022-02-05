import React, { useEffect , useState} from "react";
import axios from "axios"
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import Footer1 from "./components/layout/Footer1";
import Header from "./components/layout/Header";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import store from "./store";
import { loaduser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import ProfileUpdate from "./components/user/ProfileUpdate";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderDetails from "./components/order/OrderDetails";
import Payment from "./components/cart/Payment";
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import InvalidRoute from "./components/layout/InvalidRoute"
//admin Imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import {useSelector} from 'react-redux'
import UpdateProduct from "./components/admin/UpdateProduct"

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')
  useEffect(() => {
    store.dispatch(loaduser());

    async function getStripeApiKey () {
      const {data} = await axios.get('/api/v1/stripeapi')
   
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  }, []);
  const {user, loading } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      <div className="container container-fluid">
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetails} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />
        <Route path="/cart" component={Cart} />
  
        
        <ProtectedRoute path="/shipping" component={Shipping} exact />
        <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
        <ProtectedRoute path="/success" component={OrderSuccess} exact />
        {stripeApiKey && 
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute path="/payment" component = {Payment} />
        </Elements>
        }
         <ProtectedRoute path="/order/:id" component={OrderDetails} exact  />
       
         <ProtectedRoute path="/orders/me" component={ListOrders} exact />
       
        <ProtectedRoute path="/me" component={Profile} exact />
       
        <ProtectedRoute path="/me/update" component={ProfileUpdate} exact />
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />
      </div>
      <ProtectedRoute path="/dashboard" isAdmin= {true} component={Dashboard} exact />
      <ProtectedRoute path="/admin/products" isAdmin= {true} component={ProductsList} exact />
      <ProtectedRoute path="/admin/product" isAdmin= {true} component={NewProduct} exact />
      <ProtectedRoute path="/admin/product/:id" isAdmin= {true} component={UpdateProduct} exact />
      {/* <Route path="/404" component={InvalidRoute} />
      <Redirect to="/404" /> */}
      {!loading && user.role !== 'admin' && (
        <Footer1 />
      )}
      
    </Router>
  );
}

export default App;
