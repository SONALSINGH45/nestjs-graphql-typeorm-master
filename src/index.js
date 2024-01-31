// YourComponent.js
import React from 'react';
import { useSubscription, useQuery, gql } from '@apollo/client';

const USER_UPDATED = gql`
  subscription {
    userUpdated {
      id
      username
      // Include other fields as needed
    }
  }
`;

const GET_USERS = gql`
  query {
    getUsers {
      id
      username
      // Include other fields as needed
    }
  }
`;

const YourComponent = () => {
    const { data: subscriptionData } = useSubscription(USER_UPDATED);
    const { data: queryData } = useQuery(GET_USERS);

    const updatedUser = subscriptionData?.userUpdated;
    const users = queryData?.getUsers || [];

    return (
        <div>
            <h1>User Updates</h1>
            {updatedUser && (
                <div>
                    <p>User Updated:</p>
                    <p>ID: {updatedUser.id}</p>
                    <p>Username: {updatedUser.username}</p>
                    {/* Include other fields as needed */}
                </div>
            )}

            <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>ID: {user.id}</p>
                        <p>Username: {user.username}</p>
                        {/* Include other fields as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YourComponent;
