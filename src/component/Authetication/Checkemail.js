import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'


const Checkemail = () => {

    // data store
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    // error store
    const [errorMsg, seterrormsg] = useState({});
    // submit button toggle
    const [issubmit, setissubmit] = useState(false);
    // path redirect
    const navigate = useNavigate();

    // onchange function
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({ ...data, [name]: value })
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        seterrormsg(validate(data));
        setissubmit(true);
    }

    const validate = (data) => {
        let error = {};
        if (!data.email) {
            error.email = "email is required."
        } else if (!data.email.match('@')) {
            error.email = "Invaild email."
        }

        if (!data.password) {
            error.password = "password is required."
        } else if (data.password.length < 6) {
            error.password = "password lentgh is Greater than six."
        }
        return error;
    }

    useEffect(() => {
        if (Object.keys(errorMsg).length === 0 && issubmit) {
            onSubmit();
        }
    }, [errorMsg, issubmit]);

    const onSubmit = async () => {
        const { email, password } = data;

        const doc = await axios.put('/customber/update-user', { email, password });
        if (doc.status === 201) {
            navigate('/login')
            toast.success(doc.data.message)
        } else {
            toast.error(doc.data.message)
        }
    }
    return (
        <>
            <div className='container'>
                <div className='main-box center-div '>

                    <div className='row '>
                        <div className='col-md-5 mt-3'>
                            <img src='/Images/f-p.jpg' alt='register' className='mx-auto slide-image' />
                        </div>
                        <div className='col-md-6'>
                            <Form className='form-register my-5' onSubmit={handlesubmit}>
                                <h3 className='text-center mb-4'>Forget Password</h3>


                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='email' value={data.email} onChange={handleInput} />
                                    <Form.Text className="error">
                                        {errorMsg.email}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" placeholder="New Password" name='password' value={data.password} onChange={handleInput} />
                                    <Form.Text className="error">
                                        {errorMsg.password}
                                    </Form.Text>
                                </Form.Group>


                                <Button variant="primary" className='form-control' type="submit" onClick={handlesubmit} >
                                    Reset Password
                                </Button>
                                <div className="text-capitalize text-center mt-2">
                                    <NavLink to='/login' >Back to Login</NavLink>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkemail