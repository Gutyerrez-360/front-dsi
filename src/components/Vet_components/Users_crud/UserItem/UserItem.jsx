import React, { useState } from 'react';
import { IconButton, Avatar, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

//Mui material
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material';

//style of format
import './UserItem.css';

//Modal Update/Register/Delete/CreatePet
import {
  Modal_users,
  Modal_delete,
  Alerta,
  Modal_create_pet,
} from '../../../../shared';

//objetos children que se renderizan dentro del modal
import { UserForm } from '../UserForm';
import { PetsForm } from '../../Pets_crud';

//import petitions of back
import { UserApi } from '../../../../api/User.api';
import { ApiAuth } from '../../../../api/Auth.api';
import { NavLink } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//controladores de las clases API
const userController = new UserApi();
const authController = new ApiAuth();
const defaultTheme = createTheme();

export function UserItem({ user }) {
  //elementos enviados a UserItem en props
  // const { user, onReload } = props;

  //verificacion de error en la ejecución
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  //useState que controla el estado del (abrir o cerrar) modal Update/Register
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  //useState que controla el estado del (abrir o cerrar) modal Delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  //seteo del titulo del modal de eliminar
  const [titleDelete, setTitleDelete] = useState('');

  //useState que controla el estado del (abrir o cerrar) modal Create Pets
  const [showPets, setShowPets] = useState(false);
  const [titlePets, setTitlePets] = useState('');

  //funciones que cambia el estado
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);
  const onOpenClosePets = () => setShowPets((prevState) => !prevState);

  //funcion que ejecuta el boton correspondiente (Update pencilIcon)
  const openUpdateUser = () => {
    setTitleModal(`Actualizar Usuario: ${user.firstName} ${user.lastName}`);
    onOpenCloseModal();
  };

  //funcion que ejecuta el boton correspondiente (Create PetsIcon)
  const onCreatePetForUser = () => {
    setTitlePets('Crear Mascota para el cliente seleccionado.');
    onOpenClosePets();
  };

  //funcion que ejecuta el boton correspondiente (Delete TrashIcon)
  const openDeleteUser = () => {
    setTitleDelete(`Eliminar usuario: ${user.firstName} ${user.lastName}`);
    setConfirmMessage(`¿Esta seguro de que desea eliminar al usuario?`);
    onCloseConfirm();
  };
  const accessToken = authController.getAccessToken();
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async ({ accessToken }) => {
      await userController.deleteUser(accessToken, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setSuccess(true);
      onCloseConfirm();
    },
    onError: () => {
      onCloseConfirm();
      setError(true);
    },
  });

  //ejecuta la peticion de eliminacion de usuario
  const onDeleteUser = async () => {
    deleteUserMutation.mutate({ accessToken });
  };

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Demo>
        <ListItem sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <ListItemAvatar sx={{ margin: '0 auto' }}>
            <Avatar sx={{ mx: 4, width: 60, height: 60, bgcolor: '#8EC167' }}>
              <PersonIcon sx={{ fontSize: 45 }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <p>
              <br />
              <b>Usuario: </b>
              {user.firstName} {user.lastName}
              <br />
              <b>Correo: </b>
              {user.email}
              <br />
              <b>Role: </b>
              {user.role === 'client' ? 'Cliente' : 'Administrador'}
              <br />
              {user.direction ? (
                <>
                  <b>Direccion: </b>
                  {user.direction}
                  <br />
                </>
              ) : null}
              {user.dui ? (
                <>
                  <b>DUI: </b>
                  {user.dui}
                  <br />
                </>
              ) : null}
              {user.birthday ? (
                <>
                  <b>Fecha de nacimiento: </b>
                  {user.birthday}
                  <br />
                </>
              ) : null}
              {user.phone ? (
                <>
                  <b>Teléfono: </b>
                  {user.phone}
                </>
              ) : null}
            </p>
          </ListItemText>
          <ListItemAvatar
            sx={{ display: 'flex', flexDirection: 'row', margin: '0 auto' }}
          >
            <NavLink to={`/admin/users/${user.id}`}>
              <Grid item>
                <IconButton color='info'>
                  <VisibilityIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Grid>
            </NavLink>
            <Grid item>
              <IconButton color='warning' onClick={openUpdateUser}>
                <ModeEditIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='error' onClick={openDeleteUser}>
                <DeleteIcon sx={{ fontSize: 30 }} />
              </IconButton>
              {success && (
                <Alerta
                  type={'success'}
                  title={'¡Usuario Eliminado!'}
                  message={'Se ha elimnado correctamente usuario'}
                  strong={user.firstName + ' ' + user.lastName}
                />
              )}
              {error && (
                <Alerta
                  type={'error'}
                  title={'¡Ha ocurrido un problema!'}
                  message={'No se ha podido eliminar el usuario'}
                  strong={user.firstName + ' ' + user.lastName}
                />
              )}
            </Grid>
            <Grid item>
              <IconButton color='success' onClick={onCreatePetForUser}>
                <PetsIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
          </ListItemAvatar>
        </ListItem>
        <Divider>
          <PetsIcon color='action' style={{ width: '60px', height: '40px' }} />
        </Divider>
      </Demo>
      </ThemeProvider>
      <Modal_users show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} user={user} />
      </Modal_users>
      <Modal_delete
        onOpen={showConfirm}
        onCancel={onCloseConfirm}
        onConfirm={onDeleteUser}
        content={confirmMessage}
        title={titleDelete}
        size='mini'
      ></Modal_delete>
      <Modal_create_pet
        show={showPets}
        close={onOpenClosePets}
        title={titlePets}
      >
        <PetsForm close={onOpenClosePets} idUser={user.id} />
      </Modal_create_pet>
    </>
  );
}
