// import React, { Component } from 'react';

// export class AddDepartment extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: ''
//         };
//     }

//     handleTitleChange = (e) => {
//         this.setState({ name: e.target.value });
//     };

//     render() {
//         const isTitleEntered = this.state.name.trim() !== ''; 
//         return (
//             <div className='full-item'>
//                 <div>
//                     <h3>Add Department</h3>
//                     <input
//                         className='inp-admin'
//                         type='text'
//                         placeholder='Name'
//                         value={this.state.name}
//                         onChange={this.handleTitleChange}
//                     />
//                     <div
//                         style={{
//                             width: 100,
//                             borderRadius: 10,
//                             background: isTitleEntered ? 'green' : 'lightgray', 
//                             cursor: isTitleEntered ? 'pointer' : 'not-allowed' 
//                         }}
//                         className='addToBucket'
//                         onClick={isTitleEntered ? () => this.props.addDepartment(this.state.name) : null} 
//                     >
//                         Add
//                     </div>
//                     {!isTitleEntered && <span style={{ color: 'red',display:'block',marginTop:'-15px',fontSize:'14px' }}>Введите название города</span>}
//                     <div
//                         style={{ width: 100, borderRadius: 10, marginRight: '20%' }}
//                         className='addToBucket'
//                         onClick={() => this.props.isShow()}
//                     >
//                         Close
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default AddDepartment;



import React from 'react';

export class AddDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedCity: '', 
            latitude: '',
            longitude: '',
            isValidLatitude: false, 
            isValidLongitude: false,
            data: this.props.recordsCity 
        };
    }

    handleTitleChange = (e) => {
        this.setState({ name: e.target.value });
    };

    handleCityChange = (e) => {
        this.setState({ selectedCity: e.target.value });
        console.log(e.target.value);
    };

    handleLatitudeChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            const isValid = /^-?\d{1,2}(?:\.\d{5,5})?$/.test(value);
            this.setState({ latitude: value, isValidLatitude: isValid });
            console.log('Latitude: '+this.state.isValidLatitude);
            console.log('Longitude: '+this.state.isValidLongitude);

        }
    };
    
    handleLongitudeChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            const isValid = /^-?\d{1,2}(?:\.\d{5,5})?$/.test(value);
            this.setState({ longitude: value, isValidLongitude: isValid });
            console.log('Longitude: '+this.state.isValidLongitude);
            console.log('Latitude: '+this.state.isValidLatitude);
        }
    };

    render() {
        const isTitleEntered = this.state.name.trim() != '';
        const isCitySelected = this.state.selectedCity != '';
        const isFormValid = isTitleEntered && isCitySelected && this.state.isValidLatitude && this.state.isValidLongitude;
        return (
            <div className='full-item'>
                <div className='add-product'>
                    <h3>Add Department</h3>
                    <input
                        className='inp-admin'
                        type='text'
                        placeholder='Name'
                        value={this.state.name}
                        onChange={this.handleTitleChange}
                    />
                    {!isTitleEntered && <span style={{ color: 'red', display: 'block', marginTop: '-20px',marginBottom:'10px', fontSize: '14px' }}>Заполните название магазина</span>}
                    <select className='inp-admin' value={this.state.selectedCity} onChange={(e) => {this.handleCityChange(e)}}>
                        <option value=''>Выберите город</option>
                        {this.state.data.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>
                    {!isCitySelected && <span style={{ color: 'red', display: 'block', marginTop: '-15px', fontSize: '14px' }}>Выберите город</span>}
                    <input
                        className='inp-admin'
                        type='text'
                        placeholder='Latitude (e.g. 48.51647)'
                        value={this.state.latitude}
                        onChange={this.handleLatitudeChange}
                    />
                    {!this.state.isValidLatitude && <span style={{ color: 'red', display: 'block', marginTop: '-15px', fontSize: '14px' }}>Enter a valid latitude (e.g. 48.51647)</span>}
                    <input
                        className='inp-admin'
                        type='text'
                        placeholder='Longitude (e.g. 29.23456)'
                        value={this.state.longitude}
                        onChange={this.handleLongitudeChange}
                    />
                    {!this.state.isValidLongitude && <span style={{ color: 'red', display: 'block', marginTop: '-15px', fontSize: '14px' }}>Enter a valid longitude (e.g. 29.23456)</span>}
                    <div
                        style={{
                            width: 100,
                            borderRadius: 10,
                            background: isFormValid ? 'green' : 'lightgray', 
                            cursor: isFormValid ? 'pointer' : 'not-allowed'
                        }}
                        className='addToBucket'
                        onClick={isFormValid ? () => this.props.addDepartment(this.state.name, this.state.selectedCity, this.state.latitude, this.state.longitude) : null} // Вызываем addDepartment только если форма заполнена корректно
                    >
                        Add
                    </div>
                    <div
                        style={{ width: 100, borderRadius: 10, marginRight: '20%' }}
                        className='addToBucket'
                        onClick={() => this.props.isShow()}
                    >
                        Close
                    </div>
                </div>
            </div>
        );
    }
}

export default AddDepartment;
