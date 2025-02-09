import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import {useAuthStore } from "../src/store/useAuthStore.js";
import {useEffect} from "react";

function App() {
  const {authUser,checkAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth()
    },
  [checkAuth]);

  console.log({authUser});

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
