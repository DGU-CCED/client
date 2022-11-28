import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/header/Header.js';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from './pages/auth/Home';
import HackathonDetail from './components/HackathonDetail';

class App extends Component{
  render(){
    return(
      <div className="App">
        <Header />
        <Routes>
          <Route path='/hackathon/list/1' element={<Home/>}/>
          <Route exact path='/hackathon/list' element={<Home/>}/>
          <Route exact path="/hackathon/detail/:id" element={<HackathonDetail/>}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
        </Routes>       
      </div>
    );
  }
}

export default App;