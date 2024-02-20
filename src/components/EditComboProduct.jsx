import React, { Component } from 'react'
import axios from 'axios'
import {Pizza} from '../componentsModel/Pizza'
import { Ingredient } from '../componentsModel/Ingredient'
import { IngredientsAddItem } from '../componentsModel/IngredientsAddItem'
import { IngredientsExcept } from '../componentsModel/IngredientsExcept'

export default class EditComboProduct extends React.Component {
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
                [],
                "",
                [],
                [],
                false
            ),
            baseImage:"https://static-00.iconduck.com/assets.00/pizza-icon-2048x2048-vk14rowe.png",
            errorImageUrl:false,
            errorTitle:false,
            errorDesc:false,
            errorWeight:false,
            errorPrice:false,
            title:this.props.title.split('-')[0],
            description:this.props.title.split('-')[1],
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
                        <img src={this.state.pizza.imageUrl} alt='combo pizza' onLoad={(e)=>{this.handleImageLoad(e)}} onError={(e)=>{this.handleImageError(e)}}></img>
                        <input type='text' placeholder='Image...' value={this.state.pizza.imageUrl} onChange={(e) => this.setState(prevState => ({
                            pizza: {
                            ...prevState.pizza,
                            imageUrl: e.target.value
                        }}))}></input>
                        {this.state.errorImageUrl && 
                        <span style={{ color: 'red',fontSize:14 }}>Ошибка при загрузке фото...</span>
                        }
                        <input type='text' placeholder='Title...' value={this.state.title} 
                        // onChange={(e) => this.setState({title: e.target.value})}
                        onChange={(e) => {
                            if (!/\d/.test(e.target.value) || e.target.value.trim() === '') {
                                this.setState({ title: e.target.value });
                                if (e.target.value.trim() !== '' && e.target.value.length>=5 && e.target.value.length <= 50) {
                                    this.setState({ errorTitle: false });
                                } else {
                                    this.setState({ errorTitle: true });
                                }
                            }
                        }}></input>
                        {this.state.errorTitle && 
                        <span style={{ color: 'red',fontSize:14 }}>Заполните это поле...</span>
                        }
                        <input type='text' placeholder='Description...' value={this.state.description} 
                        // onChange={(e) => this.setState({description: e.target.value})}
                        onChange={(e) => {
                            if (!/\d/.test(e.target.value) || e.target.value.trim() === '') {
                                this.setState({ description: e.target.value });
                                if (e.target.value.trim() !== '' && e.target.value.length>=10 && e.target.value.length <= 50) {
                                    this.setState({ errorDesc: false });
                                } else {
                                    this.setState({ errorDesc: true });
                                }
                            }
                        }}
                        ></input>
                        {this.state.errorDesc && 
                        <span style={{ color: 'red',fontSize:14 }}>Заполните это поле...</span>
                        }
                        <input type='text' placeholder='Weight...' value={this.state.pizza.weight} 
                        // onChange={(e) => this.setState(prevState => ({
                        //     pizza: {
                        //     ...prevState.pizza,
                        //     weight: e.target.value
                        // }}))}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (input.trim() === '') {
                                this.setState({ 
                                    errorWeight: true,
                                    pizza: {
                                        ...this.state.pizza,
                                        weight: input
                                    }
                                });
                            } else if (/^\d+$/.test(input)) { 
                                const num = parseInt(input);
                                if (num < 500 || input.charAt(0) == '0' || num > 2000) {
                                    this.setState({ 
                                        errorWeight: true,
                                        pizza: {
                                            ...this.state.pizza,
                                            weight: input
                                        }
                                    });
                                } else {
                                    this.setState({ 
                                        errorWeight: false,
                                        pizza: {
                                            ...this.state.pizza,
                                            weight: input
                                        }
                                    });
                                }
                            }
                        }}
                        ></input>
                        {this.state.errorWeight && 
                        <span style={{ color: 'red',fontSize:14 }}>Заполните это поле...</span>
                        }
                        <input min={1} max={1000} type='number' placeholder='Price...' value={this.state.pizza.price} 
                        // onChange={(e) => this.setState(prevState => ({
                        //     pizza: {
                        //     ...prevState.pizza,
                        //     price: e.target.value
                        // }}))}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (input.trim() === '') {
                                this.setState({ 
                                    errorPrice: true,
                                    pizza: {
                                        ...this.state.pizza,
                                        price: input
                                    }
                                });
                            } else {
                                const price = parseInt(input);
                                if (price < 100 || input.charAt(0) == '0' || price > 2000) {
                                    this.setState({ 
                                        errorPrice: true,
                                        pizza: {
                                            ...this.state.pizza,
                                            price: input
                                        }
                                    });
                                } else {
                                    this.setState({ 
                                        errorPrice: false,
                                        pizza: {
                                            ...this.state.pizza,
                                            price: input
                                        }
                                    });
                                }
                            }
                        }}
                        ></input>
                        {this.state.errorPrice && 
                        <span style={{ color: 'red',fontSize:14 }}>Заполните это поле...</span>
                        }
                    </div>
                    {this.state.errorImageUrl || this.state.errorTitle || this.state.errorDesc || this.state.errorWeight || this.state.errorPrice ? (
                        <button className='addToBucket' style={{ 
                            width: 100, 
                            borderRadius: 10, 
                            background: 'lightgray', 
                            color: '#fff',
                            cursor: 'not-allowed',
                            fontWeight: 600
                        }} 
                        disabled={this.state.errorImageUrl}>
                            Save
                        </button>
                    ) : (
                        <button className='addToBucket' style={{ 
                            width: 100, 
                            borderRadius: 10, 
                            background: 'green', 
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: 600
                        }} 
                        onClick={()=>{this.Editproduct()}} disabled={this.state.errorImageUrl}>
                            Save
                        </button>
                    )}
                    {/* <button style={{ width: 100, borderRadius: 10, background: 'green' }} className='addToBucket' onClick={()=>{this.Editproduct()}} disabled={this.state.errorImageUrl}>Save</button> */}
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
    handleImageLoad(event) {
        this.setState({errorImageUrl:false});
    }
    handleImageError(event) {
        this.setState({errorImageUrl:true});
    }
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
        this.setState((prevState) => ({
            pizza: {
                ...prevState.pizza,
                title: this.state.title + '-' + this.state.description,
            }
        }),()=>{
            const json =  this.state.pizza;
            console.log(this.state.pizza.id);
            console.log(this.state.pizza.imageUrl);
            console.log(this.state.pizza.title);
            console.log(this.state.pizza.weight);
            console.log(this.state.pizza.price);
            console.log(this.state.pizza.category);
            console.log(this.state.pizza.ingredients);
            console.log(this.state.pizza.ingredientsAdd);
            console.log(this.state.pizza.ingredientsExcepts);
            console.log(this.state.pizza.rating);
            console.log(this.state.pizza.sauce);
            console.log(this.state.pizza.isPopular);
            axios.post(`http://alisa000077-001-site1.htempurl.com/api/Pizza/UpdatePizza`, json)
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
            this.props.isShow()
        });
    }
}