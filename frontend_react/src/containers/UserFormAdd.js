import React, { Component } from "react";
import { connect } from 'react-redux'
import { addUser } from "../actions/users";

class UserFormAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submit(this.state.name, this.state.phone )
        this.setState({ name: '', phone: '' })
    }

    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row g-1 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="name" className="col-form-label">Name</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="name" name='name' className="form-control" placeholder='name' onChange={this.handleInputChange} value={this.state.name} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="phone" className="col-form-label">Phone</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="phone" name='phone' className="form-control" placeholder='phone' onChange={this.handleInputChange} value={this.state.phone} />
                    </div>
                    <div className="col-auto">
                        <button id='btnsave' className='btn btn-light' ><i className="fa-regular fa-circle-check"></i> save</button>
                        <button id='btncancel' className='btn btn-light' onClick={this.props.cancel}><i className="fa-solid fa-ban"></i> cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}



// action
const mapDispatchToProps = (dispatch, ownProps) => ({
    submit: (name, phone) => dispatch(addUser(name, phone))
})

export default connect(
    null,
    mapDispatchToProps
)(UserFormAdd)