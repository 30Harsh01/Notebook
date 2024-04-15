// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './contex/notes/NoteState';
import Login from './component/Login';
import Signup from './component/Signup';
import Alert from './component/Alert';
import { useState } from 'react';


function App() {
  const[alert,setAlert]=useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div><Alert alert={alert} /></div>
          <div className="container ">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              <Route exact path='/about' element={<About/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
