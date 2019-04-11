import React from "react";
import AuthGuardedComponent from "../AuthGuardedComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Table, Divider } from "antd";
import "./friends.css";
import { notify } from "reapop";

class FriendsFinderComponent extends AuthGuardedComponent {
  componentDidMount() {
    super.componentDidMount();
    console.log(this.props);
  }

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Surname",
        dataIndex: "surname",
        key: "surname"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Action",
        key: "action",
        render: user => {
          return (
            <span>
              <a
                onClick={() => {
                  this.customAxios
                    .get(`http://localhost:5000/addFriend/${user.id}`)
                    .then(res => {
                      this.props.dispatch(
                        notify({
                          title: "RSA",
                          message: "Petición de amistad enviada",
                          status: "success",
                          dismissible: true,
                          dismissAfter: 3000
                        })
                      );
                    })
                    .catch(err => {
                      this.props.dispatch(
                        notify({
                          title: "RSA",
                          message: "Error enviando",
                          status: "Error",
                          dismissible: true,
                          dismissAfter: 3000
                        })
                      );
                    });
                }}
              >
                Petición de amistad
              </a>
            </span>
          );
        }
      }
    ];

    return (
      <div className="container">
        <h1>Añadir amigos</h1>
        <Table columns={columns} dataSource={Object.values(this.props.users)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state.user, users: state.users };
};

export default withRouter(connect(mapStateToProps)(FriendsFinderComponent));