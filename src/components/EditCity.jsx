import React, { useState } from 'react'

export default function EditCity(props) {
    const [newtitle,setNewTitle] = useState(props.titleNow)
    const [errorCityName,setErrorCityName] = useState(false)
    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      setNewTitle(inputValue);
      if (inputValue.trim() === '' || inputValue.length <= 3) {
        setErrorCityName(true);
      } else {
        setErrorCityName(false);
      }
  };
  return (
    <div className='full-item'>
    <div>
        <h3>Edit City</h3>
        <div style={{display:'grid'}}>
          <input className='inp-admin' type='text' placeholder='Name' value={newtitle} onChange={handleInputChange}></input>
          {errorCityName && <span style={{ color: 'red', fontSize: 14,marginTop:-15 }}>Заполните это поле...</span>}
        </div>
        <button style={{width:100, borderRadius:10, background: errorCityName ? 'gray' : 'green', cursor: errorCityName ? 'not-allowed' : 'pointer'}} className='addToBucket' disabled={errorCityName} onClick={() => {props.editCity(props.id,newtitle);props.setEdit()}  }>Edit</button>
        <div style={{width:100, borderRadius:10,marginRight:'20%'}} className='addToBucket' onClick={()=>props.setEdit()} >Close</div>
    </div>
</div>
  )
}