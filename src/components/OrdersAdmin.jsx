import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import Nav from './Nav'
import EditOrder from './EditOrder'
import axios from 'axios'

export default class OrdersAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            stateNow: -1,
            idNow: -1,
            idUser: '',
            numberOfOrder:'',
            name:'',
            email:'',
            orderData:'',
            phoneNumber:'',
            totalPrice:0,
            paymentMethod:'',
            city:'',
            department:'',
            comment:'',
            isDone:'',
            productsInOrders:[],
            data: '',
            idproduct: -1,
            columns: [
                {
                    name: 'ID',
                    width: '60px',
                    selector: row => row.id
                },
                {
                    name: 'Order Number',
                    width: '280px',
                    selector: row => row.numberOfOrder
                },
                {
                    name: 'User ID',
                    width: '240px',
                    selector: row => row.idUser
                },
                {
                    name: 'User Name',
                    sortable: true,
                    selector: row => row.name
                },
                {
                    name: 'User Email',
                    width: '190px',
                    selector: row => row.email
                },
                {
                    name: 'User Phone Number',
                    width: '130px',
                    selector: row => row.phoneNumber.substring(2)
                },
                {
                    name: 'City',
                    width: '100px',
                    selector: row => row.city
                },
                {
                    name: 'Department',
                    width: '280px',
                    selector: row => row.department
                },
                {
                    name: 'Order Data',
                    sortable: true,
                    width: '140px',
                    selector: row => row.orderData
                },
                {
                    name: 'Payment Method',
                    width: '120px',
                    selector: row => row.paymentMethod=='cash'? 'Наличными':'Картой'
                },
                {
                    name: 'Comment on Order',
                    selector: row => row.comment!== '' ? row.comment : '-'
                },
                {
                    name: 'Products',
                    width: 'auto',
                    selector: row => this.formatProducts(row.productsInOrders),
                    grow: 2,
                },
                {
                    name: 'Total Price',
                    selector: row => `${row.totalPrice} грн.`
                },
                {
                    name: 'Order State',
                    width: 'auto',
                    selector: row =>
                        <div>
                            {row.isDone === true &&
                                <select disabled>
                                    <option selected>Done</option>
                                    <option>Processing</option>
                                </select>
                            }
                            {row.isDone === false &&
                                <select disabled>
                                    <option>Done</option>
                                    <option selected>Processing</option>
                                </select>
                            }
                        </div>
                },
                {
                    name: "Action",
                    width: '180px',
                    cell: row => (
                        <div>
                            <button className='btn btn-primary' onClick={() => {
                                this.EditNow(); this.setState({
                                    stateNow: row.state,
                                    idNow: row.id,
                                    idUser: row.idUser,
                                    orderData: row.orderData,
                                    numberOfOrder: row.numberOfOrder,
                                    name: row.name,
                                    email: row.email,
                                    phoneNumber: row.phoneNumber,
                                    productsInOrders: row.productsInOrders,
                                    totalPrice: row.totalPrice,
                                    comment: row.comment,
                                    paymentMethod: row.paymentMethod,
                                    city: row.city,
                                    department: row.department,
                                    isDone: row.isDone
                                })
                            }} >Edit</button>
                            <button style={{ marginLeft: 10 }} className='btn btn-danger' onClick={() => this.DeleteById(row.id)}>Delete</button>
                        </div>
                    )
                }
            ],
            records: this.props.data
        }
        this.EditNow = this.EditNow.bind(this)
        this.DeleteById = this.DeleteById.bind(this)
        this.setStateNow = this.setStateNow.bind(this)
        this.handleFilter = this.handleFilter.bind(this)

    }
    render() {
        return (
            <div className='px-3'>
                {/* <Nav Toggle={this.props.Toggle} /> */}
                <div className='container mt-5 offset-md-2 col-md-10'>
                    <div className='text-end'>
                        <input style={{ marginBottom: 0 }} className='inp-admin' type="text" placeholder='Enter query...' onChange={this.handleFilter} />
                    </div>
                    <DataTable title='Orders' columns={this.state.columns} data={this.state.records} fixedHeader pagination></DataTable>
                    {this.state.isEdit && <EditOrder id={this.state.idNow} numberOfOrder={this.state.numberOfOrder} idUser={this.state.idUser} name={this.state.name} email={this.state.email} phoneNumber={this.state.phoneNumber} productsInOrders={this.state.productsInOrders} totalPrice={this.state.totalPrice} comment={this.state.comment} paymentMethod={this.state.paymentMethod} orderData={this.state.orderData} city={this.state.city} department={this.state.department} isDone={this.state.isDone} isShow={this.EditNow} />}
                </div>
            </div>
        )
    }
    EditNow() {
        this.setState({ isEdit: !this.state.isEdit })
    }
    async setStateNow(state) {
        this.setState({ stateNow: state })
        await axios.post(`https://localhost:7031/api/ControllerClass/update-order`, {
            "id": this.state.idNow,
            "idUser": `${this.state.idUser}`,
            "date": `${this.state.orderData}`,
            "idProduct": this.state.idproduct,
            "state": state
        })
            .then(res => {
            })
        for (let i = 0; i < this.state.records.length; i++) {
            if (this.state.records[i].id === this.state.idNow) {
                const mas = [...this.state.records]
                mas.splice(i, 1, { id: this.state.idNow, idUser: this.state.idUser, date: this.state.orderData, idProduct: this.state.idproduct, state: state })
                this.setState({ records: mas })
            }
        }
        this.props.updateOrders()
    }
    handleFilter(event) {
        const newDate = this.props.data.filter(row => {
            return row.phoneNumber.toLowerCase().includes(event.target.value.toLowerCase()) || row.numberOfOrder.toLowerCase().includes(event.target.value.toLowerCase())
        })
        this.setState({ records: newDate })
    }
    async DeleteById(id) {
        const tempArr = this.state.records.filter((el) => { return el.id != id })
        this.setState({ records: tempArr })
        await axios.delete(`http://alisa000077-001-site1.htempurl.com/api/Order/DeleteOrder?idForDelete=${id}`)
            .then(res => {
            })
            this.props.updateOrders()
    }
    formatProducts(products) {
        if (!products || products.length === 0) {
            return 'No products';
        }
    
        return (
            <div>
                {products.map(product => (
                    <ul className="custom-list">
                        <li key={product.id}>
                            <strong>{product.title}</strong> ({product.count}x)
                        </li>
                        <p>{product.price} грн.</p>
                        {product.selectedSauce!=='' &&
                            <ul>
                                <li className="custom-list-item-sauce">{product.selectedSauce}</li>
                            </ul>
                        }               
                        {product.selectedIngredients && product.selectedIngredients.length > 0 && (
                        <div>
                            <ul className="custom-list">
                                {product.selectedIngredients.map(selectedIngredient => (
                                <li key={selectedIngredient.id} className="custom-list-item">{selectedIngredient.title}</li>
                                ))}
                            </ul>
                        </div>
                        )}
                        {product.excludedIngredients && product.excludedIngredients.length > 0 && (
                        <div>
                            <ul className="custom-list-minus">
                                {product.excludedIngredients.map(excludedIngredient => (
                                <li key={excludedIngredient.id} className="custom-list-item-minus">{excludedIngredient.title}</li>
                                ))}
                            </ul>
                        </div>
                        )}
                    </ul>
                ))}
            </div>
        );
    }
    
}