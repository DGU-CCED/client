import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import './HackathonDetail.css';
import dummy from '../data/dummy.json';

const Styled = styled.div`
  color: white;
`;
const ApplyButton = styled.button`
  background-color: #ff008c;
  width: 150px;
  height: 50px;
  border-radius: 12px;
  font-size: 30px;
  color: white;
  font-weight: 400;
`;

const HackathonDetail = () => {
  const { id } = useParams();
  const [hackathon_id, setHackathonId] = useState('');
  const [data, setData] = useState([]);
  const url = '/hackathon/detail/' + id;

  const style = {
    backgroundImage: 'url(' + data.hackathon_image + ')',
  };

  const navigate = useNavigate();
  const onClickButton = () => {
    navigate('/apply', { state: { id: id } });
  };
  // axios로 정보 받아와야 할듯
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  const onClickBack = () => {
    navigate(-1);
  }

  return (
    <>
      <div className="hackathonDetail_wrap" style={style}>
        <h1 className="name">{data.name}</h1>
        <div className="date_loc">
          <span className="date">{data.start_date}</span>
          <span className="date"> ~ {data.end_date}</span>
          <span className="date"> / {data.location}</span>
        </div>
        <div className="hackathonDetail_teamPart">
          <span className="teamBox11">기획자 : {data.pm}명</span>
          <span className="teamBox21">개발자 : {data.developer}명</span>
          <span className="teamBox31">디자이너 : {data.designer}명</span>
        </div>
      </div>
      <div className="horizon"></div>

      <div className="hackathonDetail_wrap2">
        <div className="detail_content">
          <h3>{data.content}</h3>
        </div>
      </div>

      <Styled>
        <div>
          {/* 해커톤 정보 출력 */}
          <p>
            <ApplyButton className="applybutton" onClick={onClickButton}>
              참가
            </ApplyButton>
          </p>
          {/* <Link
            to={'/hackathon/list'}
            className="linkStyle"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            돌아가기(클릭)
          </Link> */}
          <ApplyButton className="applybutton" onClick={onClickBack}>
            back
          </ApplyButton>
        </div>
      </Styled>
    </>
  );
};

export default HackathonDetail;
