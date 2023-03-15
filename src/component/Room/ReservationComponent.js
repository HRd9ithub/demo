import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Pagination from './Pagination';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import moment from 'moment'
import Header from '../common/Header';

const ReservationComponent = () => {
  const param = useParams();
  let loginId = localStorage.getItem('customberId')

  let History = useNavigate()

  const [data, setdata] = useState({
    name: '',
    email: "",
    number: "",
    address: "",
    city: "",
    card: '',
    Transaction_date : moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
  })

  const [errorMsg, setErrormsg] = useState({});
  const [issubmit, setissubmit] = useState(false)

  const InputEvent = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setdata({ ...data, [name]: value })
  }

  const HandleSubmit = (e) => {
    e.preventDefault();
    setErrormsg(validate(data));
    setissubmit(true)
  }

  const validate = (data) => {
    let error = {};

    if (!data.name) {
      error.name = "Name is Required."
    }
    if (!data.email) {
      error.email = "email is Required."
    } else if (!data.email.match('@')) {
      error.email = "Invaild email."
    }

    if (!data.number) {
      error.number = "number is Required."
    } else if (data.number.length !== 10) {
      error.number = "invaild mobile number.."
    }
    if (!data.card) {
      error.card = "card number is Required."
    } else if (data.card.length !== 10) {
      error.card = "invaild card number.."
    }

    if (!data.address) {
      error.address = "address is Required."
    }
    if (!data.city) {
      error.city = "city is Required."
    }
    return error;
  }

  useEffect(() => {
    if (Object.keys(errorMsg).length === 0 && issubmit) {
      onSubmit();
    }
  }, [errorMsg, issubmit])


  // login data get
  useEffect(() => {
    const get_user = async () => {
      const doc = await axios.get(`/customber/get-data/${loginId}`);
      if (doc.status === 201) {
        setdata({ ...data, email: doc.data.result.email })
      }
      else {
        console.log(doc.data.message)
      }
    }
    get_user()
  }, [loginId])

  const onSubmit = async () => {
    let { name, email, address, number, city, card ,Transaction_date} = data;

    const doc = await axios.post('/room/add_reservation', { name, email, address, number, city, card, loginId, temp_room_id: param.id ,Transaction_date});

    if (doc.status === 201) {
      setdata({
        name: '',
        email: "",
        number: "",
        address: "",
        city: "",
        card: '',
        Transaction_date : moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
      });
      History(`/checkout/${doc.data.result}`);
    }
    else {
      console.log(doc.data.message)
    }
  }
  return (
    <>
    <Header/>
      <Pagination id={param.id} />
      <div className='container'>
        <div className='reservation-form mt-4'>
          <div className='row p-4'>
            <div className='col-md-6'>
              <h3>Guest Detail</h3>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicname">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" name='name' value={data.name} onChange={InputEvent} />
                  <Form.Text className='error'>
                    {errorMsg.name}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name='email' value={data.email} onChange={InputEvent} />
                  <Form.Text className='error'>
                    {errorMsg.email}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicnumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="number" placeholder="Enter Number" name='number' value={data.number} onChange={InputEvent} />
                  <Form.Text className='error'>
                    {errorMsg.number}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicaddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter Address" name='address' value={data.address} onChange={InputEvent} />
                  <Form.Text className='error'>
                    {errorMsg.address}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>city</Form.Label>
                  <Form.Control type="text" placeholder="Enter City" name='city' value={data.city} onChange={InputEvent} />
                  <Form.Text className='error'>
                    {errorMsg.city}
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className='form-control' onClick={HandleSubmit}>
                  checkout
                </Button>
              </Form>
            </div>
            <div className='col-md-6'>
              <h3>Payment Detail</h3>

              <Form>
                <Form.Group className="mb-3" controlId="formBasiccard">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="number" placeholder="Enter card number" value={data.card} name="card" onChange={InputEvent} />
                  <Form.Text className="error">
                    {errorMsg.card}
                  </Form.Text>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReservationComponent