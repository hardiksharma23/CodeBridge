import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='w-screen min-h-screen bg-bg2 flex flex-col'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
