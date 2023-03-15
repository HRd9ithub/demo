import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../common/Header';
import Pagination from './Pagination'

const ConfirmComponent = () => {

    const param = useParams();
    const [room, setRoom] = useState({});

    const History = useNavigate();

    useEffect(() => {
        const get_room = async() => {
            const res = await axios.get(`/room/get_temp/${param.id}`);
            if(res.status === 201){
              setRoom(res.data.result)
            }
            else{
                console.log(res.data.message)
            }
        }
        get_room()
    },[])

    const handleCancel = async( ) => {
         const doc = await axios.delete(`/room/delete_room/${param.id}`);
         if(doc.status === 201){
            History('/room-list');
         }
         else{
            console.log(doc.data.message)
         }
    }

  return (
    <>
    <Header/>
    <Pagination id={param.id}/>
    <div className='container'>
       <div className='confirm-div my-4'>
        <div className='row p-3'>
             <div className='col-md-6'> 
                 <img src={`/upload/${room.photo}`} alt='' className='w-100' />
             </div>
             <div className='col-md-4  info_room'>
                  <p>Room No : <span>{room.roomId}</span></p>
                  <h4>Arrive Date : </h4>
                  <span>({moment(room.Start_Date).format('MMMM DD,YYYY')})</span>
                  <h4>End Date : </h4>
                  <span>({moment(room.End_Date).format('MMMM DD,YYYY')})</span>
                  <h4>Guests: </h4>
                  <span>{room.Adult}  Adults</span>
             </div>
             <div className='col-md-2 total_div'>
                <h5>Total</h5>
                <span><i className="fa-solid fa-indian-rupee-sign"></i>  {room.Total * room.Adult}</span>
             </div>
        </div>
        <div className='row mt-3 pb-3'>
            <div className='col-md-11 mx-auto'>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>
                    <button className='btn btn-primary' onClick={() => History(`/reservation/${param.id}`)}>Reservation  <i className="fa-solid fa-angle-right"></i></button>
                </div>
            </div>
        </div>
       </div>
    </div>
    </>
  )
}

export default ConfirmComponent