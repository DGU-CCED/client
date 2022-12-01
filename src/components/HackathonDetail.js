import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import dummy from '../data/dummy.json';

const Styled = styled.div`
    color: white;
`
const ApplyButton = styled.button`
    background-color: #FF008C;
    width: 150px;
    height: 50px;
    border-radius: 12px;
    font-size: 30px;
    color: white;
    font-weight: 400;
`

const HackathonDetail = () => {
    const {id} = useParams();
    

    const navigate = useNavigate();
    const onClickButton = () => {
        navigate('/apply', {state: {id: id}});
    }
    // axios로 정보 받아와야 할듯



    return(
        <>
            <Styled>
                <div>
                    <h2>About {id}</h2>
                    {/* 해커톤 정보 출력 */}

                    <p><ApplyButton onClick={onClickButton}>참가</ApplyButton></p>
                    <Link to={'/hackathon/list'} className="linkStyle" style={{textDecoration: 'none', color: 'white'}} >돌아가기(클릭)</Link>
                </div>
            </Styled>
        </>
    )
}

export default HackathonDetail;