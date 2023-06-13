import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/system';
import Modal from '@mui/base/Modal';
// import Button from '@mui/base/Button';
import { useSpring, animated } from '@react-spring/web';
import { Stepper, Container, Typography, StepLabel, Step } from '@mui/material';
import { Grid, TextField, Button } from '@mui/material';

//pantallas a renderizar
import Cliente_Register from '../../pages/Vet_pages/User and pets/Cliente.Register';
import Mascotas_register from '../../pages/Vet_pages/User and pets/mascotas.register';

const steps = [
  'Registro de informacion del cliente',
  'Registro de informacion de la mascota',
];

export function Basic_modal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState('');
  const { title } = props;

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    console.log('hola');
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //Funcion cambia las pantalla dependiendo del paso del proceso
  function mostrarPaginas(handleNext) {
    switch (activeStep) {
      case 0:
        return 'Datos Generales del cliente';
        break;
      case 1:
        return 'Datos Generales de la Mascota';
        break;
    }
  }

  return (
    <div>
      <TriggerButton onClick={handleOpen}>
        Registrar Cliente y su mascota
      </TriggerButton>
      <StyledModal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 id='spring-modal-title' style={{ textAlign: 'center' }}>
              {title}
            </h2>
            <span
              id='spring-modal-description'
              style={{ marginTop: '25px', textAlign: 'center' }}
            >
              <Container sx={{ mt: 5 }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography
                      variant='h4'
                      style={{ textAlign: 'center' }}
                      sx={{ mt: 2, mb: 1 }}
                    >
                      Solicitud lista para enviar!!
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                        style={{ backgroundColor: 'gray', color: 'skyblue' }}
                        variant='contained'
                        disabled={activeStep == 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Regresar
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button href='/admin'>Enviar Registro</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {mostrarPaginas(handleNext)}
                    <Grid>
                      <Box
                        sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
                      >
                        {activeStep == 0 ? (
                          <>
                            <TextField label='Nombre' />
                          </>
                        ) : (
                          <>
                            <TextField label='Mascota' />
                          </>
                        )}
                      </Box>
                      <Box
                        sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
                      >
                        <Button
                          style={{ backgroundColor: 'gray', color: 'skyblue' }}
                          variant='contained'
                          disabled={activeStep == 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Regresar
                        </Button>

                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                          style={{
                            display: '',
                            backgroundColor: 'gray',
                            color: 'skyblue',
                          }}
                          onClick={handleNext}
                          variant='contained'
                          type='submit'
                          sx={{ mr: 1 }}
                        >
                          {activeStep === steps.length - 1
                            ? 'Finalizar'
                            : 'Siguiente'}
                        </Button>
                      </Box>
                    </Grid>
                  </React.Fragment>
                )}
              </Container>
            </span>
          </Box>
        </Fade>
      </StyledModal>
    </div>
  );
}
const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return <Fade ref={ref} in={open} {...other} />;
});

Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 2500;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  // children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const blue = {
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const style = (theme) => ({
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxWidth: 1000,
  height: 'auto',
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
});

const TriggerButton = styled(Button)(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    border-radius: 8px;
    padding: 6px 12px;
    line-height: 2;
    background: transparent;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    `
);