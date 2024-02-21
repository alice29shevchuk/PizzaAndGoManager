import React, { useState } from 'react'

export default function EditDepartment(props) {
    const [newtitle,setNewTitle] = useState(props.titleNow)
    const [errorDepartmentAddress,setErrorDepartmentAddress] = useState(false)

  //   const handleTitleChange = (e) => {
  //     const inputValue = e.target.value;
  //     const pizzaDayIndex = inputValue.indexOf("Pizza Day #");
  //     if (pizzaDayIndex >= 0) {
  //         const startIndex = pizzaDayIndex + "Pizza Day #".length;
  //         const newValue = inputValue.substring(0, startIndex) + inputValue.substring(startIndex).replace(/^\s+/g, '');
  //         setNewTitle(newValue);
  //     }
  // };


  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    const pizzaDayIndex = inputValue.indexOf("Pizza Day #");

    if (pizzaDayIndex >= 0) {
        const startIndex = pizzaDayIndex + "Pizza Day #".length;
        const newValue = inputValue.substring(0, startIndex) + inputValue.substring(startIndex).replace(/^\s+/, '');

        const parts = newValue.split(',');
        if (parts.length === 3) {
            const part1 = parts[0].trim();
            const part2 = parts[1].trim();
            const part3 = parts[2].trim();

            const isValidFormat = part1.startsWith("Pizza Day #") && /^\d*[1-9]\d*$/.test(part1.substring("Pizza Day #".length).trim()) &&
            (part2.startsWith("ул.") || part2.startsWith("пр-т.") || part2.startsWith("пер.")) &&
            /^[A-ZА-ЯЁ][a-zа-яё]+(?:[-\s][A-ZА-ЯЁa-zа-яё]+)*$/.test(part2.substring(part2.indexOf('.') + 1).trim()) &&
            /^\d+[а-яА-ЯЁё]*([-/]\d+[а-яА-ЯЁё]*)?(?:\s?[А-ЯЁа-яё]\b[.,-]?)?$/.test(part3.trim());

            if (!isValidFormat) {
                console.log("Некорректный формат:", newValue);
                setErrorDepartmentAddress(true);
            } else {
                console.log("Корректный формат:", newValue);
                setErrorDepartmentAddress(false);
            }
        } else {
            console.log("Некорректный формат:", newValue);
            setErrorDepartmentAddress(true);
        }

        setNewTitle(newValue);
    }
};

  return (
    <div className='full-item'>
    <div>
        <h3>Edit Department</h3>
        <div style={{display:'grid'}}>
          {/* <input className='inp-admin' type='text' placeholder='Name' value={newtitle} onChange={(e)=> setNewTitle(e.target.value)}></input> */}
          <input className='inp-admin' type='text' placeholder='Name' value={newtitle} onChange={handleTitleChange}></input>
          {errorDepartmentAddress && (
            <div style={{display:'grid'}}>
              <span style={{ color: 'red', fontSize: '14px',marginTop:-15 }}>Пожалуйста введите адрес корректно...</span>
              <span style={{ color: 'red', fontSize: '14px' }}>Пример: Pizza Day #1, ул. Калиновая, 82</span>
            </div>
          )}
        </div>
        <button style={{width:100, borderRadius:10,background: errorDepartmentAddress ? 'gray' : 'green', cursor: errorDepartmentAddress ? 'not-allowed' : 'pointer'}} disabled={errorDepartmentAddress} className='addToBucket' onClick={() => {props.editDepartment(props.id,newtitle);props.setEdit()}  }>Edit</button>
        <div style={{width:100, borderRadius:10,marginRight:'20%'}} className='addToBucket' onClick={()=>props.setEdit()} >Close</div>
    </div>
</div>
  )
}