import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const EditHotelDetail = () => {

    const [hoteldetail, setHoteldetail] = useState({
        name:"",
        address: "",
        number:"",
        email:""
    });
    // error store
    const[errorMsg,setErrorMsg] = useState({});
    const[Issubmit,setIssubmit] = useState(false);

    const History = useNavigate();

    const handleChange = (event) => {
         let name = event.target.name;
         let value = event.target.value;

         setHoteldetail({...hoteldetail,[name]: value})
    }

    const hnadleSubmit = (event) => {
        event.preventDefault();
        setErrorMsg(validation(hoteldetail));
        setIssubmit(true);
    }

    const validation = (data) => {
        const error = {};

        if(!data.name){
            error.name = "Name is Required."
        }

        if(!data.number){
            error.number = "Number is Required."
        }else if(data.number.length !== 10){
            error.number = "Please Enter the ten Digit."
        }

        if(!data.email){
            error.email = 'Email is Required.'
        }

        if(!data.address){
            error.address = "Address is Required."
        }
        return error;
    }

    const onSubmit =async() => {
         const {name,address,number,email,id} = hoteldetail;
        try {
            let doc =await axios.put(`/hotel/updatehoteldetail/${id}`,{name,address,number,email,id});
            if(doc.status === 201){
              History('/hotel_detail');
              setHoteldetail({   name:"",
              address: "",
              number:"",
              email:""})
            toast.success("update is successfully!! ")
            }else{
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }

     useEffect(() => {
        if(Object.keys(errorMsg).length === 0 && Issubmit){
            onSubmit();
        }
     }, [errorMsg,Issubmit]);

    useEffect(() => {
        const getDetail = async() => {
          try {
            window.scrollTo({top:0, behavior: "smooth"})
             let doc = await axios.get('/admin/hoteldetail');
             if(doc.status === 201){
              setHoteldetail({...doc.data.result,id:doc.data.result.id})
             }
          } catch (error) { 
           console.log(error)
          }
        }
        getDetail()
      }, []);

    return (
        <>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-md-10 mx-auto'>
                        <section className='main_section'>
                            <div className='hotel_detail'>
                                <h4 >Edit Hotel Detail</h4>
                                <Form onSubmit={hnadleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasiname">
                                        <Form.Label>Hotel Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name"  value={hoteldetail.name} name='name' onChange={handleChange} />
                                        <Form.Text className="error">
                                          {errorMsg.name}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicnumber">
                                        <Form.Label>Number</Form.Label>
                                        <Form.Control type="number" placeholder="Enter number" value={hoteldetail.number} name='number' onChange={handleChange} />
                                        <Form.Text className="error">
                                          {errorMsg.number}
                                        </Form.Text>
                                    </Form.Group><Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email Id</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={hoteldetail.email} name='email' onChange={handleChange} />
                                        <Form.Text className="error">
                                          {errorMsg.email}
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Address" value={hoteldetail.address} name='address' onChange={handleChange} />
                                        <Form.Text className="error">
                                          {errorMsg.address}
                                        </Form.Text>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className='me-4'>
                                        Save
                                    </Button>
                                    <Button variant="danger" type="submit" onClick={() => History('/hotel_detail')}>
                                        Cancel
                                    </Button>
                                </Form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditHotelDetail