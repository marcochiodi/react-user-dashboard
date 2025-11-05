import React, { Fragment, useEffect, useState } from "react";
import { useUsers } from "../../store/users.store";
import Search from "./SearchFilter";
import Role from "./RoleFilter";
import { User } from "../../models/users.model";

function Table() {
    const isLoading = useUsers((state) => state.isLoading);
    const fetchUsers = useUsers((state) => state.fetchUsers);
    const users = useUsers((state) => state.filteredUsers);
    const total = useUsers(s => s.total);
    const loading = useUsers(s => s.isLoading);
    const bump = useUsers(s => s.bumpLimitAndRefetch);

    const selectUser = useUsers((state) => state.selectUser);
    const store = useUsers();



    const setSeletectedUser = (user: User) => {
        selectUser(user)
    }


    useEffect(() => {
        fetchUsers()
    }, [])


    useEffect(() => {
        const threshold = 200;
        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const reachedBottom =
                    window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;

                if (reachedBottom && !loading && (users.length < total || total === 0)) {
                    bump(20);
                }
                ticking = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [bump, loading, users.length, total]);



    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-4"><Search></Search></div>
                <div className="col-12 d-none d-sm-block col-sm-4"></div>
                <div className="col-12 col-sm-4"><Role></Role></div>
            </div>
            <div className="w-100 overflow-x-auto">
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
                                <td><button className="btn btn-primary bg-purple text-white" title="detail" onClick={() => setSeletectedUser(user)}>
                                    <i className="bi bi-card-heading"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Table;