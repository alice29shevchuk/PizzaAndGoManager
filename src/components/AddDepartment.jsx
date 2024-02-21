import React from 'react';

export class AddDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Pizza Day #',
            selectedCity: '', 
            latitude: '',
            longitude: '',
            isValidLatitude: false, 
            isValidLongitude: false,
            data: this.props.recordsCity,
            errorDepartmentAddress:true
        };
    }
    // handleTitleChange = (e) => {
    //     this.setState({ name: e.target.value });
    // };

    handleCityChange = (e) => {
        this.setState({ selectedCity: e.target.value });
        console.log(e.target.value);
    };
    handleTitleChange = (e) => {
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
                    this.setState({ errorDepartmentAddress: true});

                } else {
                    console.log("Корректный формат:", newValue);
                    this.setState({ errorDepartmentAddress: false});
                }
            } else {
                console.log("Некорректный формат:", newValue);
                this.setState({ errorDepartmentAddress: true});
            }
            this.setState({ name: e.target.value });
        }
    };
    // handleLatitudeChange = (e) => {
    //     const value = e.target.value;
    //     if (!isNaN(value)) {
    //         const isValid = /^-?\d{1,2}(?:\.\d{5,5})?$/.test(value);
    //         this.setState({ latitude: value, isValidLatitude: isValid });
    //         console.log('Latitude: '+this.state.isValidLatitude);
    //         console.log('Longitude: '+this.state.isValidLongitude);
    //     }
    // };
    handleLatitudeChange = (e) => {
        const value = e.target.value;
        let isValid = false;
    
        if (value.length >= 3) {
            isValid = /^-?\d{1,2}(?:\.\d{5,5})?$/.test(value);
        }
    
        this.setState({ 
            latitude: value, 
            isValidLatitude: isValid 
        });
        console.log('Latitude: ' + isValid);
        console.log('Longitude: ' + this.state.isValidLongitude);
    };
    
    
    // handleLongitudeChange = (e) => {
    //     const value = e.target.value;
    //     if (!isNaN(value)) {
    //         const isValid = /^-?\d{1,2}(?:\.\d{5,5})?$/.test(value);
    //         this.setState({ longitude: value, isValidLongitude: isValid });
    //         console.log('Longitude: '+this.state.isValidLongitude);
    //         console.log('Latitude: '+this.state.isValidLatitude);
    //     }
    // };
    handleLongitudeChange = (e) => {
        const value = e.target.value;
        let isValid = false;
    
        if (value.length >= 3) {
            isValid = /^-?\d{1,2}(?:\.\d{5,5})?$/.test(value);
        }
    
        this.setState({ 
            longitude: value, 
            isValidLongitude: isValid 
        });
        console.log('Longitude: ' + isValid);
        console.log('Latitude: ' + this.state.isValidLatitude);
    };
    
    render() {
        // const isTitleEntered = this.state.name.trim() != '';
        const isCitySelected = this.state.selectedCity != '';
        const isFormValid = !this.state.errorDepartmentAddress && isCitySelected && this.state.isValidLatitude && this.state.isValidLongitude;
        return (
            <div className='full-item'>
                <div style={{display:'grid'}}>
                    <h3>Add Department</h3>
                    <input
                        className='inp-admin'
                        type='text'
                        placeholder='Name'
                        value={this.state.name}
                        onChange={this.handleTitleChange}
                    />
                    {this.state.errorDepartmentAddress && <span style={{ color: 'red', display: 'block', marginTop: '-20px', fontSize: '14px' }}>Заполните адрес корректно...</span>}
                    <select className='inp-admin' value={this.state.selectedCity} onChange={(e) => {this.handleCityChange(e)}}>
                        <option value=''>Выберите город</option>
                        {this.state.data.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>
                    {!isCitySelected && <span style={{ color: 'red', display: 'block', marginTop: '-15px', fontSize: '14px' }}>Выберите город...</span>}
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
