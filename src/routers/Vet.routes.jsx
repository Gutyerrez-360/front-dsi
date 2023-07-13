import { Route, Routes } from 'react-router-dom';
import { Auth_pages, UserAndPets, Users, AgendarCita } from '../pages';
import { Vet_Layouts } from '../layouts';


import { useAuth } from '../hooks';
import { ProtectedRoute } from '../components/Admin/Auth/ProtectedRoutes';
import { Perfil } from '../pages/Auth_pages/perfil';

// const user = useAuth();

export function Vet_routes() {
  const { user } = useAuth();
  function isAdmin() {
    if (user != null) {
      const { role } = user.data;
      return role === 'admin';
    }
  }

  const Layout = (Layout, Pages) => {
    return (
      <>
        <Layout>
          <Pages />
        </Layout>
      </>
    );
  };
  return (
    <Routes>
     
    
        <Route
      element={
          <ProtectedRoute isAllowed={!!user && isAdmin()} redirectTo='/login' />
        }       
      > 
        <Route
          path='/admin/userAndPets'
          element={Layout(Vet_Layouts, UserAndPets)}></Route> 
        <Route path='/admin' element={Layout(Vet_Layouts, Auth_pages)}></Route>
        <Route path='/admin/users' element={Layout(Vet_Layouts, Users)}></Route>
        <Route path='/admin/calendar' element={Layout(Vet_Layouts, AgendarCita)}></Route>
        <Route path="/admin/users/:userId" element={<Perfil />} />
        </Route>
    </Routes>
  );
}
