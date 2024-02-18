import React, { useState } from 'react';

export default function EditFeedback(props) {
    const [isShow, setIsShow] = useState(props.show);

    const handleInputChange = (e) => {
        setIsShow(e.target.value === 'true');
    };

    return (
        <div className='full-item'>
            <div>
                <h3>Edit Feedback</h3>
                <select value={isShow} onChange={handleInputChange}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <div style={{ width: 100, borderRadius: 10, background: 'green' }} className='addToBucket' onClick={() => { props.editFeedback(props.id, isShow); props.setEdit() }}>Edit</div>
                <div style={{ width: 100, borderRadius: 10, marginRight: '20%' }} className='addToBucket' onClick={() => props.setEdit()}>Close</div>
            </div>
        </div>
    );
}
