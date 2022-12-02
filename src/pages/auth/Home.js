import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TabList from '../../components/TabList';
import HackathonList from '../../components/HackathonList';
import HackathonList2 from '../../components/HackathonList2';

import "./Home.css"


function Home() {

  return (
    <div class="home-container">
      <div class="home_select">
        <TabList />
      </div>
      <div class="home_list">
        <HackathonList />
        <HackathonList2 />
      </div>
    </div>
  );
}

export default Home;
