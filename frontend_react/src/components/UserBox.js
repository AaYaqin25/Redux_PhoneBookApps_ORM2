import '../styling/all.css'
import React, { Component } from 'react'
import UserList from '../containers/UserList';
import UserFormSearch from '../containers/UserFormSearch';
import UserFormAdd from '../containers/UserFormAdd';

export default class UserBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdd: false
        }
    }

    showAdd = (props) => {
        if (!props.show) {
            return null;
        }
        return (
            <div className="card">
                <div className="card-header">
                    <h5 id='texthead'>Adding Form</h5>
                </div>
                <div className="card-body">
                    <UserFormAdd cancel={this.handleCancelClick} />

                </div>
            </div>
        );
    }

    handleClickAdd = () => {
        this.setState(state => ({
            isAdd: !state.isAdd
        }));
    }

    handleCancelClick = () => {
        this.setState({
            isAdd: false
        });
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="head">
                            <h1>Phone Book Apps</h1>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    {this.state.isAdd ? <this.showAdd show={this.state.isAdd} /> : <button id='btnadd' className='btn btn-light' onClick={this.handleClickAdd} ><i className="fas fa-plus"></i> add </button>}
                </div>
                <br />

                <div className="card">
                    <div className="card-header">
                        <h5 id='texthead'>Search Form</h5>
                    </div>
                    <div className="card-body">
                        <UserFormSearch />
                    </div>
                </div>
                <br />
                <UserList />

            </div>
        )
    }

}

