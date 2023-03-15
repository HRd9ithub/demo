import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

    // data store
    const[data,setData] = useState({
        email:'',
        password:''
    })
    // error store
    const [errorMsg, seterrormsg] = useState({});
    // submit button toggle
    const[issubmit, setissubmit] = useState(false);
    // path redirect
    const navigate = useNavigate();

    // onchange function
    const hnadleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({...data,[name]:value})
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        seterrormsg(validate(data));
        setissubmit(true);
    }

    const validate = (data) => {
      let error = {};
      if(!data.email){
        error.email = "email is required."
      }
      if(!data.password){
        error.password = "password is required."
      }else if(data.password.length < 6) {
        error.password = "password lentgh is Greater than six."
      }
      return error;
    }

    useEffect(() => {
        if(Object.keys(errorMsg).length === 0 && issubmit){
            onSubmit();
        }
    },[errorMsg,issubmit]);

    const onSubmit = async() => {
        const {email,password} = data;
        
        const res = await axios.post('/admin/login',{email,password});
        if(res.status === 201) {
              toast.success(`${res.data.message.name} is login successfully`);
              localStorage.setItem("admin_Id",res.data.message.id)
              navigate('/hotel_detail')
        }else{
            console.log("err")
            toast.error(res.data.message);
        }
    }
    return (
        <>
            <div className='container'>
                <div className='main-box '>

                    <div className='row '>
                        <div className='col-md-5 '>
                            <img src='/Images/login.png' alt='register' className='mx-auto slide-image' />
                        </div>
                        <div className='col-md-6 py-5'>
                            <Form className='form-register my-5' onSubmit={handlesubmit}>
                                <h3 className='text-center mb-4'>Login</h3>
                                
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"  name='email' value={data.email} onChange={hnadleInput}/>
                                    <Form.Text className="error">
                                        {errorMsg.email}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"  name='password' value={data.password} onChange={hnadleInput} />
                                    <Form.Text className="error">
                                        {errorMsg.password}
                                    </Form.Text>
                                </Form.Group>
                                
                                <p className='mb-3'>
                                    create new account ? <NavLink to='/register'>Register</NavLink>
                                </p>
                                <p className='mb-3'>
                                    <NavLink to='/password'>Forget Password</NavLink>
                                </p>
                                <Button variant="primary" className='form-control' type="submit" onClick={handlesubmit} >
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;