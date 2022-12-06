import React from 'react';

function User({ user }) {
    return (
        <div>
            <span>{user.email}</span>
        </div>
    );
}

function UserList({ users }) {
    return (
        <div className='teambuilding_input'>
            {users.map(user => (
                <User user={user} key={user.id} />
            ))}
        </div>
    );
}

export default UserList;