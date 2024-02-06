import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import Nav from './Nav'
import AddProduct from './AddProducts'
import EditProduct from './EditProduct'
import axios from 'axios'

export default class ProductsAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: -1,
            img: '',
            title: '',
            weight: 0,
            price: 0,
            category: 1,
            rating: 0,
            sauce: '',
            ingredients:[],
            ingredientsAdd:[],
            ingredientsExcept:[],
            popular: 0,
            // dataCategory:[],
            columns: [
                {
                    name: 'ID',
                    sortable: true,
                    width: '60px',
                    selector: row => row.id
                },
                {
                    name: 'Image',
                    selector: (row) => <img width={50} height={50} src={row.imageUrl}></img>
                },
                {
                    name: 'Title',
                    sortable: true,
                    width: '140px',
                    selector: row => row.title
                },
                {
                    name: 'Weight',
                    sortable: true,
                    selector: row => row.weight
                },
                {
                    name: 'Price',
                    sortable: true,
                    selector: row => row.price
                },
                {
                    name: 'Category',
                    width:'150px',
                    selector: row => <div>  <select disabled>{
                        this.props.dataCategory.map((el) => {
                            if (el.id == row.category) {
                                return (<option selected>{el.title}</option>)
                            }
                        })
                    }
                    </select></div>
                },
                {
                    name: 'Rating',
                    sortable: true,
                    width: '80px',
                    selector: row => row.rating
                },
                {
                    name: 'Ingredients',
                    width: '200px',
                    selector: (row) => (
                        <ul>
                          {row.ingredients.map((ingredient) => (
                            <li key={ingredient.key}>{ingredient.name}</li>
                          ))}
                        </ul>
                    ),
                },
                {
                    name: 'IngredientsAdd',
                    width: '270px',
                    selector: (row) => (
                        <ul>
                          {row.ingredientsAdd.map((ingredientAdd) => (
                            <li key={ingredientAdd.id}>{ingredientAdd.name} ({ingredientAdd.price} грн)</li>
                          ))}
                        </ul>
                    ),
                },
                {
                    name:'IngredientsExcepts',
                    width: '230px',
                    selector: (row) => (
                        <ul>
                          {row.ingredientsExcepts.map((ingredientExcepts) => (
                            <li key={ingredientExcepts.id}>{ingredientExcepts.name}</li>
                          ))}
                        </ul>
                    ),
                },
                {
                    name: 'Sauce',
                    width:'130px',
                    selector: row => row.sauce
                },
                {
                    name: 'Popular',
                    selector: row =>
                        <div>
                            {row.isPopular == true &&
                                <select disabled>
                                    <option selected>True</option>
                                    <option>False</option>
                                </select>
                            }
                            {row.isPopular == false &&
                                <select disabled>
                                    <option>True</option>
                                    <option selected>False</option>
                                </select>
                            }
                        </div>
                },
                {
                    name: "Action",
                    width: '200px',
                    cell: row => (
                        <div>
                            <button className='btn btn-primary' onClick={() => {
                                this.isEdit()
                                this.setState({ id: row.id })
                                this.setState({ img: row.imageUrl })
                                this.setState({ title: row.title })
                                this.setState({ weight: row.weight })
                                this.setState({ price: row.price })
                                this.setState({ category: row.category })
                                this.setState({ rating: row.rating })
                                this.setState({ sauce: row.sauce })
                                this.setState({ingredients: row.ingredients})
                                this.setState({ingredientsAdd: row.ingredientsAdd})
                                this.setState({ingredientsExcept: row.ingredientsExcepts})
                                this.setState({ popular: row.isPopular })

                            }} >Edit</button>
                            <button style={{ marginLeft: 10 }} className='btn btn-danger' onClick={() => this.DeleteById(row.id)}>Delete</button>
                        </div>
                    )
                }
            ],
            records: this.props.data,
            addProduct: false,
            isEdit: false,
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.DeleteById = this.DeleteById.bind(this)
        this.isShow = this.isShow.bind(this)
        this.isEdit = this.isEdit.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.AddProduct = this.AddProduct.bind(this)
    }
    render() {
        return (
            <div className='px-3'>
                {/* <Nav Toggle={this.props.Toggle}/> */}
                <div className='container mt-5 offset-md-2 col-md-10'>
                    <div className='text-end'>
                        <input style={{ marginBottom: 0 }} className='inp-admin' type="text" placeholder='Enter query...' onChange={this.handleFilter} />
                    </div>
                    <DataTable title='Pizzas' columns={this.state.columns} data={this.state.records} fixedHeader pagination actions={<button onClick={() => { this.isShow() }} className='btn btn-success'>Add</button>}></DataTable>
                    {this.state.addProduct && <AddProduct dataProduct={this.state.records} AddProduct={this.AddProduct} dataCategory={this.props.dataCategory} isShow={this.isShow} />}
                {this.state.isEdit && <EditProduct updateProduct={this.updateProduct} getProducts={this.props.getProducts} id={this.state.id} img={this.state.img} title={this.state.title} weight={this.state.weight} price={this.state.price} category={this.state.category} rating={this.state.rating} sauce={this.state.sauce} ingredients={this.state.ingredients} ingredientsAdd={this.state.ingredientsAdd} ingredientsExcept={this.state.ingredientsExcept} isPopular={this.state.popular} dataCategory={this.props.dataCategory} isShow={this.isEdit}/>}
                </div>
            </div>
        )
    }
    handleFilter(event) {
        const newDate = this.props.data.filter(row => {
            return row.title.toLowerCase().includes(event.target.value.toLowerCase()) || row.title.toLowerCase().includes(event.target.value.toLowerCase())
        })
        this.setState({ records: newDate })
    }
    async DeleteById(id) {
        const tempArr = this.state.records.filter((el) => { return el.id != id })
        this.setState({ records: tempArr })
        await axios.delete(`http://alisa000077-001-site1.htempurl.com/api/Pizza/DeletePizza?idPizza=${id}`)
            .then(res => {
            })
    }
    isShow() {
        this.setState({ addProduct: !this.state.addProduct })
    }
    isEdit() {
        this.setState({ isEdit: !this.state.isEdit });
    }
    updateProduct = (id, imageUrl, title, weight, price, category, ingredients,ingredientsAdd,ingredientsExcepts, rating, sauce, isPopular) => {
        for (let i = 0; i < this.state.records.length; i++) {
            if (this.state.records[i].id === id) {
                const mas = [...this.state.records]
                mas.splice(i, 1, { id, imageUrl, title, weight, price, category, ingredients,ingredientsAdd, ingredientsExcepts,rating, sauce, isPopular })
                this.setState({ records: mas })
            }
        }
        console.log(this.state.records);
    }
    AddProduct(id_, imageUrl, title, weight, price, category, ingredients,ingredientsAdd,ingredientsExcepts, rating, sauce, isPopular) {
        this.props.getProducts()
        setTimeout(() => {
            const id = this.props.idProductNow
            const mas = [...this.state.records]
            mas.splice(this.state.records.length, 1, { id, imageUrl, title, weight, price, category, ingredients,ingredientsAdd,ingredientsExcepts, rating, sauce, isPopular })
            this.setState({ records: mas })
        }, 1500)
    }
}