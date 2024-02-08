import React, { Component, useEffect } from 'react'
import {Order} from '../componentsModel/Order'
import { ProductsInOrders } from '../componentsModel/ProductsInOrders'
import { SelectedIngredient } from "../componentsModel/SelectedIngredient";
import { ExcludedIngredients } from "../componentsModel/ExcludedIngredients";
import axios from 'axios';
export default class EditOrder extends React.Component {
    constructor(props){
        super(props)
        this.state={
          order: new Order(
           this.props.id,
           this.props.numberOfOrder,
           this.props.idUser,
           this.props.name,
           this.props.email,
           this.props.phoneNumber,
           this.props.productsInOrders,
           this.props.totalPrice,
           this.props.comment,
           this.props.paymentMethod,
           this.props.orderData,
           this.props.city,
           this.props.department,
           this.props.isDone
          ),
            stateNow:-1,
            value:'',

            newIngredientName: '', 
            newIngredientPrice:0,
            newIngredientCount:0,
            newIngredientSauce:'',
            newIngredientTotalPrice:0,
            isAddingNewIngredient: false,
            isEditingIngredient:false,
            isListIngredientsIsOpen:false,

            newIngredientAddName: '', 
            newIngredientAddPrice: 0, 
            isAddingNewIngredientAdd: false,
            isEditingIngredientAdd:false,
            isListIngredientsAddIsOpen:false,

            listPizza:[],
            newPizzaInOrder:0,
            indexForIng:0,
        }
        this.stateProcess = this.stateProcess.bind(this)      
    }
    componentDidMount()
        {
          axios.get(`http://alisa000077-001-site1.htempurl.com/api/Pizza/GetPizzas`)
          .then(res => {
            const pizzas = res.data;
            this.setState({listPizza:pizzas});
            console.log("Pizzas:", pizzas);
          })
          .catch(error => {
            console.error('Error fetching pizzas:', error);
        });
        };
  render() {
    return (
      <div className='full-item'>
      <div>
          <h3>Изменение продукта</h3>
          <div className='add-product'>             
              <input type='tel' placeholder='Phone Number...' value={this.state.order.phoneNumber} onChange={(e) => this.setState(prevState => ({
                  order: {
                  ...prevState.order,
                  phoneNumber: e.target.value
              }}))}></input>
              <input type='text' min={200} max={800} placeholder='City...' value={this.state.order.city} onChange={(e) => this.setState(prevState => ({
                  order: {
                  ...prevState.order,
                  city: e.target.value
              }}))}></input>
              <input min={0} type='text' placeholder='Department...' value={this.state.order.department} onChange={(e) => this.setState(prevState => ({
                  order: {
                  ...prevState.order,
                  department: e.target.value
              }}))}></input>
              <input type='text' placeholder='Order Date...' value={this.state.order.orderData} onChange={(e) => this.setState(prevState => ({
                  order: {
                  ...prevState.order,
                  orderData: e.target.value
              }}))}></input>
              <div className='ingredients-container'>
                  <div className='ingredients-open-close'>
                      <label>Продукты: </label>
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
                      {this.state.order.productsInOrders.map((ingredient, index) => (
                          <div className='ingredient-item' key={index}>
                              <span className='ingredient-name'>{ingredient.title}</span>
                              <div className='ingredient-buttons'>
                                  <button onClick={() => this.handleEditIngredient(index)}>Edit</button>
                                  <button onClick={() => this.handleDeleteIngredient(index)}>Delete</button>
                              </div>
                          </div>
                      ))}
                      <div>
                      {this.state.isAddingNewIngredient && (
                        <div>
                          <select onChange={(e)=> this.setState({ newPizzaInOrder: e.target.value })}>
                          {this.state.listPizza.map((pizza, index) => (
                            <option key={index} value={index}>{pizza.title}</option>
                          ))}
                          </select>
                          <button onClick={this.handleAddNewProduct}>Add New</button>
                          <button onClick={this.handleCancelEdit}>Cancel</button>
                        </div>
                      )}
                          {this.state.isEditingIngredient ? (
                          <div className='add-new-ingredient'>
                              <input type='text' placeholder='Введите название продукта...' value={this.state.newIngredientName} onChange={(e) => this.setState({ newIngredientName: e.target.value })} />
                              <input type='number' placeholder='Введите цену продукта...' value={this.state.newIngredientPrice} onChange={(e) => this.setState({ newIngredientPrice: e.target.value })} />
                              <input type='number' min={1} placeholder='Введите количество продукта...' value={this.state.newIngredientCount} onChange={(e) => this.setState({ 
                                newIngredientCount: e.target.value,
                                newIngredientTotalPrice: this.state.newIngredientPrice * e.target.value,
                                
                              })} />
                              <input type='text' placeholder='Введите соус для продукта...' value={this.state.newIngredientSauce} onChange={(e) => this.setState({ newIngredientSauce: e.target.value })} />
                              <input type='number' placeholder='Введите общую стоимость продукта...' value={this.state.newIngredientTotalPrice} onChange={(e) => this.setState({ newIngredientTotalPrice: e.target.value })} />
                              <p>Ингредиенты для добавления:</p>
                              {this.state.listPizza[this.state.indexForIng].ingredientsAdd.map((ingAdd, index) => (
                                      <div key={index}>
                                        <input
                                          type="checkbox"
                                          value={ingAdd.name}
                                          checked={this.isIngredientSelected(ingAdd.name)} 
                                          // onChange={(e) => this.handlePizzaCheckboxChange(pizza.id, e.target.value)}
                                        />
                                        <label>{ingAdd.name}</label>
                                      </div>
                                    ))}
                              <p>Ингредиенты для исключения:</p>
                                    {this.state.listPizza[this.state.indexForIng].ingredientsExcepts.map((ingAdd, index) => (
                                      <div key={index}>
                                        <input
                                          type="checkbox"
                                          value={ingAdd.name}
                                          // onChange={(e) => this.handlePizzaCheckboxChange(pizza.id, e.target.value)}
                                        />
                                        <label>{ingAdd.name}</label>
                                      </div>
                                    ))}
                                    <p>Соус:</p>
                                      <div>
                                        <input
                                          type="checkbox"
                                          value={this.state.listPizza[this.state.indexForIng].sauce}
                                          // onChange={(e) => this.handlePizzaCheckboxChange(pizza.id, e.target.value)}
                                        />
                                        <label>{this.state.listPizza[this.state.indexForIng].sauce}</label>
                                      </div>
                              <button onClick={this.state.isEditingIngredient ? this.handleSaveEditedIngredient : this.handleSaveNewIngredient}>
                                  {this.state.isEditingIngredient ? 'Save Edit' : 'Save New'}
                              </button>
                              <button onClick={this.handleCancelEdit}>Cancel</button>
                          </div>) : null}
                      </div>
                  </div>
                  )}
              </div>

              {this.state.order.isDone == true && (
                  <select onChange={(e)=>{this.stateProcess(e.target.value)}}>
                      <option selected>True</option>
                      <option>False</option>
                  </select>
              )}
              {this.state.order.isDone == false && (
                  <select onChange={(e)=>{this.stateProcess(e.target.value)}}>
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
  stateProcess(text){

    console.log(this.state.order);
    if(text == 'Done')
    {
      this.setState({stateNow:1})
      this.props.setStateNow(1)
    }
    if(text == "Proccesing"){
        this.setState({stateNow:0})
        this.props.setStateNow(0)
    }
  }
  isIngredientSelected = (ingredientName) => {
    for(var i = 0; i< this.state.listPizza[this.state.indexForIng].ingredientsAdd.length;i++){
        for(var y = 0; y < this.state.order.productsInOrders[this.state.indexForIng].selectedIngredients.length;y++){
          if(this.state.order.productsInOrders[this.state.indexForIng].selectedIngredients[y].title == ingredientName){
            return true;
          }
        }
    }
    return false;
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
        isEditingIngredient:false,
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
handleAddNewProduct = () => {
  if (this.state.newPizzaInOrder >= 0) {
    const pizzaForAdd = this.state.listPizza[this.state.newPizzaInOrder];
    console.log(pizzaForAdd);
    const newPizza = {
      title: pizzaForAdd.title,
    };

    this.setState(prevState => ({
      order: {
        ...prevState.order,
        productsInOrders: [...prevState.order.productsInOrders, new ProductsInOrders(0,pizzaForAdd.title,pizzaForAdd.ingredientsAdd,pizzaForAdd.ingredientsExcepts,pizzaForAdd.sauce,pizzaForAdd.price,1,this.state.order.id)],
      },
      isAddingNewIngredient: false,
      newPizzaInOrder:0, // Если требуется сбросить выбранную пиццу
    }));
  } else {
    // Выводите предупреждение, если пицца не выбрана
    alert('Please select a pizza before adding.');
  }
};

handleSaveNewIngredient = () => {
    if (this.state.newIngredientName.trim() !== '') {
        const newIngredient = { name: this.state.newIngredientName.trim() };
        this.state.pizza.ingredients = [...this.state.order.productsInOrders,new ProductsInOrders(0, newIngredient.name,[],[],"test sauce",123,12, this.state.order.id)];
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
      this.state.pizza.ingredientsAdd = [...this.state.order.productsInOrders,new ProductsInOrders(0, newIngredient.name,new SelectedIngredient(0,"test",0),[],"test sauce",123,12, this.state.order.id)];
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
      this.state.pizza.ingredientsExcepts = [...this.state.pizza.ingredientsExcepts,new ProductsInOrders(0, newIngredient.name, this.state.pizza.id)];
      this.setState((prevState) => ({
          newIngredientExceptName: '',
          isAddingNewIngredientExcept: false,
      }));
  } else {
      alert('Please enter the name of the new ingredient before saving.');
  }
};


handleDeleteIngredient = (index) => {
    const updatedIngredients = [...this.state.order.productsInOrders];
    updatedIngredients.splice(index, 1);
    console.log(updatedIngredients);
    this.setState({
        order: {
            ...this.state.order,
            productsInOrders: updatedIngredients,
        },
    });
    console.log(this.state.order.productsInOrders);
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
    const editedIngredient = this.state.order.productsInOrders[index].title;
    const editedIngredientPrice = this.state.order.productsInOrders[index].price;
    const editedIngredientCount = this.state.order.productsInOrders[index].count;
    const editedIngredientSauce = this.state.order.productsInOrders[index].selectedSauce;
    const editedIngredientTotalPrice = editedIngredientCount * editedIngredientPrice;

    this.setState({
        isAddingNewIngredient:false,
        isEditingIngredient: true,
        editingIngredientIndex: index,
        newIngredientName: editedIngredient,
        newIngredientPrice: editedIngredientPrice,
        newIngredientCount: editedIngredientCount,
        newIngredientSauce: editedIngredientSauce,
        newIngredientTotalPrice:editedIngredientTotalPrice
    });
    for(var i=0; i< this.state.listPizza.length;i++){
      if(this.state.listPizza[i].title ==  this.state.order.productsInOrders[index].title){
        this.setState({indexForIng: i});
      }
    }
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
    const editedIngredients = [...this.state.order.productsInOrders];
    editedIngredients[this.state.editingIngredientIndex].title = this.state.newIngredientName;

    this.setState({
        order: {
            ...this.state.order,
            productsInOrders: editedIngredients,
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
  console.log(this.state.order);
  console.log(this.state.editingIngredientIndex);
    // const json =  this.state.pizza;
    // console.log(json);
    // await axios.post(`http://alisa000077-001-site1.htempurl.com/api/Pizza/UpdatePizza`, json)
    //     .then(res => {
    // })
    // this.props.updateProduct(
    //     this.state.pizza.id,
    //     this.state.pizza.imageUrl,
    //     this.state.pizza.title,
    //     this.state.pizza.weight,
    //     this.state.pizza.price,
    //     this.state.pizza.category,
    //     this.state.pizza.ingredients,
    //     this.state.pizza.ingredientsAdd,
    //     this.state.pizza.ingredientsExcepts,
    //     this.state.pizza.rating,
    //     this.state.pizza.sauce,
    //     this.state.pizza.isPopular
    //     )
    // this.props.getProducts()
    // this.props.isShow()
}
}