const config = {
  baseApi: import.meta.env.VITE_BASE_API,
  basePath: import.meta.env.VITE_BASE_PATH,
  baseSupabases: import.meta.env.VITE_BASE_SUPABASE,
};

const configApiBackend = {
  login: import.meta.env.VITE_LOGIN,
  googleAuth: import.meta.env.VITE_GOOGLEAUTH,
  forgotPassword: import.meta.env.VITE_FORGOTPASSWORD,
  changePassword: import.meta.env.VITE_CHANGEPASSWORD,
  users: import.meta.env.VITE_USERS,
  refreshAccessToken: import.meta.env.VITE_REFRESH_ACCESS_TOKEN,
  pets: import.meta.env.VITE_PETS,
  species: import.meta.env.VITE_SPECIES,
  appointments: import.meta.env.VITE_APPOINTMENTS,
  files: import.meta.env.VITE_FILE,
};

const configJwt = {
  access: import.meta.env.VITE_ACCESS,
  refresh: import.meta.env.VITE_REFRESH,
  providerToken: import.meta.env.VITE_PROVIDERTOKEN,
};

export { config, configApiBackend, configJwt };
