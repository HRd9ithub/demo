import React, { useEffect, useState } from 'react'
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Editfacility = () => {

    const params = useParams();

    const [data, setdata] = useState({
        facility: '',
        cost: ''
    });
    // error store
    const [errorMsg, setErrorMsg] = useState({});
    const [Issubmit, setIssubmit] = useState(false);

    const History = useNavigate()

    const handlChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setdata({ ...data, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMsg(validation(data));
        setIssubmit(true);
    }
    const validation = (data) => {
        const error = {};

        if (!data.facility) {
            error.facility = "facility is Required."
        }

        if (!data.cost) {
            error.cost = 'cost is Required.'
        }

        return error;
    }

    const onSubmit = async () => {
        const { facility, cost } = data;
        try {
            let doc = await axios.put(`/hotel/update_facility/${params.id}`, { facility, cost });
            if (doc.status === 201) {
                // window.history.back();
                History('/hotel_detail');
                toast.success("facility update is successfully!! ")
                setdata({
                    facility: '',
                    cost: ''
                })
                // window.scrollTo({top:250,behavior:"smooth"})
            } else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (Object.keys(errorMsg).length === 0 && Issubmit) {
            onSubmit();
        }
    }, [errorMsg, Issubmit]);


    //   get value 
    useEffect(() => {
        const getDetail = async () => {
            try {
                let doc = await axios.get(`/hotel/get_single_facility/${params.id}`);
                if (doc.status === 201) {
                    setdata(doc.data.result)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getDetail()
    }, [params]);


    return (
        <>
            <Header />
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-md-10 mx-auto'>
                        <section className='main_section'>
                            <div className='add_facility'>
                                <h4>Edit facilities</h4>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicfacility">
                                        <Form.Label>Facility :</Form.Label>
                                        <Form.Control type="text" placeholder="Enter facility" name='facility' value={data.facility} onChange={handlChange} />
                                        <Form.Text className="error">
                                            {errorMsg.facility}
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasiccost">
                                        <Form.Label>Facility Cost :</Form.Label>
                                        <Form.Control type="number" placeholder="Enter cost" name='cost' value={data.cost} onChange={handlChange} />
                                        <Form.Text className="error">
                                            {errorMsg.cost}
                                        </Form.Text>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Update
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

export default Editfacility