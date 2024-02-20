import React, { Component } from 'react';

export class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    render() {
        const isTitleEntered = this.state.title.trim() !== '' &&  this.state.title.length > 3;
        return (
            <div className='full-item'>
                <div>
                    <h3>Add Category</h3>
                    <input
                        className='inp-admin'
                        type='text'
                        placeholder='Title'
                        value={this.state.title}
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
                        onClick={isTitleEntered ? () => this.props.addcat(this.state.title) : null}
                    >
                        Add
                    </div>
                    {!isTitleEntered && <span style={{ color: 'red',display:'block',marginTop:'-15px',fontSize:'14px' }}>Введите название категории...</span>}
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

export default AddCategory;
