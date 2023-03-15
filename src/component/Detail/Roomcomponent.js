import React,{useEffect, useState} from 'react'
import Header from './Header';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Roomcomponent = () => {
    const [allroom,setallroom] = useState([])
    const [hoteldetail,setHoteldetail] = useState({})

    // room detail
    useEffect(() => {
        const getRoom = async( ) => {
           const docs = await axios.get('/hotel/get_room');
           if(docs.status === 201){
            setallroom(docs.data.result);
           }else{
            console.log(docs.data.message)
           }
        }
        getRoom();
    }, []);

    // hoteldetail
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


      let GST = 18;

    
    return (
        <>
            <Header />
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-md-10 mx-auto'>
                        <section className='main_section'>
                            {allroom.map((val) => {
                                return(
                            <Card style={{ width: '50rem' }} key={val.id} className="mx-auto">
                                <div>
                                <Card.Img variant="top" src={`/upload/${val.photo}`} />
                                    
                                </div>
                                <Card.Body>
                                    <Card.Title>{hoteldetail.name}</Card.Title>
                                    <Card.Text>
                                        {hoteldetail.address}
                                    </Card.Text>
                                    <div className='facility_div'>
                                    {JSON.parse(val.room_facilities).map((elem,ind) => {
                                       return(
                                           <button key={ind}>{elem}</button>
                                       )
                                    })}
                                    </div>
                                    <div className='facility_div mt-3'>
                                           <button >{val.type}</button>
                                    </div>
                                    {/* <div className='total-div'> */}
                                        {/* <div>
                                        <button>Book Now</button>
                                        </div> */}
                                            
                                        <div className='mt-5'>
                                        <h6><i className="fa-sharp fa-solid fa-indian-rupee-sign"></i>{val.subtotal+val.cost}+ Gst <i className="fa-sharp fa-solid fa-indian-rupee-sign"></i>{parseFloat((val.subtotal+val.cost )* GST/100).toFixed(2)}</h6>
                                        <h6>Total : <i className="fa-sharp fa-solid fa-indian-rupee-sign"></i>{parseFloat((val.subtotal+val.cost) + (val.subtotal+val.cost )* GST/100).toFixed(2)}</h6>
                                        </div>
                                    {/* </div> */}
                                </Card.Body>
                            </Card>
                                )
                            })}
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roomcomponent