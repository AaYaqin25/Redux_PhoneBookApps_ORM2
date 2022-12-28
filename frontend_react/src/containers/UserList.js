import { connect } from 'react-redux'
import React, { Component } from "react"
import UserItem from "../components/UserItem"
import { loadMore, loadUser, removeUser, resendUser, updateUser } from '../actions/users'

class UserList extends Component {

    componentDidMount() {
        this.props.load()
    }

    scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop - element.clientHeight <= 1) {
            this.props.loadMore()
        }
    }

    render() {
        return (
            <div onScroll={this.scrolling} style={{ overflowY: "scroll", height: 200 }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.users.map((item, index) => (
                                <UserItem key={item.id} no={index + 1} name={item.name} phone={item.phone} sent={item.sent} remove={() => this.props.delete(item.id)} resending={() => this.props.resend(item.id, item.name, item.phone)} update={(name, phone) => this.props.renew(item.id, name, phone)} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users.data,
        params: state.users.params
    }
}

// action
const mapDispatchToProps = (dispatch, ownProps) => ({
    load: () => dispatch(loadUser()),
    delete: (id) => dispatch(removeUser(id)),
    resend: (id, name, phone) => dispatch(resendUser(id, name, phone)),
    renew: (id, name, phone) => dispatch(updateUser(id, name, phone)),
    loadMore: () => dispatch(loadMore())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)