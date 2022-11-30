import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/header/Header.js';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Home from './pages/auth/Home';
import HackathonDetail from './components/HackathonDetail';
import Management from './components/Management';
import Create from './components/Create';
import KanbanBoard from './components/kanban/index';
import FreeSpace from './components/freespace/Editor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/hackathon/list/1" element={<Home />} />
          <Route exact path="/hackathon/list" element={<Home />} />
          <Route
            exact
            path="/hackathon/detail/:id"
            element={<HackathonDetail />}
          />
          <Route exact path="/management" element={<Management />} />
          <Route exact path="/create" element={<Create />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/kanbanboard" element={<KanbanBoard />} />
          <Route path="/freespace" element={<FreeSpace />} />
        </Routes>
      </div>
    );
  }
}

export default App;
