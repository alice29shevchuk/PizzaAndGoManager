import React, { Component } from 'react';

export class AddCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleTitleChange = (e) => {
        this.setState({ name: e.target.value });
    };

    render() {
        const isTitleEntered = this.state.name.trim() !== '' &&  this.state.name.trim().length > 3;
        return (
            <div className='full-item'>
                <div>
                    <h3>Add City</h3>
                    <input
                        className='inp-admin'
                        type='text'
                        placeholder='Name'
                        value={this.state.name}
                        onChange={this.handleTitleChange}
                    />
                    <div
                        style={{
                            width: 100,
                            borderRadius: 10,
                            background: isTitleEntered ? 'green' : 'lightgray', 
                            cursor: isTitleEntered ? 'pointer' : 'not-allowed'
                        }}
                        className='addToBucket'
                        onClick={isTitleEntered ? () => this.props.addCity(this.state.name) : null}
                    >
                        Add
                    </div>
                    {!isTitleEntered && <span style={{ color: 'red',display:'block',marginTop:'-15px',fontSize:'14px' }}>Введите название города...</span>}
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

export default AddCity;
