// import React, { Component } from 'react';
// import  useState  from 'react';

// export class AddCategory extends React.Component {
//     constructor(props){
//         super(props)
//         this.state={
//             title:''
//         }   
//     }
//     render() {
//         return (
//             <div className='full-item'>
//                 <div>
//                     <h3>Add Category</h3>
//                     <input className='inp-admin' type='text' placeholder='Title' onChange={(e)=> this.state.title = e.target.value}></input>
//                     <div style={{width:100, borderRadius:10,background:'green'}} className='addToBucket' onClick={() => this.props.addcat(this.state.title)  }>Add</div>
//                     <div style={{width:100, borderRadius:10,marginRight:'20%'}} className='addToBucket' onClick={()=>this.props.isShow()} >Close</div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default AddCategory;

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
        const isTitleEntered = this.state.title.trim() !== ''; // Проверяем, введено ли что-то в поле title
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
                            background: isTitleEntered ? 'green' : 'lightgray', // Зеленый цвет, если введен заголовок, и серый, если нет
                            cursor: isTitleEntered ? 'pointer' : 'not-allowed' // Устанавливаем стандартный курсор, если кнопка не активна
                        }}
                        className='addToBucket'
                        onClick={isTitleEntered ? () => this.props.addcat(this.state.title) : null} // Вызываем addcat только если заголовок введен
                    >
                        Add
                    </div>
                    {!isTitleEntered && <span style={{ color: 'red',display:'block',marginTop:'-15px',fontSize:'14px' }}>Введите название категории</span>}
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
