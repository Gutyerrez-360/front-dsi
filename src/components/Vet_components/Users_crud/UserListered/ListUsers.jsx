import React, { useEffect, useState } from 'react';
import { User } from '../../../../api/User.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { size, map } from 'lodash';
import { UserItem } from '../UserItem';
import { Button, Icon, CircularProgress } from '@mui/material';

const userController = new User();
const AuthController = new ApiAuth();
export function ListUsers(props) {
  const [users, setUsers] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const accessToken = AuthController.getAccessToken();

        const response = await userController.getAllUsers(accessToken);
        setUsers(response.data);
      } catch (error) {}
    })();
  }, []);

  if (!users) return <CircularProgress />;
  if (size(users) === 0) return 'No hay ningún usuario';
  return (
    <div>
      {map(users, (user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}