import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Header from '../common/Header';

const RoomDetailComponent = () => {

    const params = useParams();

    const [singleroom, setsingleroom] = useState({})
    // const [hoteldetail, setHoteldetail] = useState({})
    const [data, setData] = useState({
        Start_date: moment(new Date()).format('YYYY-MM-DD'),
        End_date: moment(new Date()).format('YYYY-MM-DD'),
        adult: "1",
        Booking_Date: moment(new Date()).format('YYYY-MM-DD'),
        Total: 0
    })

    const History = useNavigate();

    // room detail
    useEffect(() => {
        const getRoom = async () => {
            const docs = await axios.get(`/hotel/get_single_room/${params.id}`);
            if (docs.status === 201) {
                setsingleroom(docs.data.result);
                data.Total = parseFloat((docs.data.result.subtotal + docs.data.result.cost) + (docs.data.result.subtotal + docs.data.result.cost) * 18 / 100).toFixed(2)
            } else {
                console.log(docs.data.message)
            }
        }
        getRoom();
    }, []);

    const InputEvent = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { Start_date, End_date, adult, Booking_Date, Total } = data;

        const doc = await axios.post('/room/add_temp', { Start_date, End_date, adult, Booking_Date, Total, roomId: params.id });
        if (doc.status === 201) {
            setData({
                Start_date: moment(new Date()).format('YYYY-MM-DD'),
                End_date: moment(new Date()).format('YYYY-MM-DD'),
                adult: "1",
                Booking_Date: moment(new Date()).format('YYYY-MM-DD'),
                Total: 0
            })
            History(`/confirm/${doc.data.result}`)
        } else {
            console.log(doc.data.message)
        }
    }



    return (
        <>
        <Header/>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-md-12 mx-auto'>
                        <div className='Image_div'>
                            <img src={`/upload/${singleroom.photo}`} className=' ' alt='single_photo' />
                            <div className='date_div p-5'>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <input type="date" value={data.Start_date} name='Start_date' onChange={InputEvent} />
                                    </div>
                                    <div className='col-md-3'>
                                        <input type="date" min={data.Start_date} value={data.End_date} name='End_date' onChange={InputEvent} />
                                    </div>
                                    <div className='col-md-3'>
                                        <select name='adult' onChange={InputEvent} >
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                        </select>
                                    </div>
                                    <div className='col-md-3'>
                                        <button className='button btn_bull' onClick={handleSubmit}>BOOK A ROOM</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='room_info'>
                            <h2>Room facilities </h2>
                            {singleroom.room_facilities && <>
                                <div className='facility_div'>
                                    {JSON.parse(singleroom.room_facilities).map((elem, ind) => {
                                        return (
                                            <button key={ind}>{elem}</button>
                                        )
                                    })}
                                </div>
                            </>}
                        </div>
                        <div className='room_info'>
                            <h2>Room Type </h2>
                                <div className='facility_div'>
                                  <button > {singleroom.type}</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomDetailComponent