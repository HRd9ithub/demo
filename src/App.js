import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './component/authetication/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './component/authetication/Login';
import ProtectedRoute from './component/ProtectedRoute';
import Home from './component/Detail/Home';
import AddDetail from './component/Detail/AddDetail';
import BookingComponent from './component/Detail/BookingComponent';
import EditHotelDetail from './component/Detail/EditHotelDetail';
import Editfacility from './component/Detail/Editfacility';
import EditType from './component/Detail/Edit_type';
import Roomcomponent from './component/Detail/Roomcomponent';
import Checkpassword from './component/authetication/Checkpassword';


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
      <Routes>
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/' element={<ProtectedRoute Component={Login}/>} />
        <Route exact path='/password' element={<Checkpassword/>} />
        {/* detail folder router */}
        <Route exact path='/hotel_detail' element={<Home/>} />
        <Route exact path='/edit_hotel_detail' element={<EditHotelDetail/>} />
        <Route exact path='/edit_facility/:id' element={<Editfacility/>} />
        <Route exact path='/edit_type/:id' element={<EditType/>} />
        <Route exact path='/add' element={<AddDetail/>} />
        <Route exact path='/room' element={<Roomcomponent/>} />
        <Route exact path='/booking' element={<BookingComponent/>} />
      </Routes>
    </>
  )
}

export default App