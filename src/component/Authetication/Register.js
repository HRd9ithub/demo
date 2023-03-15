import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import Header from '../common/Header';

const Register = () => {

    // data store
    const[data,setData] = useState({
        name:'',
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
        console.log(Object.entries(data) , "kessys")
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        seterrormsg(validate(data));
        setissubmit(true);
    }

    const validate = (data) => {
      let error = {};

      if(!data.name){
        error.name = "name is required."
      }
      if(!data.email){
        error.email = "email is required."
      } else if (!data.email.match('@')) {
        error.email = "Invaild email."
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
        const {name,email,password} = data;
        const id = Math.random().toString().slice(2,8) 
        const res = await axios.post('/customber/register',{name,email,password,id});

        if(res.status === 201) {
              toast.success(`${res.data.result.name} is register successfully`);
              localStorage.setItem("customberId",res.data.result.id)
              navigate('/')
        }else{
           toast.error(res.data.message)
        }
    }
    return (
        <>
        <Header/>
            <div className='container'>
                <div className='main-box '>

                    <div className='row '>
                        <div className='col-md-5 '>
                            <img src='/Images/register.jpg' alt='register' className='mx-auto slide-image' />
                        </div>
                        <div className='col-md-6 ms-3'>
                            <Form className='form-register my-5' onSubmit={handlesubmit}>
                                <h3 className='text-center mb-4'>Register</h3>
                                <Form.Group className="mb-3" controlId="formBasicname">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" name='name' value={data.name} onChange={hnadleInput} />
                                    <Form.Text className="error">
                                        {errorMsg.name}
                                    </Form.Text>
                                </Form.Group>
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
                                    Already account Exists ? <NavLink to='/login'>Login</NavLink>
                                </p>
                                <Button variant="primary" className='form-control' type="submit" onClick={handlesubmit} >
                                    Register
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;