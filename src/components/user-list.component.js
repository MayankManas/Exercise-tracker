import React, { Component } from "react";
import axios from "axios";

const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        delete
      </button>
    </td>
  </tr>
);
export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.userList = this.userList.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      users: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.log(err));
  }

  userList() {
    return this.state.users.map(currentuser => {
      return (
        <User
          user={currentuser}
          deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }
  deleteUser(id) {
    axios
      .delete("http://localhost:5000/users/" + id)
      .then(response => console.log(response))
      .catch(err => console.log(`Error ${err}`));
    console.log(id);
    this.setState({
      users: this.state.users.filter(e => e._id !== id)
    });
  }
  render() {
    return (
      <div>
        <h3>Logged Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
      </div>
    );
  }
}
