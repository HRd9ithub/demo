import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import ReactToPrint from 'react-to-print'
import Header from '../common/Header';

const CheckoutComponent = () => {
  let param = useParams();

  const [reservation, setreservation] = useState({})

  useEffect(() => {
    const get_data = async () => {
      const doc = await axios.get(`/room/get_reservation/${param.id}`)
      if (doc.status === 201) {
        setreservation(doc.data.result)
      }
      else {
        console.log(doc.data.message)
      }
    }
    get_data()
  }, [param])

  let componentRef = useRef(null)

  let History = useNavigate();

  return (
    <>
    <Header/>
      <Pagination id={param.id} />
      <div className='container' >
        <div className='grid-container ' ref={componentRef}>
          <div className='grid-left m-1 me-4'>
            <h3>Guest Information</h3>
            <hr className='mt-2' />
            <div className="second-div">
              <div className='grid-one'>
                <h6 className='mt-4'>Name</h6>
                <span>{reservation.name}</span>
                <h6 className='mt-4'>Phone</h6>
                <span>{reservation.number}</span>
                <h6 className='mt-4'>City</h6>
                <span>{reservation.city}</span>
              </div>
              <div className='grid-two'>
                <h6 className='mt-4'>Email</h6>
                <span>{reservation.email}</span>
                <h6 className='mt-4'>Address</h6>
                <span>{reservation.address}</span>
              </div>
            </div>
          </div>
          <div className='grid-right'>
            <div className='grid-top'>
              <h3>Reservation details</h3>
              <hr className='mt-2' />
              <div className="second-div">
                <div className='grid-one'>
                  <h6 className='mt-4'>Room No</h6>
                  <span>{reservation.roomId}</span>
                  <h6 className='mt-4'>start date</h6>
                  <span>{moment(reservation.Start_Date).format("MMMM DD YYYY")}</span>
                </div>
                <div className='grid-two'>
                  <h6 className='mt-4'>Booking Date</h6>
                  <span>{moment(reservation.Booking_Date).format("MMMM DD YYYY")}</span>
                  <h6 className='mt-4'>End Date</h6>
                  <span>{moment(reservation.End_Date).format("MMMM DD YYYY")}</span>
                </div>
              </div>
            </div>
            <div className='grid-bottom mt-4'>
              <h3>Payment details</h3>
              <hr className='mt-2' />
              <div className="second-div">
                <div className='grid-one'>
                  <h6 className='mt-4'>Transaction time</h6>
                  <span>{moment(reservation.Transaction_Date).format("MMMM DD YYYY hh:mm:ss")}</span>
                  <h6 className='mt-4'>Cart details</h6>
                  <span>{reservation.card_number}</span>
                </div>
                <div className='grid-two'>
                  <h6 className='mt-4'>Amount</h6>
                  <span><i className="fa-solid fa-indian-rupee-sign"></i>  {reservation.Total * reservation.Adult}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <button className='btn btn-outline-dark' onClick={() => History('/booking')}>show booking</button>
          <ReactToPrint
            trigger={() => <button className='btn btn-outline-info'><i className="fa-solid fa-print"></i> Print</button>}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </>
  )
}

export default CheckoutComponent