import React, { useState, useCallback } from 'react';

//esquemas de validaciones y manipulacion de datos
import { useFormik } from 'formik';
// import { initialValues, validationSchemaRegister } from './UserFormValidate';

//Backend petitions

//MUI Material
import Autocomplete from '@mui/material/Autocomplete';
import {
  Grid,
  TextField,
  Button,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

//estilos
import './PetsFrom.css';

const acceptedFileTypes = [
  'application/pdf',
  'application/msword',
  'image/png',
  'image/jpeg',
];

const PetsForm = (props) => {
  const { close, user } = props;

  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  //renderizar las especies
  const responseData = '';

  //manipulacion y validacion de los campos
  const formik = useFormik({
    // initialValues: initialValues(user),
    // validationSchema: validationSchemaRegister(user),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!user) {
        } else {
        }
        onReload();
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && isFileValid(file)) {
      setUploadedFile(file);
      setErrorMessage('');
      setIsError(false);
    } else {
      setUploadedFile(null);
      setErrorMessage(
        'Formato de archivo no válido. Se aceptan archivos PDF, Word y imágenes (PNG, JPG, JPEG).'
      );
      setIsError(true);
    }
  }, []);

  const isFileValid = (file) => {
    const acceptedFormats = [
      'application/pdf',
      'application/msword',
      'image/png',
      'image/jpeg',
    ];
    return acceptedFormats.includes(file.type);
  };

  // Eliminar el archivo cargado estableciendo el estado en null en el dropzone
  const handleDelete = () => {
    setUploadedFile(null);
    setErrorMessage('');
    setIsError(false);
  };

  //restriccion de los elementos obtenido en el dropzone
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: [
        'application/pdf',
        'application/msword',
        'image/png',
        'image/jpeg',
      ],
      multiple: false,
    });

  const dropzoneStyle = {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: isError ? 'red' : isDragReject ? 'red' : '#888',
    borderStyle: 'dashed',
    p: 2,
    textAlign: 'center',
    backgroundColor: 'background.paper',
    cursor: 'pointer',
    width: '205%',
    height: '100%',
  };

  const gender = [
    { label: 'Macho', key: 'M', value: 'Macho' },
    { label: 'Hembra', key: 'F', value: 'Hembra' },
  ];

  const pedigree = [
    { label: 'Si posee', key: 'yes', value: true },
    { label: 'No posee', key: 'not', value: false },
  ];

  const vacune = [
    { label: 'Si posee', key: 'yes', value: true },
    { label: 'No posee', key: 'not', value: false },
  ];

  const reproduccion = [
    { label: 'Si posee', key: 'yes', value: true },
    { label: 'No posee', key: 'not', value: false },
  ];

  const specie = [
    { label: 'Caninos', key: 'can', value: 1 },
    { label: 'Felinos', key: 'feli', value: 2 },
    { label: 'Cetoácidos', key: 'cet', value: 3 },
    { label: 'Roedor', key: 'ro', value: 4 },
    { label: 'Saurio', key: 'sau', value: 5 },
    { label: 'Quelo', key: 'que', value: 6 },
    { label: 'Ofilio', key: 'ofi', value: 7 },
  ];
  return (
    <>
      <div className='hide-scrollbar'>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ maxWidth: '100%', margin: '0' }}>
            <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                name='nombre'
                label='Nombre'
                variant='outlined'
                size='small'
                sx={{ width: '100%' }}
                onChange={formik.handleChange}
                // value={formik.values.firstName}
                // error={
                //   formik.touched.firstName && Boolean(formik.errors.firstName)
                // }
                // helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id='specie'
                name='specie'
                size='small'
                options={specie}
                // onChange={(_, data) =>
                //   formik.setFieldValue('role', data?.value || '')
                // }
                // value={formik.values.role}
                // error={
                //   isError
                //     ? formik.errors.role && Boolean(formik.errors.password)
                //     : undefined
                // }
                renderInput={(params) => (
                  <TextField {...params} label='Seleccione una especie' />
                )}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='raza'
                label='Raza'
                variant='outlined'
                size='small'
                // value={formik.values.lastName}
                onChange={formik.handleChange}
                // error={
                //   formik.touched.lastName && Boolean(formik.errors.lastName)
                // }
                // helperText={formik.touched.lastName && formik.errors.lastName}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='color'
                label='Color del pelaje'
                variant='outlined'
                size='small'
                // value={formik.values.email}
                onChange={formik.handleChange}
                // error={formik.touched.email && Boolean(formik.errors.email)}
                // helperText={formik.touched.email && formik.errors.email}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='ishaveTattoo'
                label='¿Posee Tatuaje?'
                variant='outlined'
                size='small'
                // value={formik.values.password}
                onChange={formik.handleChange}
                // error={
                //   formik.touched.password && Boolean(formik.errors.password)
                // }
                // helperText={formik.touched.password && formik.errors.password}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='date'
                name='date'
                // value={date}
                type='date'
                size='small'
                onChange={''}
                // error={error}
                helperText={error ? 'Formato de fecha inválido' : ''}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id='gender'
                name='gender'
                size='small'
                options={gender}
                // onChange={(_, data) =>
                //   formik.setFieldValue('role', data?.value || '')
                // }
                // value={formik.values.role}
                // error={
                //   isError
                //     ? formik.errors.role && Boolean(formik.errors.password)
                //     : undefined
                // }
                renderInput={(params) => (
                  <TextField {...params} label='Seleccione el género' />
                )}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id='pedigree'
                name='pedigree'
                size='small'
                options={pedigree}
                // onChange={(_, data) =>
                //   formik.setFieldValue('role', data?.value || '')
                // }
                // value={formik.values.role}
                // error={
                //   isError
                //     ? formik.errors.role && Boolean(formik.errors.password)
                //     : undefined
                // }
                renderInput={(params) => (
                  <TextField {...params} label='¿Posee Pedigrí?' />
                )}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <br />
          <Divider
            container
            spacing={2}
            sx={{ maxWidth: '100%', margin: 0, marginBottom: '-20px' }}
          >
            {'Annaesis '}
          </Divider>
          <br />
          <Grid container spacing={2} sx={{ maxWidth: '100%', margin: 0 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='Cant_food'
                name='Cant_food'
                // value={date}
                label='Cantidad de alimento'
                size='small'
                onChange={''}
                // error={error}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                id='TypeOfFood'
                name='TypeOfFood'
                // value={date}
                label='Tipo de alimentación'
                size='small'
                onChange={''}
                // error={error}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='descendencia'
                name='descendencia'
                // value={date}
                label='Descendencia '
                size='small'
                onChange={''}
                // error={error}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='Convivencia'
                name='Convivencia'
                // value={date}
                label='¿Otras mascotas?, ¿Cuáles son?'
                size='small'
                onChange={''}
                // error={error}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id='vacuna'
                name='vacuna'
                size='small'
                options={vacune}
                // onChange={(_, data) =>
                //   formik.setFieldValue('role', data?.value || '')
                // }
                // value={formik.values.role}
                // error={
                //   isError
                //     ? formik.errors.role && Boolean(formik.errors.password)
                //     : undefined
                // }
                renderInput={(params) => (
                  <TextField {...params} label='¿Posee todas sus vacunas?' />
                )}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id='reproduccion'
                name='reproduccion'
                size='small'
                options={reproduccion}
                // onChange={(_, data) =>
                //   formik.setFieldValue('role', data?.value || '')
                // }
                // value={formik.values.role}
                // error={
                //   isError
                //     ? formik.errors.role && Boolean(formik.errors.password)
                //     : undefined
                // }
                renderInput={(params) => (
                  <TextField {...params} label='Reproducción' />
                )}
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='enfermedad'
                name='enfermedad'
                // value={date}
                multiline
                rows={3}
                label='Desarrollo/Evaluacion de la enfermedad'
                size='small'
                onChange={''}
                // error={error}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='observacion'
                name='observacion'
                // value={date}
                label='Observaciones'
                size='small'
                multiline
                rows={3}
                onChange={''}
                // error={error}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='habitaculo'
                name='habitaculo'
                // value={date}
                label='Habitaculo'
                multiline
                rows={2}
                size='small'
                onChange={''}
                // error={error}
                sx={{ width: '204%' }}
              />
            </Grid>
          </Grid>
          <br />
          <Divider
            container
            spacing={2}
            sx={{ maxWidth: '100%', margin: 0, marginBottom: '-20px' }}
          >
            {'Examen Físico '}
          </Divider>
          <br />
          <Grid container spacing={2} sx={{ maxWidth: '100%', margin: 0 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='weight'
                label='Peso de la mascota'
                variant='outlined'
                placeholder='Ejemplo: 0.0Kg'
                size='small'
                sx={{ width: '100%' }}
                // value={formik.values.birthday}
                onChange={formik.handleChange}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Añadir atributos para dispositivos móviles y navegadores modernos

                // error={
                //   formik.touched.birthday && Boolean(formik.errors.birthday)
                // }
                // helperText={formik.touched.birthday && formik.errors.birthday}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='palpitacion'
                label='Palpitaciones'
                variant='outlined'
                size='small'
                sx={{ width: '100%' }}
                // value={formik.values.birthday}
                onChange={formik.handleChange}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Añadir atributos para dispositivos móviles y navegadores modernos

                // error={
                //   formik.touched.birthday && Boolean(formik.errors.birthday)
                // }
                // helperText={formik.touched.birthday && formik.errors.birthday}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='balantaleo'
                label='Balantaleo'
                variant='outlined'
                size='small'
                sx={{ width: '204.5%' }}
                // value={formik.values.birthday}
                onChange={formik.handleChange}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Añadir atributos para dispositivos móviles y navegadores modernos

                // error={
                //   formik.touched.birthday && Boolean(formik.errors.birthday)
                // }
                // helperText={formik.touched.birthday && formik.errors.birthday}
              />
            </Grid>
            <Grid container spacing={3} sx={{ maxWidth: '100%', margin: 0 }}>
              <Grid item xs={12} sm={6}>
                <Box {...getRootProps()} sx={dropzoneStyle}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Typography variant='body1' color='text.secondary'>
                      Suelta los archivos aquí...
                    </Typography>
                  ) : (
                    <Typography variant='body1' color='text.secondary'>
                      {uploadedFile
                        ? 'Archivo cargado: ' + uploadedFile.name
                        : 'Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos'}
                    </Typography>
                  )}
                  {uploadedFile && (
                    <Box sx={{ mt: 2 }}>
                      <Button variant='contained' onClick={handleDelete}>
                        Eliminar
                      </Button>
                    </Box>
                  )}
                  {errorMessage && (
                    <Typography variant='body1' color='error' sx={{ mt: 2 }}>
                      {errorMessage}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              margin: '0 auto',
              marginTop: '25 auto',
            }}
          >
            <Button
              type='submit'
              size='medium'
              sx={{ mx: 2, marginTop: '12px' }}
            >
              {user ? 'Actualizar' : 'Registrar'}
            </Button>
            <Button
              color='error'
              onClick={close}
              size='medium'
              sx={{ mx: 2, marginTop: '12px' }}
            >
              Cancelar
            </Button>
          </Grid>
        </form>
      </div>
    </>
  );
};

export { PetsForm };
