import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import DataTable from 'react-data-table-component'
import AddCategory from './AddCategory';
import { ReactDOM } from 'react';
import { render } from '@testing-library/react';
import EditCategory from './EditCategory';
import axios from 'axios';
import { wait } from '@testing-library/user-event/dist/utils';


class CategoriesAdmin extends React.Component {
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
                    name: 'Title',
                    selector: row => row.title,
                    sortable: true
                },
                {
                    name: "Action",
                    cell: row => (
                        <div>
                            <button className='btn btn-primary' onClick={() => { this.setEdit(); this.setState({ editID: row.id }); this.setState({ titleNow: row.title }) }}>Edit</button>
                            <button style={{ marginLeft: 10 }} className='btn btn-danger' onClick={() => this.DeleteById(row.id)}>Delete</button>
                        </div>
                    )
                }
            ],
            records: this.props.dataCategories,
            isEdit: false,
            editID: -1,
            titleNow: ''
        }
        this.addcat = this.addcat.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
        this.DeleteById = this.DeleteById.bind(this)
        this.isShow = this.isShow.bind(this)
        this.setEdit = this.setEdit.bind(this)
        this.editCategory = this.editCategory.bind(this)
    }
    render() {
        const table = <DataTable title='Categories' columns={this.state.columns} data={this.state.records} fixedHeader pagination actions={<button onClick={() => this.isShow()} className='btn btn-success'>Add</button>}></DataTable>
        return (
            <div className='px-3'>
                <Nav Toggle={this.props.Toggle} />
                <div className='container mt-5'>
                    <div className='text-end'>
                        <input style={{ marginBottom: 0 }} className='inp-admin' type="text" placeholder='Enter query...' onChange={this.handleFilter} />
                    </div>
                    {table}
                    {this.state.isAdd && <AddCategory addcat={this.addcat} isShow={this.isShow} />}
                    {this.state.isEdit && <EditCategory id={this.state.editID} titleNow={this.state.titleNow} editCategory={this.editCategory} setEdit={this.setEdit} />}
                </div>
            </div>
        )
    }

   async addcat(title) {
        axios.post(`http://alisa000077-001-site1.htempurl.com/api/Category/AddCategory`, {
            "id": 0,
            "title": `${title}`
        }).then(res => {
            this.props.getCategories()
            setTimeout(() => {
                const item = { id: this.props.idCategoryNow, title: title }
                this.setState({ records: [...this.state.records, item] })
                this.isShow()
            }, 2000)
        })
    }
    async DeleteById(id) {
        axios.delete(`http://alisa000077-001-site1.htempurl.com/api/Category/DeleteCategory?idForDelete=${id}`)
            .then(res => {
                this.setState({ status: res.data['statusCode'] })
                console.log(res.data['statusCode']);
            })
        setTimeout(() => {
            if (this.state.status === 400) {
                alert("Вы не можете удалить эту категорию, так как в ней есть товары!!!!")
            }
            else {
                const tempArr = this.state.records.filter((el) => { return el.id != id })
                this.setState({ records: tempArr })
            }
        }, 2000)
        this.props.getCategories()
    }
    async editCategory(id, title) {
        const newdate = [...this.state.records]
        for (let i = 0; i < newdate.length; i++) {
            if (newdate[i].id == id) {
                newdate.splice(i, 1, { id, title })
            }
        }
        this.setState({ records: newdate })
        await axios.post(`http://alisa000077-001-site1.htempurl.com/api/Category/UpdateCategory`, {
            "id": id,
            "title": `${title}`
        })
            .then(res => {
            })
        this.props.getCategories()
    }
    setEdit() {
        this.setState({ isEdit: !this.state.isEdit })
    }
    handleFilter(event) {
        const newDate = this.props.dataCategories.filter(row => {
            return row.title.toLowerCase().includes(event.target.value.toLowerCase())
        })
        this.setState({ records: newDate })
    }
    isShow() {
        this.setState({ isAdd: !this.state.isAdd })
        console.log(this.state.isAdd);
    }
}
export default CategoriesAdmin;