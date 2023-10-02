import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// MUI Material
import {
  Container,
  Box,
  Tab,
  Tabs,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
//render of pets
import { PetMedicalHistory } from './MedicalHistory';
import { PetMedicalHistoryTreatments } from './Treatments';
import { PetMedicalHistorySurgicalIntervations } from './SurgicalIntervations';

//Lodash for render info pets and user
import { size, map } from 'lodash';

// peticiones al Back
import { Pets } from '../../../api/Pets.api';
import { ApiAuth } from '../../../api/Auth.api';
import { useQuery } from '@tanstack/react-query';

const petsController = new Pets();
const apiAuthController = new ApiAuth();

export function CompletePetPerfil() {
  const allTreatments = [];
  const allIntervations = [];
  let params = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: pet, isLoading } = useQuery({
    queryKey: ['pets', params.petId],
    queryFn: async () => {
      const accessToken = apiAuthController.getAccessToken();
      const response = await petsController.getPetById(
        accessToken,
        params.petId
      );
      return response;
    },
  });
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  let medicalHistoryId = 0;
  if (!isLoading ){
    pet.medicalHistories?.map((medicalHistory) => {
      medicalHistoryId = medicalHistory.id;
        if(medicalHistory.diagnostics[0] !== undefined){
          medicalHistory.diagnostics[0].treatments.map((treatment) => {
            allTreatments.push({...treatment, medicalHistoryId});
          })
          medicalHistory.diagnostics[0].surgicalIntervations.map((intervation) => {
            allIntervations.push({...intervation, medicalHistoryId});
          })
        }
      }
    );
  }
  console.log(allIntervations);

  return (
    <>
      <AppBar position='static' sx={{ m:-1, width: '101.2%' }}>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/admin')}
          >
            Veterinaria Mistum
          </Typography>

          <Button
            variant='contained'
            color='success'
            style={{ color: 'white' }}
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        </Toolbar>
      </AppBar>
      <br />

      <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={18} md={4} sx={{ height: '100%' }}>
            <Paper style={{ padding: '20px', fontSize: '18px' }}>
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '5px',
                }}
              >
                Datos generales de la mascota
              </h1>
              <br />
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <>
                  <b>Nombre: </b>
                  {pet.name}
                  <br />
                  <br />
                  <b>Género: </b>
                  {pet.gender}
                  <br />
                  <br />
                  <b>Especie: </b>
                  {pet.specie.name}
                  <br />
                  <br />
                  <b>Raza: </b>
                  {pet.raza}
                  <br />
                  <br />
                  <b>Color: </b>
                  {pet.color}
                  <br />
                  <br />
                  <b>Tatuajes: </b>
                  {pet.isHaveTatto ? 'Sí posee':'No posee'}
                  <br />
                  <br />
                  <b>Pedigree: </b>
                  {pet.pedigree ? 'Sí posee':'No posee'}
                  <br />
                  <br />
                  {pet.birthday ? (
                    <>
                      <b>Fecha de nacimiento: </b>
                      {pet.birthday}
                      <br />
                      <br />
                    </>
                  ) : null}
                </>
              )}
            </Paper>
          </Grid>
          <Grid item xs={17} md={8}>
            {/*<Paper
              style={{
                padding: '20px',
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '5px',
                }}
              >
                Historial médico
              </h1>
              {!isLoading && size(pet.medicalHistories) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{pet.name} Esta mascota no dispone de hojas clínicas registradas!
                  </Typography>
                </>
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent', // Oculta el scrollbar en navegadores que soportan "scrollbar-color"
                    msOverflowStyle: 'none', // Oculta el scrollbar en navegadores antiguos de Internet Explorer
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {map(pet.medicalHistories, (hojaClinica) => (
                    <PetMedicalHistory key={hojaClinica.id} medicalHistory={hojaClinica} />
                  ))}
                </div>
              )}
            </Paper>*/}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Grid container spacing={3} alignItems='center'>
                <Grid item>
                  <Tabs value={selectedTab} onChange={handleTabChange} aria-label='basic tabs example'>
                    <Tab icon={<HistoryEduIcon />} label='Historial médico' {...a11yProps(0)} />
                    <Tab icon={<VaccinesIcon />} label='Tratamientos' {...a11yProps(1)} />
                    <Tab icon={<LocalHospitalIcon />} label='Intervenciones' {...a11yProps(2)} />
                  </Tabs>
                </Grid>

                <Grid item sx={{ flexGrow: 1 }}>
                  {/* Espacio flexible */}
                </Grid>
                {/*<Grid item>Total mascotas registradas: {totalPets}</Grid>
                <Grid item>
                  <SearchInput isFetching={isFetching} />
                </Grid>*/}
              </Grid>
            </Box>

            {/* PETS MEDICAL HISTORY */}
            {selectedTab === 0 && (
              <div>
                {!isLoading && size(pet.medicalHistories) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{pet.name} Esta mascota no dispone de hojas clínicas registradas!
                  </Typography>
                </>
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent', // Oculta el scrollbar en navegadores que soportan "scrollbar-color"
                    msOverflowStyle: 'none', // Oculta el scrollbar en navegadores antiguos de Internet Explorer
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {map(pet.medicalHistories, (hojaClinica) => (
                    <PetMedicalHistory key={hojaClinica.id} medicalHistory={hojaClinica} />
                  ))}
                </div>
              )}
              </div>
            )}

            {/* PETS DOCUMENTATION */}
            {selectedTab === 1 && (
              <div>
                {!isLoading && size(pet.medicalHistories) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{pet.name} Esta mascota no dispone de hojas clínicas registradas!
                  </Typography>
                </>
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent', // Oculta el scrollbar en navegadores que soportan "scrollbar-color"
                    msOverflowStyle: 'none', // Oculta el scrollbar en navegadores antiguos de Internet Explorer
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  { map(allTreatments, (treatment) => (
                      <PetMedicalHistoryTreatments key={treatment.id} treatment={treatment}/>
                  ))}
                    
                </div>
              )}
              </div>
            )}


            {/* PETS DOCUMENTATION */}
            {selectedTab === 2 && (
              <div>
                {!isLoading && size(pet.medicalHistories) === 0 ? (
                <>
                  <Typography
                    variant='h5'
                    style={{ textAlign: 'center', marginTop: '65px' }}
                    color={'black'}
                  >
                    ¡{pet.name} Esta mascota no dispone de hojas clínicas registradas!
                  </Typography>
                </>
              ) : null}
              {isLoading ? (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress style={{ alignSelf: 'center' }} />
                </div>
              ) : (
                <div
                  style={{
                    minHeight: '250px',
                    maxHeight: '670px',
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'transparent transparent', // Oculta el scrollbar en navegadores que soportan "scrollbar-color"
                    msOverflowStyle: 'none', // Oculta el scrollbar en navegadores antiguos de Internet Explorer
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  { map(allIntervations, (intervation) => (
                      <PetMedicalHistorySurgicalIntervations key={intervation.id} intervation={intervation} />
                  ))}
                </div>
              )}
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
