import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import OpenRoute from './components/auth/OpenRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import UploadProject from './pages/UploadProject';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/Dashboard/MyProfile';
import MyProjects from './components/Dashboard/MyProjects';
import Settings from './components/Dashboard/Settings';
import AllProjects from './pages/AllProjects';
import Footer from './components/Footer';
import ProjectDetails from './components/ProjectDetails';
import UserDetails from './components/UserDetails';
import SearchProjects from './components/SearchProjects';


function App() {
  return (
    <div className='w-screen min-h-screen bg-bg2 flex flex-col'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route 
          path="/signup" 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }/>
        <Route 
          path="/login" 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }/>

        <Route 
          path="/verify-email" 
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />

          <Route path="dashboard/my-projects" element={<MyProjects />} />
          <Route path="dashboard/settings" element={<Settings/>} />

        </Route>

        <Route
          path='/uploadProject'
          element={
            <PrivateRoute>
              <UploadProject/>
            </PrivateRoute>
          }
        
        />

        <Route path='/projects' element={<AllProjects/>} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />

        <Route path="/auth/:userId" element={<UserDetails />} />

        <Route path="/project/search" element={<SearchProjects />} />
        
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
