import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import dummy from '../data/dummy.json';
import './HackathonList.css';
import Posts from './Posts';
import Pagination from './Pagination';

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

const HackathonList = () => {
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

  let currentPageHackathon = dummy.data.filter(
    (v) => v.id >= (pageNum - 1) * 3 + 1 && v.id <= pageNum * 3
  );

  // const getData = async() => {
  //     axios.get(url)
  //     .then((res) => {
  //         setCurrentPageData(res.data);
  //         console.log("성공");
  //         console.log(currentPageData);
  //     })
  //     .catch((error) => {
  //         console.log(error);
  //     })
  // }

  // useEffect(() => {
  //     getData();
  // }, [pageNum]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setCurrentPageData(response.data.data);
        console.log(currentPageData[0].name);
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

  /*// pagination 추가 부분
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
      let currentPosts = 0;
      currentPosts = posts.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    };*/

  // const hackathonList = posts.map((post) => {
  //     return(
  //         <li key={post.id} className="hackathonList">
  //             <p>{post.title}</p>
  //             <p>{post.date}</p>
  //             <Link to={'/hackathon/detail/'+post.id} className="linkStyle" style={{textDecoration: 'none', color: 'white'}} >이동 테스트...(클릭)</Link>
  //         </li>
  //     );
  // });

  const dummyHackathon = dummy.data.map((item, index) => {
    return (
      <>
        <div className="hackathonBox">
          <li key={index} className="hackathonList">
            {/* <img src="../.././assets/bubbleson.jpeg" alt="에러" style={{maxWidth: '100%'}}/> */}
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
  });

  const thisPage = currentPageData.map((item, index) => {
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
  });

  return (
    <>
      <Styled>
        {/* <Posts posts={currentPosts(posts)} loading={loading} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={setCurrentPage}/> */}
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

export default HackathonList;
