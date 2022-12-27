import React, { Component, Fragment } from "react"

export default class UserItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            phone: props.phone,
            isEdit: false
        }
    }

    showEdit = (props) => {
        if (!props.show) {
            return null
        }

        return (
            <div className="col-auto">
                <td>
                    <input type="text" id="name" name='name' className="form-control" placeholder='name' onChange={this.handleInputChange} value={this.state.name} />
                </td>
                <td>
                    <input type="text" id="phone" name='phone' className="form-control" placeholder='phone' onChange={this.handleInputChange} value={this.state.phone} />
                </td>
            </div>
        )
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleClickEdit = () => {
        this.setState(state => ({
            isEdit: !state.isEdit
        }))
    }

    handleCancelEdit = () => {
        this.setState({
            isEdit: false
        })
    }

    saveEdit = () => {
        this.props.update(this.state.name, this.state.phone)
        this.setState({
            isEdit: false
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.no}</td>
                {
                    this.state.isEdit ?
                        <this.showEdit show={this.state.isEdit} />
                        :
                        <Fragment>
                            <td>{this.props.name}</td>
                            <td>{this.props.phone}</td>
                        </Fragment>
                }

                {
                    this.props.sent ?
                        this.state.isEdit ?
                            <td>
                                <button className='btn btn-info' onClick={this.saveEdit}><i className="fa-sharp fa-solid fa-pen"></i> save</button>
                                <button className='btn btn-warning' onClick={this.handleCancelEdit}><i className="fa-solid fa-ban"></i> cancel</button>
                            </td>
                            : <td>
                                <button id='btnedit' className='btn btn-light' onClick={this.handleClickEdit}><i className="fa-sharp fa-solid fa-pen"></i> edit</button>
                                <button id='btndelete' className='btn btn-light' onClick={this.props.remove}><i className="fa-solid fa-ban"></i> delete</button>
                            </td>
                        :
                        <td>
                            <button className='btn btn-warning' onClick={this.props.resending}><i className="fa-solid fa-rotate-left"></i> resend</button>
                        </td>
                }

            </tr>
        )
    }
}

