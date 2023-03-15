import React from 'react'
import { useLocation } from 'react-router-dom'

const Pagination = ({id}) => {
    const location = useLocation()

    return (
        <>
            <div className='page_define'>
                <div className='row mt-5'>
                    <div className='col-md-8 mx-auto'>
                        <div className='col-md-12 mx-auto d-flex justify-content-between align-items-start'>
                            <div className='text-center title-page'>
                                <span className='marks'>
                                    {location.pathname === `/confirm/${id}` || location.pathname === `/reservation/${id}` || location.pathname === `/checkout/${id}`  ?
                                        <i className="fa-solid fa-circle-check"></i>
                                        :
                                        <i className="fa-regular fa-circle-xmark"></i>
                                    }
                                </span>
                                <p>Confirm Details</p>
                            </div>
                            <div className='text-center title-page'>
                                <span className='marks'>
                                    {location.pathname === `/reservation/${id}` || location.pathname === `/checkout/${id}`  ?
                                        <i className="fa-solid fa-circle-check"></i>
                                        :
                                        <i className="fa-regular fa-circle-xmark"></i>
                                    }
                                </span>
                                <p>Reservation</p>
                            </div>
                            <div className='text-center Download-title-link'>
                                <span className='marks'>
                                    {location.pathname === `/checkout/${id}` ?
                                        <i className="fa-solid fa-circle-check"></i>
                                        :
                                        <i className="fa-regular fa-circle-xmark"></i>
                                    }
                                </span>
                                <p>Checkout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pagination