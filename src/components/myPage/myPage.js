import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import './myPage.css';
import dummy from '../../data/dummy.json';

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

const MyPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const url = '/myPage/' + '/' + pageNum;

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
        <div className="myPage_box">
          <li key={index} className="myPage_list">
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
              to={'/kanbanboard'}
              className="myPage_linkStyle"
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
      <div className="myPage_wrap">
        <div className="myPage_board">{dummyManagement}</div>
      </div>
      <div className="myPage_buttonWrap">
        <button onClick={onClickPrev} className="myPage_pageButton">
          이전 페이지
        </button>
        <span className="myPage_currentPage">{pageNum}</span>
        <button onClick={onClickNext} className="myPage_pageButton">
          다음 페이지
        </button>
      </div>
    </>
  );
};

export default MyPage;
