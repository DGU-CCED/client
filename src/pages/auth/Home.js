import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TabList from '../../components/TabList';
import HackathonList from '../../components/HackathonList';
import "./Home.css"

function Home() {
    return(
        <div class="home-container">
            <div class="home_select">
                <TabList />
                <HackathonList />
            </div>
            
            <div class="test">홈화면 종료</div>
        </div>
    );
}

export default Home;