import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';

const RoomListcomponent = () => {

    const [allroom, setallroom] = useState([])

    const History = useNavigate();

    // room detail
    useEffect(() => {
        const getRoom = async () => {
            const docs = await axios.get('/hotel/get_room');
            if (docs.status === 201) {
                setallroom(docs.data.result);
            } else {
                console.log(docs.data.message)
            }
        }
        getRoom();
    }, []);

    let GST = 18;
    return (
        <>
            <Header />
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-md-10 mx-auto'>
                        {allroom.map((item) => {
                            return (
                                <article className="room_list" key={item.id}>
                                    <div className="row row-flex">
                                        <div className="col-lg-4 col-md-5 col-sm-12 card-image">
                                            <img src={`/upload/${item.photo}`} className="w-100 image_list" alt="_Image" />
                                        </div>
                                        <div className="col-lg-8 col-md-7 col-sm-12">
                                            <div className="room_details row-flex">
                                                <div className="col-md-9 col-sm-9  room_desc">
                                                    <h3>Room No:  <span> {item.id}</span></h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>
                                                    <label>Room Facilities  :</label>
                                                    {item.room_facilities && <>
                                                        <div className='facility_div'>
                                                            {JSON.parse(item.room_facilities).map((elem, ind) => {
                                                                return (
                                                                    <button key={ind}>{elem}</button>
                                                                )
                                                            })}
                                                        </div>
                                                    </>}
                                                    <div className='my-2'>
                                                        <label >Room Type  :</label>
                                                        <div className='facility_div'>
                                                            <button >{item.type}</button>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-md-3 col-sm-3 col-xs-12 room_price">
                                                    <div className="room_price_inner">
                                                        <span className="room_price_number"><h6>Gst : <i className="fa-sharp fa-solid fa-indian-rupee-sign"></i>{parseFloat((item.subtotal + item.cost) * GST / 100).toFixed(2)}</h6></span>
                                                        <span className="room_price_number"><h6>Total : <i className="fa-sharp fa-solid fa-indian-rupee-sign"></i>{parseFloat((item.subtotal + item.cost) + (item.subtotal + item.cost) * GST / 100).toFixed(2)}</h6></span>
                                                    </div>
                                                    <button onClick={() => History(`/single-detail/${item.id}`)}> Book Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomListcomponent