import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const {Component} = props ; 

    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem('admin_Id');
        if(login){
        navigate('/hotel_detail')
        }
    })
  return (
   <Component/>
  )
}

export default ProtectedRoute