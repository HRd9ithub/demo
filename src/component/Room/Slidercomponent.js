import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';


const Slidercomponent = () => {
    var settings = {
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

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

    return (
        <>
            <div className='container '>
                <div className='row mt-5'>
                    <div className='col-md-12 mx-auto'>
                        <div className='me-3'>
                            <Slider {...settings} >
                                {allroom.map((val) => {
                                    return (
                                        <div key={val.id}>
                                            <Card style={{ width: '20rem' }}  className="mx-auto">
                                                <div className='card-image'>
                                                    <Card.Img variant="top" src={`/upload/${val.photo}`} className="slider-img " />
                                                </div>

                                                <Card.Body>
                                                    <div className='d-flex justify-content-between'>
                                                    <Card.Title className='title_room'>Room No : <span>{val.id}</span></Card.Title>
                                                        <Button variant='warning' onClick={() => History(`/single-detail/${val.id}`)}>View Detail</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Slidercomponent