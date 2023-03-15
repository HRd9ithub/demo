import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Header from '../common/Header';

const BookingComponent = () => {

    const [reservation, setreservation] = useState([])
    const [datatoggle, setdatatoggle] = useState(false)


    let loginId = localStorage.getItem('customberId')

    useEffect(() => {
        const get_data = async () => {
            const doc = await axios.get(`/room/get_all_reservation/${loginId}`)

            if (doc.status === 201) {
                setreservation(doc.data.result)
            }
            else {
                console.log(doc.data.message)
            }
        }
        get_data()
    }, [loginId,datatoggle])

    const handleCancel = async(id,temp_room_id) => {
        try {
            await axios.delete(`/room/delete_reservation/${id}`)
            await axios.delete(`/room/delete_room/${temp_room_id}`)
            setdatatoggle(true)
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
        <Header/>
            <div className='Booking-div'>
                <h4 className='mt-4'>Reservation Details</h4>
                <hr />
                <Table striped bordered hover>
                    <thead className='booking-head'>
                        <tr>
                            <th>Room Number</th>
                            <th>Name </th>
                            <th>Email</th>
                            <th>Booking_Date</th>
                            <th>Start_Date</th>
                            <th>End_Date</th>
                            <th>Adult</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservation.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.roomId}</td>
                                    <td>{item.name} </td>
                                    <td>{item.email}</td>
                                    <td>{moment(item.Booking_Date).format("DD-MM-YYYY")}</td>
                                    <td>{moment(item.Start_Date).format("DD-MM-YYYY")}</td>
                                    <td>{moment(item.End_Date).format("DD-MM-YYYY")}</td>
                                    <td>{item.Adult}</td>
                                    <td>{item.Total * item.Adult}</td>
                                    <td><button className='booking-cancel' onClick={() => handleCancel(item.id,item.temp_room_id)}>Cancel</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default BookingComponent