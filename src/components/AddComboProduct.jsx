import React, { Component } from 'react'
import axios from 'axios'
import {Pizza} from '../componentsModel/Pizza'
import { Ingredient } from '../componentsModel/Ingredient'
import { IngredientsAddItem } from '../componentsModel/IngredientsAddItem'
import { IngredientsExcept } from '../componentsModel/IngredientsExcept'

export default class AddComboProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        pizza:new Pizza(
          0,
          "https://static-00.iconduck.com/assets.00/pizza-icon-2048x2048-vk14rowe.png", //здесь было пусто
          "",
          0,
          -1,
          0,
          0,
          [],
          "",
          [],
          [],
          true
        ),
        errorImageUrl:false,
        errorTitle:true,
        errorDesc:true,
        errorWeight:true,
        errorPrice:true,
        title:'',
        description:'',
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
        baseImage:"https://static-00.iconduck.com/assets.00/pizza-icon-2048x2048-vk14rowe.png"
    }
    this.SelectCategory = this.SelectCategory.bind(this)
    // this.ChangeCategory = this.ChangeCategory.bind(this)
    this.SelectIsPopular = this.SelectIsPopular.bind(this)
    this.UploadFile = this.UploadFile.bind(this)
    this.AddProduct = this.AddProduct.bind(this)
  }
  render() {
    return (
      <div className='full-item'>
        <div>
          <h3>Add Product</h3>
          <div className='add-product'>
            {/* {this.state.pizza.imageUrl ? (
                <img src={this.state.pizza.imageUrl} alt="combo pizza" onLoad={(e)=>{this.handleImageLoad(e)}} onError={(e)=>{this.handleImageError(e)}} />):(<img src={this.state.baseImage} alt=" combo pizza" />)
            } */}
            <img src={this.state.pizza.imageUrl} alt='combo pizza' onLoad={(e)=>{this.handleImageLoad(e)}} onError={(e)=>{this.handleImageError(e)}}></img>
            <input type='text' placeholder='Image...' value={this.state.pizza.imageUrl}onChange={(e) => this.setState(prevState => ({
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
                    if (e.target.value.trim() !== '' && e.target.value.length>=5 &&  e.target.value.length <= 50) {
                        this.setState({ errorTitle: false });
                    } else {
                        this.setState({ errorTitle: true });
                    }
                }
            }}
            ></input>
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
            <input type='text' min={500} max={2000} placeholder='Weight...' value={this.state.pizza.weight} 
            // onChange={(e) => this.setState(prevState => ({
            // pizza: {
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
            <input min={1} type='number' placeholder='Price...' value={this.state.pizza.price} 
            // onChange={(e) => this.setState(prevState => ({
            // pizza: {
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
                            Add
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
                        onClick={() => { this.AddProduct() }} disabled={this.state.errorImageUrl}>
                            Add
                        </button>
                    )}
          {/* <div style={{ width: 100, borderRadius: 10, background: 'green' }} className='addToBucket' onClick={() => { this.AddProduct() }}>Add</div> */}
          <div style={{ width: 100, borderRadius: 10, marginRight: '20%' }} className='addToBucket' onClick={() => this.props.isShow()} >Close</div>
        </div>
      </div>
    )
  }
  SelectCategory(text) {
    for (const iterator of this.props.dataCategory) {
      if (iterator.title === text) {
        this.setState(prevState => ({
          pizza: {
              ...prevState.pizza,
              category: iterator.id
          }}))
      }
    }
  }
  SelectIsPopular(text) {
    console.log(text);
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
  }
  handleImageError(event) {
    this.setState({errorImageUrl:true});
    }
    handleImageLoad(event) {
        this.setState({errorImageUrl:false});
    }
  UploadFile(file) {
    const data = new FormData()
    if (file != null) {
      data.append('file', file)
      axios.post(`https://localhost:7031/api/AWS/upload-file-to-aws`, data)
        .then(res => {
          this.setState({ img: `https://ishopbucket.s3.eu-west-2.amazonaws.com/${file.name}` })
          this.setState({ showImg: true })
        })
    }
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
        // this.state.pizza.AddNewIngredient(newIngredient.name);
        // this.state.pizza.ingredients = [...this.state.pizza.ingredients, new Ingredient(0, newIngredient.name,0)]; 
        this.state.pizza.ingredients = [...this.state.pizza.ingredients, {id:0,name:newIngredient.name,pizzaId:0}]; 

        this.setState((prevState) => ({
            newIngredientName: '',
            isAddingNewIngredient: false,
        }));
    } else {
        alert('Please enter the name of the new ingredient before saving.');
    }
};
handleSaveNewIngredientAdd = () => {
    if (this.state.newIngredientAddName.trim() !== '' && this.state.newIngredientAddPrice.trim() !== 0) {
        const newIngredient = { name: this.state.newIngredientAddName.trim(), price: parseInt(this.state.newIngredientAddPrice) };
        // this.state.pizza.AddNewIngredientAdd(newIngredient.name, newIngredient.price);
        this.state.pizza.ingredientsAdd = [...this.state.pizza.ingredientsAdd, new IngredientsAddItem(0, newIngredient.name,newIngredient.price,0)]; 
        this.setState((prevState) => ({
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
        this.state.pizza.ingredientsExcepts = [...this.state.pizza.ingredientsExcepts, new IngredientsExcept(0, newIngredient.name,0)]; 

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
  async AddProduct() {
   
    // if(this.state.pizza.imageUrl)
    this.setState((prevState) => ({
        pizza: {
            ...prevState.pizza,
            title: this.state.title + '-' + this.state.description,
        }
    }),()=>{
        const json =  this.state.pizza;
        console.log("JSON: " + json.title);
        var image = this.state.pizza.imageUrl;
        // if(this.state.pizza.imageUrl.length > 0){
        //   image = this.state.baseImage;
        // }
        // else{
        //   image = this.state.pizza.imageUrl;
        // }
        axios.post(`http://alisa000077-001-site1.htempurl.com/api/Pizza/AddPizza`, json)
          .then(res => {
            const mas = this.props.dataComboPizzas
            const id = mas[mas.length-1].id + 1;
            console.log("ID: " + id);
            this.props.AddProduct(
              id,
              image,
              this.state.pizza.title,
              this.state.pizza.weight,
              this.state.pizza.price,
              -1,
              [],
              [],
              [],
              0,
              "",
              false)
          })
          this.props.isShow()
    })
  }
}