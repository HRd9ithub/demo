import React, { useEffect, useState } from 'react'
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Edit_type = () => {

    const params = useParams();

    const [data, setdata] = useState({
        type: '',
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

        if (!data.type) {
            error.type = "type is Required."
        }

        if (!data.cost) {
            error.cost = 'cost is Required.'
        }

        return error;
    }

    const onSubmit = async () => {
        const { type, cost } = data;
        try {
            let doc = await axios.put(`/hotel/update_type/${params.id}`, { type, cost });
            if (doc.status === 201) {
                History('/hotel_detail');
                toast.success("type update is successfully!! ")
                setdata({
                    type: '',
                    cost: ''
                })
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
                let doc = await axios.get(`/hotel/get_single_type/${params.id}`);
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
                                <h4>Edit Type</h4>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicfacility">
                                        <Form.Label>Room Type :</Form.Label>
                                        <Form.Control type="text" placeholder="Enter facility" name='type' value={data.type} onChange={handlChange} />
                                        <Form.Text className="error">
                                            {errorMsg.type}
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasiccost">
                                        <Form.Label>Room Cost :</Form.Label>
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

export default Edit_type