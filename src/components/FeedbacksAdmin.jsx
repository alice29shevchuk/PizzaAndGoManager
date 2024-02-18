import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import DataTable from 'react-data-table-component'
import AddCategory from './AddCategory';
import { ReactDOM } from 'react';
import { render } from '@testing-library/react';
import EditCategory from './EditCategory';
import axios from 'axios';
import { wait } from '@testing-library/user-event/dist/utils';
import EditFeedback from './EditFeedback';


class FeedbacksAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdd: false,
            columns: [
                {
                    name: 'ID',
                    selector: row => row.id,
                },
                {
                    name: 'User Name',
                    selector: row => row.name,
                    sortable: true
                },
                {
                    name: 'Message',
                    selector: row => row.message,
                    sortable: true
                },
                {
                    name: 'Rating',
                    selector: row => row.rating,
                    sortable: true
                },
                {
                    name: 'Show',
                    selector: row =>
                        <div>
                            {row.isShow == true &&
                                <select disabled>
                                    <option selected>True</option>
                                    <option>False</option>
                                </select>
                            }
                            {row.isShow == false &&
                                <select disabled>
                                    <option>True</option>
                                    <option selected>False</option>
                                </select>
                            }
                        </div>
                },
                {
                    name: "Action",
                    cell: row => (
                        <div>
                            <button className='btn btn-primary' onClick={() => { this.setEdit(); this.setState({ editID: row.id });this.setState({ name: row.name });this.setState({ message: row.message }); this.setState({ rating: row.rating }); this.setState({ show: row.isShow }) }}>Edit</button>
                            <button style={{ marginLeft: 10 }} className='btn btn-danger' onClick={() => this.DeleteById(row.id)}>Delete</button>
                        </div>
                    )
                }
            ],
            records: this.props.dataFeedbacks,
            isEdit: false,
            editID: -1,
            name:'',
            message:'',
            rating:0,
            show: false,
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.DeleteById = this.DeleteById.bind(this)
        this.isShow = this.isShow.bind(this)
        this.setEdit = this.setEdit.bind(this)
        this.editFeedback = this.editFeedback.bind(this)
    }
    render() {
        return (
            <div className='px-3'>
                <Nav Toggle={this.props.Toggle} />
                <div className='container mt-5'>
                    <div className='text-end'>
                        <input style={{ marginBottom: 0 }} className='inp-admin' type="text" placeholder='Enter query...' onChange={this.handleFilter} />
                    </div>
                    <DataTable title='Feedbacks' columns={this.state.columns} data={this.state.records} fixedHeader pagination></DataTable>    
                    {this.state.isEdit && <EditFeedback id={this.state.editID} show={this.state.show} editFeedback={this.editFeedback} setEdit={this.setEdit} />}                
                </div>
            </div>
        )
    }

    async DeleteById(id) {
        axios.delete(`http://alisa000077-001-site1.htempurl.com/api/FeedBack/DeleteFeedBack?idForDelete=${id}`)
            .then(res => {
                this.setState({ status: res.data['statusCode'] })
            })
        setTimeout(() => {
            if (this.state.status === 400) {
                alert("Вы не можете удалить этот комментарий!")
            }
            else {
                const tempArr = this.state.records.filter((el) => { return el.id != id })
                this.setState({ records: tempArr })
            }
        }, 2000)
        this.props.getFeedbacks()
    }
    async editFeedback(id, isShow) {
        const newRecords = this.state.records.map(feedback => {
            if (feedback.id === id) {
                return { ...feedback, isShow };
            }
            return feedback;
        });
    
        this.setState({ records: newRecords });
        console.log(id,isShow,this.state.name,this.state.message,this.state.rating);
        await axios.post(`http://alisa000077-001-site1.htempurl.com/api/FeedBack/UpdateFeedBack`, {
            "id":id,
            "name": this.state.name,
            "message": this.state.message,
            "rating":this.state.rating,
            "isShow":isShow
        }).then(res => {
            console.log(res.data);
        });
    
        this.props.getFeedbacks();
    }
    
    setEdit() {
        this.setState({ isEdit: !this.state.isEdit })
    }
    handleFilter(event) {
        const newDate = this.props.dataFeedbacks.filter(row => {
            return row.rating.toString().toLowerCase().includes(event.target.value)
        })
        this.setState({ records: newDate })
    }
    isShow() {
        this.setState({ isAdd: !this.state.isAdd })
        console.log(this.state.isAdd);
    }
}
export default FeedbacksAdmin;