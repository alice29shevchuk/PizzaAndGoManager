import React, { Component } from 'react'
import axios from 'axios'
import {Pizza} from '../componentsModel/Pizza'
import { Ingredient } from '../componentsModel/Ingredient'
import { IngredientsAddItem } from '../componentsModel/IngredientsAddItem'
import { IngredientsExcept } from '../componentsModel/IngredientsExcept'

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
            // dataCategory:[],
            newIngredientName: '', 
            isAddingNewIngredient: false,
            isEditingIngredient:false,
            isListIngredientsIsOpen:false,

            newIngredientAddName: '', 
            newIngredientAddPrice: 0, 
            isAddingNewIngredientAdd: false,
            isEditingIngredientAdd:false,
            isListIngredientsAddIsOpen:false,


            newIngredientExceptName: '', 
            isAddingNewIngredientExcept: false,
            isEditingIngredientExcept:false,
            isListIngredientsExceptIsOpen:false,
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
                        <input type='text' placeholder='Title...' value={this.state.pizza.title} onChange={(e) => this.setState(prevState => ({
                            pizza: {
                            ...prevState.pizza,
                            title: e.target.value
                        }}))}></input>
                        <input type='text' min={200} max={800} placeholder='Weight...' value={this.state.pizza.weight} onChange={(e) => this.setState(prevState => ({
                            pizza: {
                            ...prevState.pizza,
                            weight: e.target.value
                        }}))}></input>
                        <input min={0} type='number' placeholder='Price...' value={this.state.pizza.price} onChange={(e) => this.setState(prevState => ({
                            pizza: {
                            ...prevState.pizza,
                            price: e.target.value
                        }}))}></input>
                        <select onChange={(e) => this.ChangeCategory(e.target.value)}>
                            {this.props.dataCategory.map((el) => (
                                <option key={el.id} value={el.title} selected={el.id === this.state.pizza.category}>{el.title}</option>
                            ))}
                        </select>
                        <input type='text' placeholder='Rating...' value={this.state.pizza.rating} onChange={(e) => this.setState(prevState => ({
                            pizza: {
                            ...prevState.pizza,
                            rating: e.target.value
                        }}))}></input>
                        <input type='text' placeholder='Sauce...' value={this.state.pizza.sauce} onChange={(e) => this.setState(prevState => ({
                            pizza: {
                            ...prevState.pizza,
                            sauce: e.target.value
                        }}))}></input>
                        <div className='ingredients-container'>
                            <div className='ingredients-open-close'>
                                <label>Ингредиенты: </label>
                                {!this.state.isListIngredientsIsOpen ? ( 
                                    <button onClick={this.handleListIngredientsIsOpen}>&#9660;</button>
                                ):(
                                    <button onClick={this.handleListIngredientsIsClose}>&#11198;</button>
                                )
                                }
                            </div>
                            {this.state.isListIngredientsIsOpen && (
                            <div>
                                <button className='add-ingredient-button' onClick={this.handleAddNewIngredient}>+</button>
                                {this.state.pizza.ingredients.map((ingredient, index) => (
                                    <div className='ingredient-item' key={index}>
                                        <span className='ingredient-name'>{ingredient.name}</span>
                                        <div className='ingredient-buttons'>
                                            <button onClick={() => this.handleEditIngredient(index)}>Edit</button>
                                            <button onClick={() => this.handleDeleteIngredient(index)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
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
                            </div>
                            )}
                        </div>
                        {/* ingredients-add */}
                        <div className='ingredients-container'>
                            <div className='ingredients-open-close'>
                            <label>Ингредиенты для добавления: </label>
                                {!this.state.isListIngredientsAddIsOpen ? ( 
                                    <button onClick={this.handleListIngredientsAddIsOpen}>&#9660;</button>
                                ):(
                                    <button onClick={this.handleListIngredientsAddIsClose}>&#11198;</button>
                                )
                                }
                            </div>
                            {this.state.isListIngredientsAddIsOpen && (
                            <div>
                                <button className='add-ingredient-button' onClick={this.handleAddNewIngredientAdd}>+</button>
                                    {this.state.pizza.ingredientsAdd.map((ingredient, index) => (
                                        <div className='ingredient-item' key={index}>
                                            <span className='ingredient-name'>{ingredient.name}</span>
                                            <span className='ingredient-price'>{ingredient.price}</span>
                                            <div className='ingredient-buttons'>
                                                <button onClick={() => this.handleEditIngredientAdd(index)}>Edit</button>
                                                <button onClick={() => this.handleDeleteIngredientAdd(index)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                 <div>
                                    {this.state.isAddingNewIngredientAdd || this.state.isEditingIngredientAdd ? (
                                    <div className='add-new-ingredient'>
                                        <input type='text' placeholder='Введите название ингредиента для добавления...' value={this.state.newIngredientAddName} onChange={(e) => this.setState({ newIngredientAddName: e.target.value })} />
                                        <input type='number' placeholder='Введите цену ингредиента для добавления...' value={this.state.newIngredientAddPrice} onChange={(e) => this.setState({ newIngredientAddPrice: e.target.value })} />

                                        <button onClick={this.state.isEditingIngredientAdd ? this.handleSaveEditedIngredientAdd : this.handleSaveNewIngredientAdd}>
                                            {this.state.isEditingIngredientAdd ? 'Save Edit' : 'Save New'}
                                        </button>
                                        <button onClick={this.handleCancelEditAdd}>Cancel</button>
                                    </div>) : null}
                                </div>
                            </div>
                            )}
                        </div>
                        
                        {/* ingredients-except */}
                        <div className='ingredients-container'>
                            <div className='ingredients-open-close'>
                            <label>Ингредиенты для исключения: </label>
                                {!this.state.isListIngredientsExceptIsOpen ? ( 
                                    <button onClick={this.handleListIngredientsExceptIsOpen}>&#9660;</button>
                                ):(
                                    <button onClick={this.handleListIngredientsExceptIsClose}>&#11198;</button>
                                )
                                }
                            </div>
                            {this.state.isListIngredientsExceptIsOpen && (
                            <div>
                                <button className='add-ingredient-button' onClick={this.handleAddNewIngredientExcept}>+</button>
                                    {this.state.pizza.ingredientsExcepts.map((ingredient, index) => (
                                        <div className='ingredient-item' key={index}>
                                            <span className='ingredient-name'>{ingredient.name}</span>
                                            <div className='ingredient-buttons'>
                                                <button onClick={() => this.handleEditIngredientExcept(index)}>Edit</button>
                                                <button onClick={() => this.handleDeleteIngredientExcept(index)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                 <div>
                                    {this.state.isAddingNewIngredientExcept || this.state.isEditingIngredientExcept ? (
                                    <div className='add-new-ingredient'>
                                        <input type='text' placeholder='Введите название ингредиента для исключения...' value={this.state.newIngredientExceptName} onChange={(e) => this.setState({ newIngredientExceptName: e.target.value })} />

                                        <button onClick={this.state.isEditingIngredientExcept ? this.handleSaveEditedIngredientExcept : this.handleSaveNewIngredientExcept}>
                                            {this.state.isEditingIngredientExcept ? 'Save Edit' : 'Save New'}
                                        </button>
                                        <button onClick={this.handleCancelEditExcept}>Cancel</button>
                                    </div>) : null}
                                </div>
                            </div>
                            )}
                        </div>

                        {this.state.pizza.isPopular == true && (
                            <select onChange={(e)=>{this.ChangeISPopular(e.target.value)}}>
                                <option selected>True</option>
                                <option>False</option>
                            </select>
                        )}
                        {this.state.pizza.isPopular == false && (
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
                this.setState(prevState => ({
                    pizza: {
                        ...prevState.pizza,
                        category: iterator.id
                    }}))
            }
        }
    }
    ChangeISPopular(text){
        if(text === "True"){
            this.setState(prevState => ({
                pizza: {
                    ...prevState.pizza,
                    isPopular: true
                }}))
        }
        else if( text === "False"){
            this.setState(prevState => ({
                pizza: {
                    ...prevState.pizza,
                    isPopular: false
                }}))
        }
    };

    handleListIngredientsIsOpen=()=>{
        this.setState({
            isListIngredientsIsOpen:true,
        });
    };
    handleListIngredientsIsClose=()=>{
        this.setState({
            isListIngredientsIsOpen:false,
            
            isEditingIngredient: false,
            isAddingNewIngredient:false,
            newIngredientName: '',
            editingIngredientIndex: null,
        });
    };

    
    handleListIngredientsAddIsOpen=()=>{
        this.setState({
            isListIngredientsAddIsOpen:true,
        });
    };
    handleListIngredientsAddIsClose=()=>{
        this.setState({
            isListIngredientsAddIsOpen:false,

            isEditingIngredientAdd: false,
            isAddingNewIngredientAdd:false,
            newIngredientAddName: '',
            newIngredientAddPrice:0,
            editingIngredientIndex: null,
        });
    };

    handleListIngredientsExceptIsOpen=()=>{
        this.setState({
            isListIngredientsExceptIsOpen:true,
        });
    };
    handleListIngredientsExceptIsClose=()=>{
        this.setState({
            isListIngredientsExceptIsOpen:false,
            
            isEditingIngredientExcept: false,
            isAddingNewIngredientExcept:false,
            newIngredientExceptName: '',
            editingIngredientIndex: null,
        });
    };


    handleAddNewIngredient = () => {
        this.setState({
            isAddingNewIngredient: true,
            newIngredientName: '',
        });
    };
    handleAddNewIngredientAdd = () => {
        this.setState({
            isAddingNewIngredientAdd: true,
            newIngredientAddName: '',
            newIngredientAddPrice: 0
        });
    };
    handleAddNewIngredientExcept = () => {
        this.setState({
            isAddingNewIngredientExcept: true,
            newIngredientExceptName: '',
        });
    };

    handleSaveNewIngredient = () => {
        if (this.state.newIngredientName.trim() !== '') {
            const newIngredient = { name: this.state.newIngredientName.trim() };
            this.state.pizza.ingredients = [...this.state.pizza.ingredients,new Ingredient(0, newIngredient.name, this.state.pizza.id)];
            this.setState((prevState) => ({
                // pizza: {
                //     ...prevState.pizza.AddNewIngredient(newIngredient.name),
                //     // ingredients: [...prevState.pizza.ingredients, newIngredient],
                // },
                newIngredientName: '',
                isAddingNewIngredient: false,
            }));
            // this.state.pizza.AddNewIngredient(newIngredient.name);

        } else {
            alert('Please enter the name of the new ingredient before saving.');
        }
    };
    handleSaveNewIngredientAdd = () => {
        if (this.state.newIngredientAddName.trim() !== '' && this.state.newIngredientAddPrice.trim() !== 0) {
            const newIngredient = { name: this.state.newIngredientAddName.trim(), price: parseInt(this.state.newIngredientAddPrice) };
            // this.state.pizza.AddNewIngredientAdd(newIngredient.name, newIngredient.price);
            this.state.pizza.ingredientsAdd = [...this.state.pizza.ingredientsAdd,new IngredientsAddItem(0, newIngredient.name,newIngredient.price, this.state.pizza.id)];
            this.setState((prevState) => ({
                // pizza: {
                //     ...prevState.pizza,
                //     ingredients: [...prevState.pizza.ingredients, newIngredient],
                // },
                newIngredientAddName: '',
                newIngredientAddPrice: 0,
                isAddingNewIngredientAdd: false,
            }));
        } else {
            alert('Please enter the name and price of the new ingredient before saving.');
        }
    };
    handleSaveNewIngredientExcept = () => {
        if (this.state.newIngredientExceptName.trim() !== '') {
            const newIngredient = { name: this.state.newIngredientExceptName.trim() };
            // this.state.pizza.AddNewIngredientExcept(newIngredient.name);
            this.state.pizza.ingredientsExcepts = [...this.state.pizza.ingredientsExcepts,new IngredientsExcept(0, newIngredient.name, this.state.pizza.id)];
            this.setState((prevState) => ({
                newIngredientExceptName: '',
                isAddingNewIngredientExcept: false,
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
    handleDeleteIngredientAdd = (index) => {
        const updatedIngredients = [...this.state.pizza.ingredientsAdd];
        updatedIngredients.splice(index, 1);
        console.log(updatedIngredients);
        this.setState({
            pizza: {
                ...this.state.pizza,
                ingredientsAdd: updatedIngredients,
            },
        });
        console.log(this.state.pizza.ingredientsAdd);
    };
    handleDeleteIngredientExcept = (index) => {
        const updatedIngredients = [...this.state.pizza.ingredientsExcepts];
        updatedIngredients.splice(index, 1);
        console.log(updatedIngredients);
        this.setState({
            pizza: {
                ...this.state.pizza,
                ingredientsExcepts: updatedIngredients,
            },
        });
        console.log(this.state.pizza.ingredientsExcepts);
    };
      
      
    handleEditIngredient = (index) => {
        const editedIngredient = this.state.pizza.ingredients[index].name;
    
        this.setState({
            isEditingIngredient: true,
            editingIngredientIndex: index,
            newIngredientName: editedIngredient,
        });
    };
    handleEditIngredientAdd = (index) => {
        const editedIngredientName = this.state.pizza.ingredientsAdd[index].name;
        const editedIngredientPrice = this.state.pizza.ingredientsAdd[index].price;
        this.setState({
            isEditingIngredientAdd: true,
            editingIngredientIndex: index,
            newIngredientAddName: editedIngredientName,
            newIngredientAddPrice: editedIngredientPrice
        });
    };
    handleEditIngredientExcept = (index) => {
        const editedIngredient = this.state.pizza.ingredientsExcepts[index].name;
    
        this.setState({
            isEditingIngredientExcept: true,
            editingIngredientIndex: index,
            newIngredientExceptName: editedIngredient,
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
    handleSaveEditedIngredientAdd = () => {
        const editedIngredients = [...this.state.pizza.ingredientsAdd];
        editedIngredients[this.state.editingIngredientIndex].name = this.state.newIngredientAddName;
        editedIngredients[this.state.editingIngredientIndex].price = this.state.newIngredientAddPrice;
    
        this.setState({
            pizza: {
                ...this.state.pizza,
                ingredientsAdd: editedIngredients,
            },
            isEditingIngredientAdd: false,
            newIngredientAddName: '',
            newIngredientAddPrice:0,
            editingIngredientIndex: null,
        });
    };
    handleSaveEditedIngredientExcept = () => {
        const editedIngredients = [...this.state.pizza.ingredientsExcepts];
        editedIngredients[this.state.editingIngredientIndex].name = this.state.newIngredientExceptName;
    
        this.setState({
            pizza: {
                ...this.state.pizza,
                ingredientsExcept: editedIngredients,
            },
            isEditingIngredientExcept: false,
            newIngredientExceptName: '',
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
    handleCancelEditAdd = () => {
        this.setState({
            isEditingIngredientAdd: false,
            isAddingNewIngredientAdd:false,
            newIngredientAddName: '',
            newIngredientAddPrice:0,
            editingIngredientIndex: null,
        });
    };
    handleCancelEditExcept = () => {
        this.setState({
            isEditingIngredientExcept: false,
            isAddingNewIngredientExcept:false,
            newIngredientExceptName: '',
            editingIngredientIndex: null,
        });
    };
    
    
    async Editproduct(){
        const json =  this.state.pizza;
        console.log(json);
        await axios.post(`http://alisa000077-001-site1.htempurl.com/api/Pizza/UpdatePizza`, json)
            .then(res => {
        })
        this.props.updateProduct(
            this.state.pizza.id,
            this.state.pizza.imageUrl,
            this.state.pizza.title,
            this.state.pizza.weight,
            this.state.pizza.price,
            this.state.pizza.category,
            this.state.pizza.ingredients,
            this.state.pizza.ingredientsAdd,
            this.state.pizza.ingredientsExcepts,
            this.state.pizza.rating,
            this.state.pizza.sauce,
            this.state.pizza.isPopular
            )
        this.props.getProducts()
        this.props.isShow()
    }
}