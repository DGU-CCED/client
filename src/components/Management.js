import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import './Management.css';
import dummy from '../data/dummy.json';

const CreateHackathon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .createHackathonButton {
    margin: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.5s;
    height: 30px;
    color: #ffffff;
    background: #84ad58;
  }
`;

const Management = () => {
  const navigate = useNavigate();

  const create = (event) => {
    navigate('/create');
  };

  const [pageNum, setPageNum] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const url = '/management/' + '/' + pageNum;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setCurrentPageData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [pageNum]);

  const onClickPrev = (event) => {
    if (pageNum === 1) {
      console.log(pageNum);
      alert('첫 페이지 입니다.');
      return;
    }
    setPageNum(pageNum - 1);
    console.log(pageNum - 1);
  };
  const onClickNext = (event) => {
    setPageNum(pageNum + 1);
    console.log(pageNum + 1);
  };

  const dummyManagement = dummy.data.map((item, index) => {
    return (
      <>
        <div className="management_box">
          <li key={index} className="management_list">
            <img
              src={item.hackathon_image}
              alt="에러"
              style={{ width: '300px', height: '200px' }}
            />
            <p>{item.name}</p>
            <p>
              {item.start_date} ~ {item.end_date}
            </p>
            <p>{item.content}</p>
            <p>
              개발자 : {item.developer} PM : {item.pm} 디자이너 :{' '}
              {item.designer}
            </p>
            <Link
              to={'/viewApplicant'}
              className="management_linkStyle"
              style={{
                textDecoration: 'none',
                color: 'blue',
                fontWeight: 'bolder',
              }}
            >
              이동
            </Link>
          </li>
        </div>
      </>
    );
  });

  return (
    <>
      <CreateHackathon>
        <button className="createHackathonButton" onClick={create}>
          대회 개설하기
        </button>
      </CreateHackathon>

      {/* <p style={{ color: 'white' }}>대회관리 종료</p> */}

      <div className="management_wrap">
        <div className="management_board">{dummyManagement}</div>
      </div>
      <div className="management_buttonWrap">
        <button onClick={onClickPrev} className="management_pageButton">
          이전 페이지
        </button>
        <span className="management_currentPage">{pageNum}</span>
        <button onClick={onClickNext} className="management_pageButton">
          다음 페이지
        </button>
      </div>
    </>
  );
};

export default Management;
