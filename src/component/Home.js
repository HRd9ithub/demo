import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import Slidercomponent from './Room/Slidercomponent';
import Header from './common/Header';


const Home = () => {
  const [Hoteldetail, setHoteldetail] = useState({});
  const [text, setText] = useState("Hardik Chaniyara");
  const [Index, setIndex] = useState(0);

  // hotel detail get
  useEffect(() => {
    const getDetail = async () => {
      try {
        let doc = await axios.get('/admin/hoteldetail');
        if (doc.status === 201) {
          setHoteldetail(doc.data.result)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getDetail()
  }, []);

  const TypeWriter = () => {
    if (Hoteldetail.name) {
      Hoteldetail.name.length < Index ? setIndex(0) : setIndex(Index + 1)
      setText(Hoteldetail.name.substring(0, Index))
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      TypeWriter()
    }, 100);
  }, [Index, Hoteldetail])


  return (
    <>
      <Header/>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Images/slider/1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{text}</h3>
            <p>{Hoteldetail.name} offers spectacular views of the Sabarmati Riverfront and the UNESCO World Heritage City. Ideally located in the central business district, the hotel has 208 generously-sized guestrooms, and award-winning restaurants to choose from.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Images/slider/2.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>{text}</h3>
            <p>{Hoteldetail.name} offers spectacular views of the Sabarmati Riverfront and the UNESCO World Heritage City. Ideally located in the central business district, the hotel has 208 generously-sized guestrooms, and award-winning restaurants to choose from.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/Images/slider/3.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>{text}</h3>
            <p>{Hoteldetail.name} offers spectacular views of the Sabarmati Riverfront and the UNESCO World Heritage City. Ideally located in the central business district, the hotel has 208 generously-sized guestrooms, and award-winning restaurants to choose from.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Slidercomponent/>
    </>
  )
}

export default Home