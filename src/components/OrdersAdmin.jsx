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
                    selector: row => row.name
                },
                {
                    name: 'User Email',
                    width: '190px',
                    selector: row => row.email
                },
                {
                    name: 'Order Data',
                    width: '140px',
                    selector: row => row.orderData
                },
                {
                    name: 'User Phone Number',
                    width: '130px',
                    selector: row => `+${row.phoneNumber}`
                },
                {
                    name: 'Total Price',
                    width: 'auto',
                    selector: row => row.totalPrice
                },
                {
                    name: 'Payment Method',
                    selector: row => row.paymentMethod=='cash'? 'Наличными':'Картой'
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
                    name: 'Comment on Order',
                    width: 'auto',
                    selector: row => row.comment!== '' ? row.comment : '-'
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
                                    data: row.date,
                                    idproduct: row.idProduct
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
                    {this.state.isEdit && <EditOrder stateNow={this.state.stateNow} setStateNow={this.setStateNow} edit={this.EditNow} />}
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
            "date": `${this.state.data}`,
            "idProduct": this.state.idproduct,
            "state": state
        })
            .then(res => {
            })
        for (let i = 0; i < this.state.records.length; i++) {
            if (this.state.records[i].id === this.state.idNow) {
                const mas = [...this.state.records]
                mas.splice(i, 1, { id: this.state.idNow, idUser: this.state.idUser, date: this.state.data, idProduct: this.state.idproduct, state: state })
                this.setState({ records: mas })
            }
        }
        this.props.updateOrders()
    }
    async DeleteById(id) {
        const tempArr = this.state.records.filter((el) => { return el.id != id })
        this.setState({ records: tempArr })
        await axios.delete(`http://alisa000077-001-site1.htempurl.com/api/Order/DeleteOrder?idForDelete=${id}`)
            .then(res => {
            })
            this.props.updateOrders()
    }
}