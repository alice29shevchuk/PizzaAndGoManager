import React, { useState } from 'react'

export default function EditDepartment(props) {
    const [newtitle,setNewTitle] = useState(props.titleNow)
  return (
    <div className='full-item'>
    <div>
        <h3>Edit Department</h3>
        <input className='inp-admin' type='text' placeholder='Name' value={newtitle} onChange={(e)=> setNewTitle(e.target.value)}></input>
        <div style={{width:100, borderRadius:10,background:'green'}} className='addToBucket' onClick={() => {props.editDepartment(props.id,newtitle);props.setEdit()}  }>Edit</div>
        <div style={{width:100, borderRadius:10,marginRight:'20%'}} className='addToBucket' onClick={()=>props.setEdit()} >Close</div>
    </div>
</div>
  )
}