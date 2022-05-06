import React, { Component } from 'react'
import UserService from '../../api/UserService'
import UsersCss from './Users.module.css'

class UserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }


    }

    componentDidMount() {
        UserService.getAllUsers()
            .then(response => {
                this.setState({ users: response.data })
            })
    }

    render() {
        return (
            <div className="UserComponent">
                {this.state.users.length == 0 && <h3>No Registered Users</h3> }


                {this.state.users.length != 0 &&
                    <div>
                        <h3>All Users</h3>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>email</th>
                                    <th>Name</th>
                                    <th>Active Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(user =>
                                        <tr>
                                            <td>{user.email}</td>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td className={user.activeStatus=='ONLINE' ? UsersCss.online : UsersCss.offline}>{user.activeStatus}</td>
                                        </tr>
                                    )
                                }
                            </tbody>

                        </table>
                    </div>

                }
            </div>
        )
    };
}

export default UserComponent