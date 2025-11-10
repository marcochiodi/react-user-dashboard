import React from "react";
import { User } from "../../models/users.model";

type UserTableProps = {
  users: User[];
  setSelectedUser: (user: User) => void;
};


export default function UserTable({users, setSelectedUser}: UserTableProps){

    return(
        <table className="table table-striped table-responsive text-start">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.email}>

                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><button className="btn btn-primary bg-purple text-white" title="detail" onClick={() => setSelectedUser(user)}>
                                    <i className="bi bi-card-heading"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    )
}