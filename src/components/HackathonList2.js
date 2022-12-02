import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


import './HackathonList.css';

const Styled = styled.div`
  color: white;
  .hackathonList {
    justify-content: center;
    align-items: center;
    list-style: none;
    margin-bottom: 10vh;
  }
  .linkStyle {
    text-decoration: none;
  }
  .pageButton {
    margin: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.5s;
    height: 30px;
    color: #ffffff;
    background: #84ad58;
  }
  .currentPage {
    font-size: 25px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const HackathonList2 = () => {
  // jsonplaceholder 이용 axios 및 pagination 구현
  // const [posts, setPosts] = useState([]); // json data가 array로 들어옴
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);

  // useEffect(() => {
  //     const fetchData = async () => { // async, await, axios로 data 가져옴.
  //         setLoading(true);
  //         const response = await axios.get(
  //             "/hackathon/list/newest/1"
  //         );
  //         setPosts(response.data);
  //         setLoading(false);
  //     };
  //     fetchData();
  // }, []); // 두 번째 인자로 []를 두었는데, 이렇게 하면 컴포넌트가 맨 처음 랜더링 될때만 useEffect 정의한 내용 실행
  // console.log(posts);

  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const [type, setType] = useState('newest');
  const [currentPageData, setCurrentPageData] = useState([]);
  const url = '/hackathon/list/' + type + '/' + pageNum;


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
  }, [pageNum, type]);
  

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

  const onTabHandler = (event) => {
    
    console.log(event.currentTarget.value);
    setType(event.currentTarget.value);
  }

  const thisPage = (currentPageData && currentPageData.map((item, index) => {
    return (
      <>
        <div className="hackathonBox">
          <li key={index} className="hackathonList">
            <img
              src={item.hackathon_image}
              alt="에러"
              style={{ height: '200px' }}
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
              to={'/hackathon/detail/' + item.id}
              className="linkStyle"
              style={{
                textDecoration: 'none',
                color: 'blue',
                fontWeight: 'bolder',
              }}
            >
              이동 테스트...(클릭)
            </Link>
          </li>
        </div>
      </>
    );
  }));

  return (
    <>
        <div className="hackathonTabBox">
            <span className='hackathonTabList'><button className='hackathonTab' value="popular" onClick={onTabHandler}>인기순</button></span>
            <span className='hackathonTabList'><button className='hackathonTab' value="latest" onClick={onTabHandler}>최신순</button></span>
            <span className='hackathonTabList'><button className='hackathonTab' value="bigger" onClick={onTabHandler}>규모순</button></span>
        </div>
      <Styled>
        <div className="hackathonWrap">
          <div className="hackathonBoard">{thisPage}</div>
          <div className="Pagination">
            <button onClick={onClickPrev} className="pageButton">
              이전 페이지
            </button>
            <span className="currentPage">{pageNum}</span>
            <button onClick={onClickNext} className="pageButton">
              다음 페이지
            </button>
          </div>
        </div>
      </Styled>
    </>
  );
};

export default HackathonList2;
