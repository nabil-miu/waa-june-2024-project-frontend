import React, {useEffect, useState} from 'react';
import userService from '../services/UserService';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'USER'
    });
    const [updateUser, setUpdateUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    useEffect(() => {
        userService.getAllUsers()
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleUserSelect = (id) => {
        setLoading(true);
        userService.getUserById(id)
            .then(response => {
                setSelectedUser(response.data);
                setUpdateUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const handleUserCreate = async (event) => {
        event.preventDefault();
        try {
            const response = await userService.createUser(newUser);
            setUsers([...users, response.data]);
            setNewUser({
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            });
        } catch (error) {
            setError(error);
            console.error("Error creating user:", error.response.data);
        }
    };

    const handleUserUpdate = (event) => {
        event.preventDefault();
        userService.updateUser(updateUser.id, updateUser)
            .then(response => {
                setUsers(users.map(u => (u.id === updateUser.id ? response.data : u)));
                setSelectedUser(response.data);
            })
            .catch(error => setError(error));
    };

    const handleUserDelete = (id) => {
        userService.deleteUser(id)
            .then(() => {
                setUsers(users.filter(u => u.id !== id));
            })
            .catch(error => setError(error));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => handleUserSelect(user.id)}>
                        {user.firstName} {user.lastName}
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <div>
                    <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
                    <p>Email: {selectedUser.email}</p>
                    <p>Phone: {selectedUser.phone}</p>
                    <button onClick={() => handleUserDelete(selectedUser.id)}>Delete</button>
                </div>
            )}
            <h2>Create New User</h2>
            <form onSubmit={handleUserCreate}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
                <button type="submit">Create User</button>
            </form>
            {selectedUser && (
                <>
                    <h2>Update User</h2>
                    <form onSubmit={handleUserUpdate}>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={updateUser.firstName}
                            onChange={(e) => setUpdateUser({ ...updateUser, firstName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={updateUser.lastName}
                            onChange={(e) => setUpdateUser({ ...updateUser, lastName: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={updateUser.email}
                            onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={updateUser.phone}
                            onChange={(e) => setUpdateUser({ ...updateUser, phone: e.target.value })}
                        />
                        <button type="submit">Update User</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Users;