import React, { useEffect, useState } from 'react'
import Header from './Header';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [hoteldetail, setHoteldetail] = useState({});
  const [facility, setfacility] = useState([]);
  const [Type, setType] = useState([]);


  const History = useNavigate();

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

  // get room facility
  useEffect(() => {
    const getDetail = async () => {
      try {
        let doc = await axios.get('/hotel/get_facility');
        if (doc.status === 201) {
          setfacility(doc.data.result)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getDetail()
  }, []);

  // get room TYPE DATA
  useEffect(() => {
    const getDetail = async () => {
      try {
        let doc = await axios.get('/hotel/get_type');
        if (doc.status === 201) {
          setType(doc.data.result)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getDetail()
  }, []);

  useEffect(() => {
    window.scrollTo({top:0,behavior:"smooth"})
  })

  return (
    <>
      <Header />
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-10 mx-auto'>
            <section className='main_section'>
              {/* hotel detail */}
              <div className='hotel_detail'>
                <h4 >Hotel Detail</h4>
                {/* hotel detail table */}
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th><i className="fa-solid fa-user-tie"></i> Hotel_Name</th>
                      <td>{hoteldetail.name}</td>
                    </tr>
                    <tr>
                      <th><i className="fa-solid fa-square-phone"></i> Number</th>
                      <td>{hoteldetail.number}</td>
                    </tr>
                    <tr>
                      <th><i className="fa-regular fa-envelope"></i> Email_Id</th>
                      <td>{hoteldetail.email}</td>
                    </tr>
                    <tr>
                      <th><i className="fa-solid fa-location-dot"></i> Address</th>
                      <td>{hoteldetail.address}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className='text-center mt-4'>
                  <Button variant="outline-success" onClick={() => History('/edit_hotel_detail')}><i className="fa-solid fa-pencil"></i> Edit Profile</Button>
                </div>
              </div>
              {/* room facilities table */}
              <div className='room_type'>
                <h4 >Room facilities</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Facility Type</th>
                      <th>Facility Cost</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facility.map((val) => {
                      return (
                        <tr key={val.id}>
                          <td>{val.facility}</td>
                          <td>{val.cost}</td>
                          <td className='facilities_dropdown'><Dropdown>
                            <Dropdown.Toggle variant="danger" id="dropdown-basic">
                              <i className="fa-solid fa-ellipsis"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => History(`/edit_facility/${val.id}`)}><i className="fa-solid fa-pencil text-sucess"></i> Edit</Dropdown.Item>
                              {/* <Dropdown.Item onClick={} ><i className="fa-solid fa-trash-can text-danger"></i> Delete</Dropdown.Item> */}
                            </Dropdown.Menu>
                          </Dropdown></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <div className='room_facility'>
                  <button onClick={() => History('/add')}><i className="fa-solid fa-square-plus"></i> add Facility</button>
                </div>
              </div>
              {/* room type table */}
              <div className='room_type'>
                <h4 >Room Types</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Room Type</th>
                      <th>Room Cost</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Type.map((val) => {
                      return (
                        <tr key={val.id}>
                          <td>{val.type}</td>
                          <td>{val.cost}</td>
                          <td className='facilities_dropdown'><Dropdown>
                            <Dropdown.Toggle variant="danger" id="dropdown-basic">
                              <i className="fa-solid fa-ellipsis"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => History(`/edit_type/${val.id}`)}><i className="fa-solid fa-pencil text-sucess"></i> Edit</Dropdown.Item>
                              {/* <Dropdown.Item onClick={} ><i className="fa-solid fa-trash-can text-danger"></i> Delete</Dropdown.Item> */}
                            </Dropdown.Menu>
                          </Dropdown></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home