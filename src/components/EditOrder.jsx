import React, { Component, useEffect } from 'react'
import {Order} from '../componentsModel/Order'
import { ProductsInOrders } from '../componentsModel/ProductsInOrders'
import { SelectedIngredient } from "../componentsModel/SelectedIngredient";
import { ExcludedIngredients } from "../componentsModel/ExcludedIngredients";
import {ProductsInOrdersUnique} from "../componentsModel/ProductInOrderUnique";
import axios from 'axios';
import { IngredientsExcept } from '../componentsModel/IngredientsExcept';
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
            indexForCheckIng: 0,

            cities:[],
            selectedCityId:0,
            departments:[],

            isPhoneNumberValid:true,
            sauceChecked: false
        }
        this.stateProcess = this.stateProcess.bind(this)      
    }
    componentDidMount()
        {
          var productsWithIdentificator = [];
          var ident = 0;
          this.state.order.productsInOrders.map((product) => {
            productsWithIdentificator.push(new ProductsInOrdersUnique(product.id,product.title,product.selectedIngredients, product.excludedIngredients, product.selectedSauce, product.price, product.count, product.ordersId, ident));
            ident += 1;
          })

          this.setState(prevState => ({
            order: {
                ...prevState.order,
                productsInOrders: productsWithIdentificator
            }
        }));

          axios.get(`http://alisa000077-001-site1.htempurl.com/api/Pizza/GetPizzas`)
          .then(res => {
            const pizzas = res.data;
            this.setState({listPizza:pizzas});
          })
          .catch(error => {
            console.error('Error fetching pizzas:', error);
        });

        axios.get('http://alisa000077-001-site1.htempurl.com/api/City/GetCityes') 
        .then(result => {
          const cities = result.data;
          cities.map((city)=>{
            if(city.name==this.state.order.city)
            {
              this.setState({selectedCityId: city.id});
              axios.get(`http://alisa000077-001-site1.htempurl.com/api/Department/GetDepartmentByID?id=${city.id}`)
              .then(res => {
                const shops = res.data;
                this.setState({ departments:shops });
              })
              .catch(error => {
                console.error('Error fetching departments:', error);
              });
            }
          })
          this.setState({cities:cities});
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
        };
  render() {
    return (
      <div className='full-item'>
      <div>
          <h3>Изменение продукта</h3>
          <div className='add-product'>             
              <input type='tel' placeholder='Phone Number...' value={this.state.order.phoneNumber} 
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length <= 12) {
                    this.setState(prevState => ({
                        order: {
                            ...prevState.order,
                            phoneNumber: inputValue
                        },
                        isPhoneNumberValid: false
                    }));
                }
                if (inputValue.length == 12) {
                  this.setState(prevState => ({
                      order: {
                          ...prevState.order,
                          phoneNumber: inputValue
                      },
                      isPhoneNumberValid: true
                  }));
                }
              }} 
              onKeyDown={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length < 4 && e.key === 'Backspace') { 
                    e.preventDefault();
                }
                if (inputValue.length == 3 && e.key === '0') {
                  e.preventDefault();
                }
              }}
              onKeyPress={(e) => {
                const charCode = e.which ? e.which : e.keyCode;
                if (charCode < 48 || charCode > 57) {
                    e.preventDefault();
                }
              }}
              ></input>
              {!this.state.isPhoneNumberValid && <span style={{ color: 'red',fontSize:12 }}>Пожалуйста, введите полный номер телефона</span>}
              <div className='editSelectCityDepartment'>
              <select value={this.state.order.city} onChange={this.handleCityChange}>
                {this.state.cities.map(city=> (
                <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
              <select value={this.state.order.department} onChange={this.handleDepartmentChange}>
                {this.state.departments.map(dep=> (
                <option key={dep.id} value={dep.name}>{dep.name}</option>
                ))}
              </select>
              </div>
              <input type='text' readOnly={true} placeholder='Order Date...' value={this.state.order.orderData} onChange={(e) => this.setState(prevState => ({
                  order: {
                  ...prevState.order,
                  orderData: e.target.value
              }}))}></input>
              <div className='allProductIngredients'>
              <div className='ingredients-container'>
                  <div className='ingredients-open-close'>
                      <label>Продукты в заказе</label>
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
                          <button className="buttonSave" onClick={this.handleAddNewProduct}>Add New</button>
                          <button className="buttonCancel" onClick={this.handleCancelEdit}>Cancel</button>
                        </div>
                      )}
                          {this.state.isEditingIngredient ? (
                          <div className='add-new-ingredient'>
                              <input type='text' placeholder='Введите название продукта...' value={this.state.newIngredientName} onChange={(e) => this.setState({ newIngredientName: e.target.value })} />
                              <input type='number' readOnly={true} placeholder='Введите цену продукта...' value={this.state.newIngredientPrice} onChange={(e) => this.setState({ newIngredientPrice: e.target.value })} />
                              <input type='number' min={1} placeholder='Введите количество продукта...' value={this.state.newIngredientCount} onChange={(e) => this.updateCount(e.target.value)} />
                              {/* <input type='text' placeholder='Введите соус для продукта...' value={this.state.newIngredientSauce} onChange={(e) => this.setState({ newIngredientSauce: e.target.value })} /> */}
                              <input type='number' readOnly={true} placeholder='Введите общую стоимость продукта...' value={this.state.newIngredientTotalPrice} onChange={(e) => this.setState({ newIngredientTotalPrice: e.target.value })} />
                              <p className='titleForAddIngredients'>Ингредиенты для добавления:</p>
                              {this.state.listPizza[this.state.indexForIng].ingredientsAdd.map((ingAdd, index) => (
                              <div key={index} className="checkbox-container" >
                                <input className='checkbox-input' type="checkbox" value={ingAdd.name} checked={this.isIngredientSelected(ingAdd.name)} onChange={(e) => this.handleIngredientAddCheckboxChange(e, ingAdd.name)}/>
                                <label className="checkbox-label">{ingAdd.name}</label>
                              </div>
                              ))}

                              <p className='titleForAddIngredients'>Ингредиенты для исключения:</p>
                              {this.state.listPizza[this.state.indexForIng].ingredientsExcepts.map((ingExcept, index) => (
                                <div key={index} className="checkbox-container" >
                                  <input className='checkbox-input' type="checkbox" value={ingExcept.name} checked={this.isIngredientExceptSelected(ingExcept.name)} onChange={(e) => this.handleIngredientExceptCheckboxChange(e, ingExcept.name)}/>
                                  <label  className="checkbox-label">{ingExcept.name}</label>
                                </div>
                              ))}
                              <p className='titleForAddIngredients'>Соус:</p>
                              <div className="checkbox-container" >
                                {/* <input className='checkbox-input' type="checkbox" value={this.state.listPizza[this.state.indexForIng].sauce} checked={this.isSauceSelected(this.state.listPizza[this.state.indexForIng].sauce)} onChange={(e) => this.handleChangeSauce(e)}/> */}
                                <input className='checkbox-input' type="checkbox" value={this.state.listPizza[this.state.indexForIng].sauce} checked={this.state.sauceChecked} onChange={(e) => this.handleChangeSauce(e)}/>
                                <label  className="checkbox-label">{this.state.listPizza[this.state.indexForIng].sauce}</label>
                              </div>
                              <button className="buttonSave" onClick={this.state.isEditingIngredient ? this.handleSaveEditedIngredient : this.handleSaveNewIngredient}>
                                  {this.state.isEditingIngredient ? 'Save Edit' : 'Save New'}
                              </button>
                              <button className="buttonCancel" onClick={this.handleCancelEdit}>Cancel</button>
                          </div>) : null}
                      </div>
                  </div>
                  )}
              </div>
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
          {this.state.isPhoneNumberValid ? (
            <button style={{ width: 100, borderRadius: 10, background: 'green' }} className='addToBucket' onClick={()=>this.Editproduct()}>Save</button>
            ) : (
            <button style={{ width: 100, borderRadius: 10, background: 'red',position:'absolute',right: '20px',bottom: '20px',background: '#ca5252;',width: '100px', height: '35px', textAlign: 'center', lineHeight: '35px', fontWeight: 600, cursor:'not-allowed'}} onClick={this.Editproduct} disabled={!this.state.isPhoneNumberValid}>Save</button>
          )}
          <div style={{ width: 100, borderRadius: 10, marginRight: '20%' }} className='addToBucket' onClick={() => this.props.isShow()} >Close</div>
      </div>
  </div>
    )
  }

  updateCount(count) {
    // Создаем переменную для хранения общей цены
    let tempTotalPrice = 0;

    this.setState((prevState) => {
        // Копируем предыдущий заказ
        const updatedOrder = { ...prevState.order };

        // Находим продукт для обновления по индексу
        const productToUpdate = updatedOrder.productsInOrders[prevState.indexForIng];

        if (productToUpdate) {
            productToUpdate.count = parseInt(count,10);

            let pizzaPrice = productToUpdate.price * count;
            productToUpdate.selectedIngredients.forEach((ing) => {
                this.state.listPizza.forEach((pizza) => {
                    if (pizza.title === productToUpdate.title) {
                        pizza.ingredientsAdd.forEach((ingAdd) => {
                            if (ing.title === ingAdd.name) {
                                pizzaPrice += ingAdd.price*count;
                            }
                        });
                    }
                });
            });
            tempTotalPrice += pizzaPrice;
        }

        return {
            order: updatedOrder,
            newIngredientCount: count,
            newIngredientTotalPrice: tempTotalPrice
        };
    });
    console.log(this.state.order);
}

setPriceIng(){
  var tempTotalPrice = 0;

  this.state.order.productsInOrders.map((product, index) =>{
    if(product.id == this.state.order.productsInOrders[this.state.indexForIng].id){
     tempTotalPrice = product.price * product.count;
     product.selectedIngredients.map((ing) => {
      this.state.listPizza.map((pizza)=>{
        if(pizza.title == product.title && product.identificator == this.state.indexForIng){
          pizza.ingredientsAdd.map((ingAdd) => {
            if(ing.title == ingAdd.name){
              tempTotalPrice += ingAdd.price*product.count;
            }
          })
        }
      })
     })
    }
  });

  this.setState((prevState) => ({
    newIngredientTotalPrice: tempTotalPrice
  }));
}
  stateProcess(text){
    if(text == 'True')
    {
      this.setState(prevState => ({
        order: {
        ...prevState.order,
        isDone: true
    }}));
      this.props.setStateNow(true)
    }
    if(text == "False"){
      this.setState(prevState => ({
        order: {
        ...prevState.order,
        isDone: false
    }}));
        this.props.setStateNow(false)
    }
  }
  handleCityChange=(e)=>{
    const selectedCity = e.target.value;
    this.state.cities.map((city)=>{
      console.log('city name = '+city.name);
      console.log('выбранный город = '+selectedCity);
      if(city.name==selectedCity)
      {
        console.log('city.id = '+city.id);
        this.setState({selectedCityId:city.id});
        axios.get(`http://alisa000077-001-site1.htempurl.com/api/Department/GetDepartmentByID?id=${city.id}`)
        .then(res => {
          const shops = res.data;
          console.log("shops: ",shops);
          this.setState({ departments:shops });
        })
        .catch(error => {
          console.error('Error fetching departments:', error);
        });
        this.setState(prevState => ({
          order: {
          ...prevState.order,
          city: e.target.value
          }
        }))
      }
    })
  };
  handleDepartmentChange=(e)=>{
    this.setState(prevState => ({
      order: {
      ...prevState.order,
      department: e.target.value
      }
    }))
  }
  isIngredientSelected = (ingredientName, index) => {
    console.log("Index now!!!: " + this.state.indexForCheckIng);
    for(var i = 0; i< this.state.listPizza[this.state.indexForIng].ingredientsAdd.length;i++){//вылетает
      if(this.state.order.productsInOrders[this.state.indexForCheckIng] != undefined){
        for(var y = 0; y < this.state.order.productsInOrders[this.state.indexForCheckIng].selectedIngredients.length;y++){
          if(this.state.order.productsInOrders[this.state.indexForCheckIng].selectedIngredients[y].title == ingredientName && this.state.order.productsInOrders[this.state.indexForCheckIng].identificator == this.state.indexForCheckIng){
            return true;
          }
        }
      }
    }
    return false;
  };
  
  
  
  isIngredientExceptSelected = (ingredientName) => {
    for(var i = 0; i< this.state.listPizza[this.state.indexForIng].ingredientsExcepts.length;i++){
      if(this.state.order.productsInOrders[this.state.indexForCheckIng] != undefined){
        for(var y = 0; y < this.state.order.productsInOrders[this.state.indexForCheckIng].excludedIngredients.length;y++){
          if(this.state.order.productsInOrders[this.state.indexForCheckIng].excludedIngredients[y].title == ingredientName){
            return true;
          }
        }
      }
    }
    return false;
  };
  isSauceSelected = (sauceName) => {
    console.log("Sauce: " + sauceName);
    console.log(this.state.order.productsInOrders[this.state.indexForIng]);
    if(sauceName == ""){
      this.setState({sauceChecked:false});
    }
    else{
      for(var i = 0; i < this.state.order.productsInOrders.length; i ++){
        if(this.state.order.productsInOrders[i].selectedSauce != ""){
          this.setState({sauceChecked: true});
        }
      }
    }
  };
  handleChangeSauce = (e) => {
    const isChecked = e.target.checked;
    console.log(isChecked);
    const sauceName = this.state.listPizza[this.state.indexForIng].sauce;
    console.log("Sauce now: " +sauceName);
    
    if(isChecked){
      const sauceName = this.state.listPizza[this.state.indexForIng].sauce;
      console.log(sauceName);  
      const updatedProductsInOrders = this.state.order.productsInOrders.map(product => {
          if (product.title === this.state.listPizza[this.state.indexForIng].title) {
              return {
                  ...product,
                  selectedSauce: sauceName,
              };
          }
          return product;
      });
  
      this.setState(prevState => ({
          order: {
              ...prevState.order,
              productsInOrders: updatedProductsInOrders,
          },
          sauceChecked:true
      }));
      return false;
    }
    else{
      const updatedProductsInOrders = this.state.order.productsInOrders.map(product => {
        return {
          ...product,
          selectedSauce: "",
      };
    });

    this.setState(prevState => ({
        order: {
            ...prevState.order,
            productsInOrders: updatedProductsInOrders,
        },
        sauceChecked:false
    }));
    }
   return true;
};

  // handleIngredientAddCheckboxChange = (e, ingredientName) => {
  //   const isChecked = e.target.checked;
  //   console.log(isChecked);
  //   const { indexForCheckIng, order } = this.state;

  //   if(isChecked){
  //     console.log("INDEX: " + this.state.indexForCheckIng);

  //     const updatedProductsInOrders = order.productsInOrders.map(product => {
  //       var idIng = 0;
  //       var newProd = null;
  //       var newIng = null;
  //       if (product.title === this.state.listPizza[indexForCheckIng].title && product.identificator == this.state.indexForCheckIng) {
  //         console.log("id prod: " + product.id + " id: " + this.state.order.productsInOrders[this.state.indexForIng].id);
  //         // if(product.id == this.state.order.productsInOrders[this.state.indexForIng].id){
           
  //         // }
  //         for(var i = 0;i< this.state.listPizza.length;i++){
  //           for(var x = 0; x< this.state.listPizza[i].ingredientsAdd.length;x++){
  //             if(this.state.listPizza[i].ingredientsAdd[x].name == ingredientName){
  //               idIng = this.state.listPizza[i].ingredientsAdd[x].id;
  //               newProd = this.state.order.productsInOrders[product.identificator];
  //               newIng = new SelectedIngredient(0,this.state.listPizza[i].ingredientsAdd[x].title,this.state.listPizza[i].ingredientsAdd[x].productsInOrdersId);
  //               // newProd.selectedIngredients = newIng;
  //             }
  //           }
  //         }
  //         return {
  //           ...newProd,
  //           selectedIngredients: [...product.selectedIngredients, {id:0, title: ingredientName,productsInOrdersId:product.id }]/////////tut
  //           // selectedIngredients: [...product.selectedIngredients, newIng]
  //         };         
  //       }
  //       product.selectedIngredients.map((ing) => {
  //         console.log(ing.title);
  //       })
  //       return product;
  //     });


  //     this.setState(
  //       (prevState) => ({
  //         order: {
  //           ...prevState.order,
  //           productsInOrders: updatedProductsInOrders,
  //         },
  //       }),
  //       () => {
  //         this.setPriceIng();
  //       }
  //     );
      
  //     var newSelectIng = null;
  //     this.state.listPizza.map((pizza)=>{
  //        pizza.ingredientsAdd.map((ing)=>{
  //         if(ing.name == ingredientName){
  //          newSelectIng = ing;
  //         }
  //       })
  //     })
  //   }
  //   else{
  //     const updatedProductsInOrders = order.productsInOrders.map(product => {
  //       if (product.title === this.state.listPizza[indexForCheckIng].title) {// здесб было indexForCheckIng
  //         return {
  //           ...product,
  //           selectedIngredients: product.selectedIngredients.filter(ing => ing.title !== ingredientName)
  //         };
  //       }
  //       return product;
  //     });

  //     this.setState(
  //       (prevState) => ({
  //         order: {
  //           ...prevState.order,
  //           productsInOrders: updatedProductsInOrders,
  //         },
  //       }),
  //       () => {
  //         this.setPriceIng();
  //       }
  //     );   
  //   }
  // };


  handleIngredientAddCheckboxChange = (e, ingredientName) => {
    const isChecked = e.target.checked;
    const { indexForCheckIng, order } = this.state;

    const updatedProductsInOrders = order.productsInOrders.map((product, index) => {
        if (product.identificator === indexForCheckIng && product.title === this.state.listPizza[this.state.indexForIng].title) {
            if (isChecked) {
                // Добавляем ингредиент к выбранной пицце
                return {
                    ...product,
                    selectedIngredients: [
                        ...product.selectedIngredients,
                        { id: 0, title: ingredientName, productsInOrdersId: product.id }
                    ]
                };
            } else {
                // Удаляем ингредиент из выбранной пиццы
                return {
                    ...product,
                    selectedIngredients: product.selectedIngredients.filter(ing => ing.title !== ingredientName)
                };
            }
        }
        return product;
    });

    this.setState({
        order: {
            ...order,
            productsInOrders: updatedProductsInOrders,
        },
    }, () => {
        this.setPriceIng();
    });
};


  handleIngredientExceptCheckboxChange = (e, ingredientName) => {
    const isChecked = e.target.checked;
    console.log(isChecked);
    const { indexForCheckIng, order } = this.state;

    if(isChecked){

      const updatedProductsInOrders = order.productsInOrders.map(product => {
        var idIng = 0;
        if (product.title === this.state.listPizza[this.state.indexForIng].title) {
          for(var i = 0;i< this.state.listPizza.length;i++){
            for(var x = 0; x< this.state.listPizza[i].ingredientsExcepts.length;x++){
              if(this.state.listPizza[i].ingredientsExcepts[x].name == ingredientName){
                idIng = this.state.listPizza[i].ingredientsExcepts[x].id;
              }
            }
          }
          return {
            ...product,
            excludedIngredients: [...product.excludedIngredients, {id:0, title: ingredientName,productsInOrdersId:product.id }]/////////tut
          };
        }
        return product;
      });
  
      this.setState(prevState => ({
        order: {
          ...prevState.order,
          productsInOrders: updatedProductsInOrders,
        },
      }));
      var newSelectIng = null;
      this.state.listPizza.map((pizza)=>{
         pizza.ingredientsExcepts.map((ing)=>{
          if(ing.name == ingredientName){
           newSelectIng = ing;
          }
        })
      })
    }
    else{
      const updatedProductsInOrders = order.productsInOrders.map(product => {
        if (product.title === this.state.listPizza[this.state.indexForCheckIng].title) {// здесь было indexForCheckIng
          return {
            ...product,
            excludedIngredients: product.excludedIngredients.filter(ing => ing.title !== ingredientName)
          };
        }
        return product;
      });
  
      this.setState(prevState => ({
        order: {
          ...prevState.order,
          productsInOrders: updatedProductsInOrders,
        },
      }));
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
//
//  Add new product
//
handleAddNewProduct = () => {
  var pizzaForAdd = null;
  if (this.state.newPizzaInOrder >= 0) {
    const pizzaForAddFromListPizza = this.state.listPizza[this.state.newPizzaInOrder];
    pizzaForAdd = new ProductsInOrdersUnique(0,pizzaForAddFromListPizza.title,[],[],'',pizzaForAddFromListPizza.price,1,this.state.order.id,this.state.order.productsInOrders.length)
    console.log("len: " + pizzaForAdd.selectedIngredients.length);
    var indexForAddProduct = -1;
    var isAddNew = true;
    for(var i =0; i< this.state.order.productsInOrders.length;i++){
      if(this.state.order.productsInOrders[i].title == pizzaForAdd.title){
        if(this.state.order.productsInOrders[i].selectedIngredients.length == 0 && pizzaForAdd.selectedIngredients.length == 0){
          if(this.state.order.productsInOrders[i].excludedIngredients.length == 0 && pizzaForAdd.excludedIngredients.length == 0){
            if(this.state.order.productsInOrders[i].selectedSauce == '' && pizzaForAdd.selectedSauce == ''){
              isAddNew = false;
              indexForAddProduct = i;
            }
          }
        }
      //  if(this.state.order.productsInOrders[i].selectedIngredients.length == pizzaForAdd.selectedIngredients.length){
      //   this.state.order.productsInOrders[i].selectedIngredients.map((selIng) => {
      //     console.log("in Sel ing: " +  pizzaForAdd.selectedIngredients.find((x) => x.title == selIng.title));
      //     pizzaForAdd.selectedIngredients.find((x) => x.title == selIng.title);
      //   })
      //  }
      }
    }
    if(isAddNew){
      this.setState(prevState => ({
        order: {
          ...prevState.order,
          productsInOrders: [...prevState.order.productsInOrders, new ProductsInOrdersUnique(0,pizzaForAdd.title,[],[],'',pizzaForAdd.price,1,this.state.order.id, this.state.order.productsInOrders.length)],
  
        },
        isAddingNewIngredient: false,
        newPizzaInOrder:0, 
      }));
    }
    else{
      const updatedProductsInOrders = [...this.state.order.productsInOrders];
      updatedProductsInOrders[indexForAddProduct].count++;

      this.setState(prevState => ({
        order: {
          ...prevState.order,
          productsInOrders: updatedProductsInOrders,
        },
        isAddingNewIngredient: false,
        newPizzaInOrder: 0, 
      }));
    }
    
  } else {
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
  if (this.state.isEditingIngredient) {
    alert('Вы не можете удалить элемент во время редактирования.');
    return;
  }
  else{
    const updatedProducts = [...this.state.order.productsInOrders];
    updatedProducts.splice(index, 1);
    console.log(updatedProducts);
    this.setState({
        order: {
            ...this.state.order,
            productsInOrders: updatedProducts,
        },
    },() => {console.log(this.state.order.productsInOrders);
    });
  }
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
  console.log("Index in edit: " + index);
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
        newIngredientTotalPrice:editedIngredientTotalPrice,
        indexForCheckIng: index
    });

    for(var i=0; i< this.state.listPizza.length;i++){
      if(this.state.listPizza[i].title ==  this.state.order.productsInOrders[index].title){
        this.setState({indexForIng: i});
        this.isSauceSelected(this.state.order.productsInOrders[i].selectedSauce);
        console.log('indexForIng='+this.state.indexForIng);
      }
    }
    console.log(this.state.order);
    this.setPriceIng();
};


//
// check edit product
//
handleSaveEditedIngredient = () => {
    // const editedIngredients = [...this.state.order.productsInOrders];
    // console.log(editedIngredients[this.state.editingIngredientIndex] );
    // if(editedIngredients[this.state.editingIngredientIndex] != undefined){
    //   editedIngredients[this.state.editingIngredientIndex].title = this.state.newIngredientName;
    //   console.log("ok");
    // }else{
    //   console.log("not ok ");
    // }

    const updateproduct = this.state.order.productsInOrders[this.state.editingIngredientIndex];
    var countExIng = 0;
    var countSelIng = 0;

    var isUpdateOldProduct = false;

    for(var i =0;i < this.state.order.productsInOrders.length; i++){
      countExIng = 0;
      countSelIng = 0;
      if(this.state.order.productsInOrders[i].title == updateproduct.title && this.state.order.productsInOrders[i].id == updateproduct.id){
        console.log("I id: " + this.state.order.productsInOrders[i].id + " up id: " + updateproduct.id);
        console.log("i ing: " + this.state.order.productsInOrders[i].selectedIngredients.length + " up ing: " + updateproduct.selectedIngredients.length);
        if(this.state.order.productsInOrders[i].selectedIngredients.length == updateproduct.selectedIngredients.length){
          if(this.state.order.productsInOrders[i].excludedIngredients.length == updateproduct.excludedIngredients.length){
            if(this.state.order.productsInOrders[i].selectedSauce == updateproduct.selectedSauce){
              //
              //  check all ing
              //
             this.state.order.productsInOrders[i].selectedIngredients.map((ing) => {
              for(var x = 0; x < updateproduct.selectedIngredients.length;x++){
                if(ing.title == updateproduct.selectedIngredients[x].title){
                  countSelIng +=1;
                }
              }
             })

             this.state.order.productsInOrders[i].excludedIngredients.map((ing) => {
              for(var x = 0; x < updateproduct.excludedIngredients.length;x++){
                if(ing.title == updateproduct.excludedIngredients[x].title){
                  countExIng +=1;
                }
              }
             })

             if(countSelIng == this.state.order.productsInOrders[i].selectedIngredients.length && countExIng == this.state.order.productsInOrders[i].excludedIngredients.length){
              console.log("Not bad!");
              console.log("i" + i);
              isUpdateOldProduct = true;
              console.log(updateproduct.selectedIngredients);
             }

            }
          }
        }  
      }
    }

    if(isUpdateOldProduct){
       //
      //  update old (set count)
      //
    }else{
      //
      //  update this prod
      //
    }

    // this.setState({
    //     order: {
    //         ...this.state.order,
    //         productsInOrders: editedIngredients,
    //     },
    //     isEditingIngredient: false,
    //     newIngredientName: '',
    //     editingIngredientIndex: null,
    // });
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
  console.log("Edit: "+this.state.order);
    const json =  this.state.order;
    console.log(json);
    console.log(this.state.order.productsInOrders[0].count);
    await axios.post(`http://alisa000077-001-site1.htempurl.com/api/Order/UpdateOrder`, json)
        .then(res => {
    })
    var newTotal = 0;
    this.state.order.productsInOrders.map((product) => { 
     this.state.listPizza.map((pizza)=>{
      if(product.title == pizza.title){
        newTotal += (product.price * product.count);
        product.selectedIngredients.map((ing) => {
          pizza.ingredientsAdd.map((ingAdd) => {
            if(ing.productsInOrdersId == ingAdd.pizzaId){
              newTotal += (ingAdd.price * product.count);
            }
          })
        })
      }
     });
    });
    console.log(newTotal);
    this.props.UpdateOrder(this.state.order.id,this.state.order.idUser,this.state.order.numberOfOrder,this.state.order.name,this.state.order.email,this.state.order.orderData,this.state.order.phoneNumber,newTotal,this.state.order.paymentMethod,this.state.order.city,this.state.order.department,this.state.order.comment,this.state.order.isDone,this.state.order.productsInOrders);
    this.props.isShow();
  }
}