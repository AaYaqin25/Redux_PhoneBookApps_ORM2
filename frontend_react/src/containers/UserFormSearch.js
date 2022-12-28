import React, { Component } from "react";
import { connect } from 'react-redux'
import { loadUser, searchUser} from '../actions/users';

class UserFormSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
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
        this.props.search({ name: this.state.name, phone: this.state.phone })
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
                        <button className='btn btn-primary' ><i className="fa-regular fa-circle-check"></i> search</button>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.data,
        params: state.users.params
    }
}

// action
const mapDispatchToProps = (dispatch, ownProps) => ({
    load: () => dispatch(loadUser()),
    search: (query) => dispatch(searchUser(query))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserFormSearch)