import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import Nav from './Nav';
import axios from 'axios';
import AddCity from './AddCity';
import EditCategory from './EditCategory';
import EditCity from './EditCity';
import EditDepartment from './EditDepartment';
import { AddDepartment } from './AddDepartment';
export default class CitiesAdmin  extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isAdd: false,
            isAddDep:false,
            isEdit: false,
            isEditDep:false,
            editID: -1,
            editIdDep: -1,
            titleNow: '',
            titleNowDep:'',
            idCity:-1,
            cordE:0,
            cordN:0,
            columnsDepartments:[
                {
                    name:'ID',
                    selector:row => row.id,
                    sortable: true,
                    width: '80px',
                },
                {
                    name:'Name',
                    width: '250px',
                    selector:row => row.name,
                    sortable: true
                },
                {
                    name: 'City',
                    selector: row => {
                        const city = this.state.recordsCity.find(city => city.id === row.idCity);
                        return city ? city.name : 'nul';
                    },
                    sortable: true
                },
                {
                    name:'cordN',
                    selector:row => row.cordN,
                },
                {
                    name:'cordE',
                    selector:row => row.cordE,
                },
                {
                    name: "Action",
                    width: '200px',
                    cell: row => (
                        <div>
                            <button className='btn btn-primary' onClick={() => { this.setEditDep(); this.setState({ editIdDep: row.id, titleNowDep:row.name, idCity:row.idCity, cordN:row.cordN, cordE:row.cordE }); }}>Edit</button>
                            <button style={{ marginLeft: 10 }} className='btn btn-danger' onClick={() => this.DeleteDepartmentById(row.id)}>Delete</button>
                        </div>
                    )
                }
            ],
            columnsCities:[
                {
                    name:'ID',
                    selector:row => row.id,
                    sortable: true
                },
                {
                    name:'Name',
                    selector:row => row.name,
                    sortable: true
                },
                {
                    name: "Action",
                    width: '200px',
                    cell: row => (
                        <div>
                            <button className='btn btn-primary' onClick={() => { this.setEdit(); this.setState({ editID: row.id }); this.setState({ titleNow: row.name }) }}>Edit</button>
                            <button style={{ marginLeft: 10 }} className='btn btn-danger' onClick={() => this.DeleteById(row.id)}>Delete</button>
                        </div>
                    )
                }
            ],
            recordsDepartment:this.props.dataDepartment,
            recordsCity: this.props.dataCity,
        }
        this.addCity = this.addCity.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
        this.handleFilterAdmin = this.handleFilterAdmin.bind(this)
        this.DeleteById = this.DeleteById.bind(this)
        this.editCity = this.editCity.bind(this)
        this.editDepartment = this.editDepartment.bind(this)
        this.setEdit = this.setEdit.bind(this)
        this.isShow = this.isShow.bind(this)
        this.isShowDep = this.isShowDep.bind(this)
        this.setEditDep = this.setEditDep.bind(this)
        this.addDepartment = this.addDepartment.bind(this)
        this.DeleteDepartmentById = this.DeleteDepartmentById.bind(this)

    }
  render() {
    return (
      <div className='px-3'>
         <Nav Toggle={this.props.Toggle} />
         <div className='container mt-5'>
                    <div className='text-end'>
                        <input style={{marginBottom:0}} className='inp-admin' type="text" placeholder='Enter query...' onChange={this.handleFilter}/>
                    </div>
                    <DataTable title='Cities' columns={this.state.columnsCities} data={this.state.recordsCity} fixedHeader pagination actions={<button onClick={() => this.isShow()} className='btn btn-success'>Add</button>}></DataTable>
                    {this.state.isAdd && <AddCity addCity={this.addCity} isShow={this.isShow} />}
                    {this.state.isEdit && <EditCity id={this.state.editID} titleNow={this.state.titleNow} editCity={this.editCity} setEdit={this.setEdit} />}
                    <br></br> 
                    <div className='text-end'>
                        <input style={{marginBottom:0}} className='inp-admin' type="text" placeholder='Enter query...' onChange={this.handleFilterAdmin}/>
                    </div>
                    <DataTable title='Departments' columns={this.state.columnsDepartments} data={this.state.recordsDepartment} fixedHeader pagination actions={<button onClick={() => this.isShowDep()} className='btn btn-success'>Add</button>}></DataTable>
                    {this.state.isAddDep && <AddDepartment addDepartment={this.addDepartment} isShow={this.isShowDep} recordsCity={this.state.recordsCity} />}
                    {this.state.isEditDep && <EditDepartment id={this.state.editIdDep} titleNow={this.state.titleNowDep} editDepartment={this.editDepartment} setEdit={this.setEditDep} />}

                </div>
      </div>
    )
  }
    handleFilter(event){
        const newDate = this.props.dataCity.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        this.setState({recordsCity: newDate})
    }
    handleFilterAdmin(event){
        const newDate = this.props.dataDepartment.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        this.setState({recordsDepartment: newDate})
    }
    DeleteById(id){
        axios.delete(`http://alisa000077-001-site1.htempurl.com/api/City/DeleteCity?idForDelete=${id}`)
        .then(res => {
            this.setState({ status: res.data['statusCode'] })
            console.log(res.data['statusCode']);
        })
         setTimeout(() => {
        if (this.state.status === 400) {
            alert("Вы не можете удалить этот город, так как в нем есть магазины!!!!")
        }
        else {
            const tempArr = this.state.recordsCity.filter((el) => { return el.id != id })
            this.setState({ recordsCity: tempArr })
        }
        }, 2000)
    }
    DeleteDepartmentById(id){
        axios.delete(`http://alisa000077-001-site1.htempurl.com/api/Department/DeleteDepartment?idForDelete=${id}`)
        .then(res => {
            this.setState({ status: res.data['statusCode'] })
            console.log(res.data['statusCode']);
        })
         setTimeout(() => {
        if (this.state.status === 400) {
            alert("Вы не можете удалить этот город, так как в нем есть магазины!!!!")
        }
        else {
            const tempArr = this.state.recordsDepartment.filter((el) => { return el.id != id })
            this.setState({ recordsDepartment: tempArr })
        }
        }, 2000)
    }
    async addCity(name) {
        axios.post(`http://alisa000077-001-site1.htempurl.com/api/City/AddCity`, {
            "id": 0,
            "name": `${name}`
        }).then(res => {
            const newId = this.state.recordsCity[this.state.recordsCity.length-1].id+1
            console.log(newId);
                const item = { id: newId, name: name }
                this.setState({ recordsCity: [...this.state.recordsCity, item] })
                this.isShow()
        })
    }
    async addDepartment(name,idCity,cordN,cordE) {
        console.log(name + " " + idCity + " " + cordN + " " + cordE);
        axios.post(`http://alisa000077-001-site1.htempurl.com/api/Department/AddDepartment`, {
            "id": 0,
            "name": `${name}`,
            "idCity": idCity,
            "cordN": cordN,
            "cordE": cordE 
            
        }).then(res => {
            const newId = this.state.recordsDepartment[this.state.recordsDepartment.length-1].id+1
            console.log(newId);
            const item = { id: newId, name: name, idCity: parseInt(idCity,10), cordN: cordN, cordE: cordE }
            // this.setState({ recordsDepartment: [...this.state.recordsDepartment, item] })
            // this.isShowDep();
            this.setState(prevState => ({
                recordsDepartment: [...prevState.recordsDepartment, item]
            }), () => {
                console.log(this.state.recordsDepartment);
                this.isShowDep();
            });
        })
    }
    async editCity(id, name) {
        const newdate = [...this.state.recordsCity]
        for (let i = 0; i < newdate.length; i++) {
            if (newdate[i].id == id) {
                newdate.splice(i, 1, { id, name })
            }
        }
        this.setState({ records: newdate })
        await axios.post(`http://alisa000077-001-site1.htempurl.com/api/City/UpdateCity`, {
            "id": id,
            "name": `${name}`
        })
            .then(res => {
                const updatedRecords = this.state.recordsCity.map(record => {
                    if (record.id === id) {
                        return { ...record, name: name };
                    }
                    return record;
                });
            
                this.setState({ recordsCity: updatedRecords }); 
            })
        this.props.getCity()
    }
     async editDepartment(id, name) {
        const newdate = [...this.state.recordsDepartment]
        for (let i = 0; i < newdate.length; i++) {
            if (newdate[i].id == id) {
                newdate.splice(i, 1, { id, name })
            }
        }
        this.setState({ records: newdate })
        await axios.post(`http://alisa000077-001-site1.htempurl.com/api/Department/UpdateDepartment`, {
            "id": id,
            "name": `${name}`,
            "idCity": this.state.idCity,
            "cordN": this.state.cordN,
            "cordE": this.state.cordE 
        })
            .then(res => {
                const updatedRecords = this.state.recordsDepartment.map(record => {
                    if (record.id === id) {
                        return { ...record, name: name,idCity:this.state.idCity,cordN:this.state.cordN,cordE:this.state.cordE };
                    }
                    return record;
                });
            
                this.setState({ recordsDepartment: updatedRecords }); 
            })
        this.props.getDepartment()
    }
    setEdit() {
        this.setState({ isEdit: !this.state.isEdit })
    }

    setEditDep(){
        this.setState({isEditDep:!this.state.isEditDep})
    }

    isShow() {
        this.setState({ isAdd: !this.state.isAdd })
    }

    isShowDep(){
        this.setState({isAddDep: !this.state.isAddDep})
    }
}


