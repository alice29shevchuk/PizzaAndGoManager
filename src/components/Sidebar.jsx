import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice,faCity,faComment,faDashboard,faListCheck } from '@fortawesome/free-solid-svg-icons';
export default function Sidebar({ChooiceCat}) {
  return (
    <div className='bg-white sidebar p-2'>
        <div className='m-2'>
            <FontAwesomeIcon icon={faPizzaSlice} className='me-2 fs-6' />
            <span className='brand-name fs-6'>Pizza and Go</span>
        </div>
        <hr className='text-dark'></hr>
        <div className='list-group list-group-flush'>
            <a className='list-group-item py-2 my-1' onClick={()=>{ChooiceCat(1)}}>
                <FontAwesomeIcon icon={faDashboard} className='me-3 fs-5' />
                <span>Dashboard</span>
            </a>
            <a className='list-group-item py-2 my-1' onClick={()=>{ChooiceCat(2)}}>
                <FontAwesomeIcon icon={faListCheck} className='me-3 fs-5' />
                <span>Categories</span>
            </a>
            <a className='list-group-item py-2 my-1'  onClick={()=>{ChooiceCat(3)}}>
                <FontAwesomeIcon icon={faPizzaSlice} className='fs-5 me-3' />
                <span >Pizzas</span>
            </a>
            {/* combo */}
            <a className='list-group-item py-2 my-1'  onClick={()=>{ChooiceCat(7)}}>
                <FontAwesomeIcon icon={faPizzaSlice} className='fs-5 me-3' />
                <span >Combo Pizzas</span>
            </a>
            <a className='list-group-item py-2 my-1'  onClick={()=>{ChooiceCat(4)}}>
                <FontAwesomeIcon icon={faCity} className='fs-6 me-3' />
                <span >Cities / Departments</span>
            </a>
            <a className='list-group-item py-2 my-1'  onClick={()=>{ChooiceCat(5)}}>
                <i className='bi bi-basket3-fill fs-5 me-3'></i>
                <span >Orders</span>
            </a>
            <a className='list-group-item py-2 my-1' onClick={()=>{ChooiceCat(6)}}>
                <FontAwesomeIcon icon={faComment} className='fs-5 me-3' />
                <span >Feedbacks</span>
            </a>
        </div>
    </div>
  )
}