import React, { Component } from 'react'
import axios from 'axios'
import {Pizza} from '../componentsModel/Pizza'

export default class EditProduct extends React.Component {
    constructor(props) {
        super(props)
            
        this.state = {
            pizza:new Pizza(
                this.props.id,
                this.props.img,
                this.props.title,
                this.props.price,
                this.props.category,
                this.props.rating,
                this.props.weight,
                this.props.ingredients,
                this.props.sauce,
                this.props.ingredientsAdd,
                this.props.ingredientsExcept,
                this.props.isPopular
            ),
            newIngredientName: '', 
            isAddingNewIngredient: false,
            isEditingIngredient:false,
        }
        this.ChangeCategory = this.ChangeCategory.bind(this)
        this.ChangeISPopular = this.ChangeISPopular.bind(this)
        this.Editproduct = this.Editproduct.bind(this)
    }
    render() {
        return (
            <div className='full-item'>
                <div>
                    <h3>Изменение продукта</h3>
                    <div className='add-product'>
                        <img src={this.state.pizza.imageUrl}></img>
                        {/* <input type='file' onChange={(e)=> {
                            const data = new FormData()
                            data.append('file',e.target.files[0])
                             axios.post(`https://localhost:7031/api/AWS/upload-file-to-aws`,data)
                                .then(res => {
                                    this.setState({img: `https://ishopbucket.s3.eu-west-2.amazonaws.com/${e.target.files[0].name}`})
                                })
                        }} /> */}
                        <input type='text' placeholder='Title...' value={this.state.pizza.title} onChange={(e)=> this.setState({title:e.target.value})}></input>
                        <input type='text' min={200} max={800} placeholder='Weight...' value={this.state.pizza.weight} onChange={(e)=> this.setState({weight:e.target.value})}></input>
                        <input min={0} type='number' placeholder='Price...' value={this.state.pizza.price} onChange={(e)=> this.setState({price:e.target.value})}></input>
                        <select onChange={(e) => this.ChangeCategory(e.target.pizza.value)}>
                            {this.props.dataCategory.map((el) => (
                                <option key={el.id} value={el.title} selected={el.id === this.state.pizza.category}>{el.title}</option>
                            ))}
                        </select>
                        <input type='text' placeholder='Rating...' value={this.state.pizza.rating} onChange={(e)=> this.setState({rating:e.target.value})}></input>
                        <input type='text' placeholder='Sauce...' value={this.state.pizza.sauce} onChange={(e)=> this.setState({sauce:e.target.value})}></input>
                        {/* <div>
                            <label>Ингредиенты: </label>
                            <button onClick={this.handleAddNewIngredient}>Add New Ingredient</button>
                            {this.state.pizza.ingredients.map((ingredient,index)=>(
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <li key={index}>{ingredient.name}</li>
                                    <div>
                                        <button onClick={() => this.handleEditIngredient(index)}>Edit</button>
                                        <button onClick={() => this.handleDeleteIngredient(index)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                        <div className='ingredients-container'>
                            <label>Ингредиенты: </label>
                            <button className='add-ingredient-button' onClick={this.handleAddNewIngredient}>Add New Ingredient</button>
                            {this.state.pizza.ingredients.map((ingredient, index) => (
                                <div className='ingredient-item' key={index}>
                                    <span className='ingredient-name'>{ingredient.name}</span>
                                    <div className='ingredient-buttons'>
                                        <button onClick={() => this.handleEditIngredient(index)}>Edit</button>
                                        <button onClick={() => this.handleDeleteIngredient(index)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            {this.state.isAddingNewIngredient || this.state.isEditingIngredient ? (
                            <div className='add-new-ingredient'>
                                <input type='text' placeholder='Введите название ингредиента...' value={this.state.newIngredientName} onChange={(e) => this.setState({ newIngredientName: e.target.value })} />
                                <button onClick={this.state.isEditingIngredient ? this.handleSaveEditedIngredient : this.handleSaveNewIngredient}>
                                    {this.state.isEditingIngredient ? 'Save Edit' : 'Save New'}
                                </button>
                                <button onClick={this.handleCancelEdit}>Cancel</button>
                        </div>) : null}
                        </div>
                        
                        {this.state.pizza.isPopular == 1 && (
                            <select onChange={(e)=>{this.ChangeISPopular(e.target.value)}}>
                                <option selected>True</option>
                                <option>False</option>
                            </select>
                        )}
                        {this.state.isPopular == 0 && (
                            <select onChange={(e)=>{this.ChangeISPopular(e.target.value)}}>
                                <option>True</option>
                                <option selected>False</option>
                            </select>
                        )}
                    </div>
                    <div style={{ width: 100, borderRadius: 10, background: 'green' }} className='addToBucket' onClick={()=>{this.Editproduct()}}>Save</div>
                    <div style={{ width: 100, borderRadius: 10, marginRight: '20%' }} className='addToBucket' onClick={() => this.props.isShow()} >Close</div>
                </div>
            </div>
        )
    }
    ChangeCategory(title){
        for (const iterator of this.props.dataCategory) {
            if(iterator.title === title){
                this.setState({idCat: iterator.id})
                console.log(title);
            }
        }
    }
    ChangeISPopular(text){
        if(text === "True"){
            this.setState({isPopular: 1})
        }
        else if( text === "False"){
            this.setState({isPopular: 0})
        }
    };
    handleAddNewIngredient = () => {
        this.setState({
            isAddingNewIngredient: true,
            newIngredientName: '',
        });
    };
    handleSaveNewIngredient = () => {
        if (this.state.newIngredientName.trim() !== '') {
            const newIngredient = { name: this.state.newIngredientName.trim() };
            this.setState((prevState) => ({
                pizza: {
                    ...prevState.pizza,
                    ingredients: [...prevState.pizza.ingredients, newIngredient],
                },
                newIngredientName: '',
                isAddingNewIngredient: false,
            }));
        } else {
            alert('Please enter the name of the new ingredient before saving.');
        }
    };
    
    handleDeleteIngredient = (index) => {
        const updatedIngredients = [...this.state.pizza.ingredients];
        updatedIngredients.splice(index, 1);
        console.log(updatedIngredients);
        this.setState({
            pizza: {
                ...this.state.pizza,
                ingredients: updatedIngredients,
            },
        });
        console.log(this.state.pizza.ingredients);
    };
      
      
    handleEditIngredient = (index) => {
        const editedIngredient = this.state.pizza.ingredients[index].name;
    
        this.setState({
            isEditingIngredient: true,
            editingIngredientIndex: index,
            newIngredientName: editedIngredient,
        });
    };

    handleSaveEditedIngredient = () => {
        const editedIngredients = [...this.state.pizza.ingredients];
        editedIngredients[this.state.editingIngredientIndex].name = this.state.newIngredientName;
    
        this.setState({
            pizza: {
                ...this.state.pizza,
                ingredients: editedIngredients,
            },
            isEditingIngredient: false,
            newIngredientName: '',
            editingIngredientIndex: null,
        });
    };
    
    handleCancelEdit = () => {
        this.setState({
            isEditingIngredient: false,
            isAddingNewIngredient:false,
            newIngredientName: '',
            editingIngredientIndex: null,
        });
    };
    
    
    
    async Editproduct(){
        const json =  this.state.pizza;
        await axios.post(`http://alisa000077-001-site1.htempurl.com/api/Pizza/UpdatePizza`, json)
            .then(res => {
        })
        // this.props.updateProduct(this.state.id,this.state.img,this.state.title,this.state.weight,this.state.price,this.state.idCat,this.state.rating,this.state.sauce,this.state.isPopular)
        this.props.getProducts()
        this.props.isShow()
    }
}