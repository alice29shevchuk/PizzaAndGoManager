import React, { useState } from 'react'

export default function EditCategory(props) {
    const [newtitle,setNewTitle] = useState(props.titleNow)
    const [errorTitle,setErrorTitle] = useState(false);
    const handleChange = (e) => {
      const title = e.target.value;
      if (title.trim() !== '' && title.length > 3) {
        setErrorTitle(false);
      } else {
        setErrorTitle(true);
      }
      setNewTitle(title);
  };
  return (
    <div className='full-item'>
    <div>
        <h3>Edit Category</h3>
        <div style={{display:'grid',flexDirection:'column'}}>
          <input className='inp-admin' type='text' placeholder='Title' value={newtitle} onChange={handleChange}></input>
          {errorTitle && <span style={{ color: 'red',fontSize:14,marginTop:-15}}>Заполните это поле...</span>}
        </div>
        {/* <div style={{width:100, borderRadius:10,background:'green'}} className='addToBucket' onClick={() => {props.editCategory(props.id,newtitle);props.setEdit()}  }>Edit</div> */}
        {errorTitle ? (
          <button style={{width:100, borderRadius:10,background:'lightgray',cursor:'not-allowed'}} className='addToBucket' disabled={errorTitle} onClick={() => {props.editCategory(props.id,newtitle);props.setEdit()}  }>Edit</button>
        )
        :(
          <button style={{width:100, borderRadius:10,background:'green'}} className='addToBucket' onClick={() => {props.editCategory(props.id,newtitle);props.setEdit()}  }>Edit</button>
        )
      }
        <div style={{width:100, borderRadius:10,marginRight:'20%'}} className='addToBucket' onClick={()=>props.setEdit()} >Close</div>
    </div>
</div>
  )
}