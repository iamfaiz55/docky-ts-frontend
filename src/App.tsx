// import React, { createContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Toaster } from 'sonner';
import Protected from './share/Protected';
import DocForm from './components/DocForm';
import { DocProvider } from './share/DocContext';
import NotFound from './components/NotFound';
 

const App = () => {
  return <DocProvider>
  {/* <NavbarComponent/> */}
  <BrowserRouter>
  <Toaster position="top-center" richColors  duration={1000} closeButton/>

  <NavbarComponent/>
  <Routes>
<Route path='/' element={<Protected compo={<Home/>}/>} />
<Route path='/login' element={ <Login/>} />
<Route path='/register' element={<Register/>} />
<Route path='/doc-form' element={<Protected compo={<DocForm/>}/>} />
<Route path='*' element={<NotFound/>} />
  </Routes>
  </BrowserRouter>
  
  </DocProvider>
}

export default App

 