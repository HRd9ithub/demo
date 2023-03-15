import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './component/Authetication/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './component/Home';
import Login from './component/Authetication/Login';
import RoomDetailComponent from './component/Room/RoomDetailComponent';
import RoomListcomponent from './component/Room/RoomListcomponent';
import ConfirmComponent from './component/Room/ConfirmComponent';
import ReservationComponent from './component/Room/ReservationComponent';
import ProtectedRoute from './component/common/ProtectedRoute';
import CheckoutComponent from './component/Room/CheckoutComponent';
import BookingComponent from './component/Room/BookingComponent';
import Footer from './component/common/Footer';
import Checkemail from './component/Authetication/Checkemail';

const App = () => {

  return (
    <>
     <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <Header/> */}
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/checkEmail' element={<Checkemail />} />
        <Route exact path='/room-list' element={<RoomListcomponent />} />
        <Route exact path='/single-detail/:id' element={<RoomDetailComponent />} />
        <Route exact path='/confirm/:id' element={<ProtectedRoute Component={ConfirmComponent} />} />
        <Route exact path='/reservation/:id' element={<ProtectedRoute Component={ReservationComponent} />} />
        <Route exact path='/checkout/:id' element={<ProtectedRoute Component={CheckoutComponent} />} />
        <Route exact path='/booking' element={<ProtectedRoute Component={BookingComponent} />} /> 
      </Routes>
      <Footer/>
    </>
  )
}

export default App