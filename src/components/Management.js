import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CreateHackathon = styled.div`
    .createHackathonButton{
        margin: 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.5s;
        height:30px;
        color: #ffffff;
        background: #84AD58;
    }
`

const Management = () => {

    const navigate = useNavigate();

    const create = (event) => {
        navigate('/create');
    }

    return(
        <>
        <CreateHackathon>
            <button className='createHackathonButton' onClick={create}>대회 개설하기</button>
        </CreateHackathon>
        <p style={{color: 'white'}}>대회관리 종료</p>
        </>
    );
}

export default Management;