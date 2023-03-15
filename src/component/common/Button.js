import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Button = () => {

    const [buttontoggle, setbuttonToggle] = useState(false);

    let id = localStorage.getItem("customberId");

    useEffect(() => {
        if (id) {
            setbuttonToggle(true);
        }
        else {
            setbuttonToggle(false)
        }
    }, [id, buttontoggle])


    return (
        <>
            {buttontoggle ?
                <NavLink to="/login" className="nav-link" onClick={() => {
                    localStorage.removeItem('customberId')
                    setbuttonToggle(false)
                }}>
                    <div className='d-flex flex-column align-items-center'>
                        <span><i className="fa-solid fa-right-from-bracket"></i></span>
                        <span>Log Out</span>
                    </div>
                </NavLink>
                : <>
                    <NavLink to="/login" className="nav-link" >
                        <button className='auth_btn'>
                            <span>Login</span>
                        </button>
                    </NavLink>
                    <NavLink to="/register" className="nav-link" >
                        <button className='auth_btn'>
                            <span>Register</span>
                        </button>
                    </NavLink>
                </>}
        </>

    )
}

export default Button