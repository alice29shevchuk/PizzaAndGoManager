import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import Nav from './Nav'
import AddProduct from './AddProducts'
import EditProduct from './EditProduct'
import axios from 'axios'
import AddComboProduct from './AddComboProduct'

export default class ComboPizzasAdmin extends React.Component {
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
            columns: [
                {
                    name: 'ID',
                    sortable: true,
                    width: '60px',
                    selector: row => row.id
                },
                {
                    name: 'Image',
                    width: '150px',
                    selector: (row) => <img width={50} height={50} src={row.imageUrl}></img>
                },
                {
                    name: 'Title',
                    sortable: true,
                    width: '240px',
                    selector: row => row.title.split('-')[0]
                },
                {
                    name: 'Description',
                    sortable: true,
                    width: '240px',
                    selector: row => row.title.split('-')[1]
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
            records: this.props.dataComboPizzas,
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
                <Nav Toggle={this.props.Toggle}/>
                <div className='container mt-5'>
                    <div className='text-end'>
                        <input style={{ marginBottom: 0 }} className='inp-admin' type="text" placeholder='Enter query...' onChange={this.handleFilter} />
                    </div>
                    <DataTable title='Combo Pizzas' columns={this.state.columns} data={this.state.records} fixedHeader pagination actions={<button onClick={() => { this.isShow() }} className='btn btn-success'>Add</button>}></DataTable>
                    {this.state.addProduct && <AddComboProduct dataProduct={this.state.records} AddProduct={this.AddProduct} dataComboPizzas={this.props.dataComboPizzas} isShow={this.isShow} />}
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
    AddProduct(id_, imageUrl, title, weight, price) {
        this.props.getComboPizzas()
        setTimeout(() => {
            const id = this.props.idProductNow
            const mas = [...this.state.records]
            mas.splice(this.state.records.length, 1, { id, imageUrl, title, weight, price})
            this.setState({ records: mas })
        }, 1500)
    }
}