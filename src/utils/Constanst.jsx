const SERVER_IP = 'localhost:3000';

// Se crea este documento para que todos cuando ejecuten alguna peticion y la ruta no exista
// Solo se tenga que modificar la variable que se invoque
export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`, // URL que renderiza la app
  BASE_API: `http://${SERVER_IP}/api/v1`, // Esta url cambiará segun como se defina en el back

  API_ROUTES: {
    //Todo esto seran los mismos nombres de las rutas del back segun como se defina
    LOGIN: 'auth/login',
    REGISTER: 'users',
    FORGOPASSWORD: 'auth/forgotPassword',
    CHANGEPASSWORD: 'auth/change-password',
    USERS: 'users',
    USERS_ID: 'users',
    REFRESH_ACCESS_TOKEN: 'auth/refreshToken'
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
