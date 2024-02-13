import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
export default function Sidebar({ChooiceCat}) {
  return (
    <div className='bg-white sidebar p-2'>
        <div className='m-2'>
            <FontAwesomeIcon icon={faPizzaSlice} className='me-2 fs-6' />
            <span className='brand-name fs-6'>Pizza and Go</span>
        </div>
        <hr className='text-dark'></hr>
        <div className='list-group list-group-flush'>
            {/* Компоненты меню  */}
            <a className='list-group-item py-2 my-1' onClick={()=>{ChooiceCat(1)}}>
                <i className='bi bi-speedometer2 fs-5 me-3'></i>
                <span>Dashboard</span>
            </a>
            <a className='list-group-item py-2 my-1' onClick={()=>{ChooiceCat(2)}}>
                <i className='bi bi-card-checklist fs-5 me-3'></i>
                <span>Categories</span>
            </a>
            <a className='list-group-item py-2 my-1'  onClick={()=>{ChooiceCat(3)}}>
                <i className='bi bi-table fs-5 me-3'></i>
                <span >Pizzas</span>
            </a>
            <a className='list-group-item py-2 my-1'  onClick={()=>{ChooiceCat(4)}}>
                <i className='bi bi-people fs-5 me-3'></i>
                <span >Cities / Departments</span>
            </a>
            <a className='list-group-item py-2 my-1'  onClick={()=>{ChooiceCat(5)}}>
                <i className='bi bi-basket3-fill fs-5 me-3'></i>
                <span >Orders</span>
            </a>
            {/* <a className='list-group-item py-2 my-1' onClick={()=>{sessionStorage.clear(); window.location.assign('/')}}>
                <i className='bi bi-power fs-5 me-3'></i>
                <span >Logout</span>
            </a> */}
        </div>
    </div>
  )
}