import React, { Component, useState } from 'react';
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
import Progress from './components/progress/progress';
import Apply from './components/applicant/Apply';
import ViewApplicant from './components/viewApplicant/viewApplicant';
import ApprovalAndRefusal from './components/approvalAndRefusal/approvalAndRefusal';
import MyPage from './components/myPage/myPage';

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
          <Route path="/apply" element={<Apply />} />
          <Route exact path="/management" element={<Management />} />
          <Route exact path="/create" element={<Create />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/kanbanboard" element={<KanbanBoard />} />
          <Route path="/progress" element={<Progress />} />
          <Route exact path="/viewapplicant/:id" element={<ViewApplicant />} />
          <Route path="/approvalandrefusal/" element={<ApprovalAndRefusal />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
