import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dummy from '../data/dummy.json';
import moment from "moment";

import './HackathonList.css';

const Styled = styled.div``;

const Tab = (props) => {
  const tabName = props.tab.tabName;
  const isOn = props.tab.isOn;
  const tabId = props.tab.id;

  const changeTab = () => {
    document.querySelector('.tabList li a.on').classList.remove('on');
    document.querySelector('.tabList li a#' + tabId).classList.add('on');
  };

  return (
    <li role="presentation" style={{ minWidth: props.minWidth + 'px' }}>
      <a
        href="#"
        role="tab"
        tabIndex="0"
        id={tabId}
        aria-selected={isOn.toString()}
        className={isOn ? 'on' : ''}
        onClick={changeTab}
      >
        <span>{tabName}</span>
      </a>
    </li>
  );
};

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
    setPageNum(1);
  };

  function change_date(published_at) {
    var date = moment(published_at, "YY.MM.DD");
    date.format();
    return date
  }

  const thisPage =
    currentPageData &&
    currentPageData.map((item, index) => {
      return (
        <>
          <div className="hackathonBox">
            <div key={index} className="hackathonList">
              <img
                src={item.hackathon_image}
                alt="에러"
                style={{ width: '300px', height: '200px' }}
              />
              <div className='nameWrapper'>
                <p className='hackathon_p'> {item.name}</p>
              </div>
              <div className='nameWrapper'>
                <p>
                  {(item.start_date).substring(0, 10)} ~ {(item.end_date).substring(0, 10)}
                </p>
              </div>
              {/* <p>{item.content}</p> */}
              <div className='circleWrapper'>
                <div className='pm_circle'>
                  {item.pm}
                </div>
                <div className='developer_circle'>
                  {item.developer}
                </div>
                <div className='designer_circle'>
                  {item.designer}
                </div>
              </div>

              <div className='linkWrapper'>
                <Link
                  to={'/hackathon/detail/' + item.id}
                  className="linkStyle"
                  style={{
                    textDecoration: 'none',
                    color: 'blue',
                    fontWeight: 'bolder',
                  }}
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          </div>
        </>
      );
    });

  const tabList = [
    { tabName: '인기순', id: 'popular', isOn: true },
    { tabName: '최신순', id: 'newest', isOn: false },
    { tabName: '규모순', id: 'size', isOn: false },
    // 각 Tab의 넓이 지정
  ];

  var minWidth = Math.floor(100 / tabList.length);

  return (
    <>
      {/* <div className="tabBox">
        <ul className="tabList" role="tablist">
          {tabList &&
            tabList.map((v) => {
              return <Tab key={v.id} tab={v} minWidth={minWidth} />;
            })}
        </ul>
      </div> */}
      <div className="tabBox">
        <span>
          <button
            className="hackathonList_butt"
            value="popular"
            onClick={onTabHandler}
          >
            인기순
          </button>
        </span>
        <span>
          <button
            className="hackathonList_butt"
            value="newest"
            onClick={onTabHandler}
          >
            최신순
          </button>
        </span>
        <span>
          <button
            className="hackathonList_butt"
            value="size"
            onClick={onTabHandler}
          >
            규모순
          </button>
        </span>
      </div>

      <div className="hackathonWrap">
        <div className="hackathonBoard">{thisPage}</div>
      </div>
      <div className="Pagination">
        <button onClick={onClickPrev} className="pageButton">
          이전 페이지
        </button>
        <span className="currentPage">{pageNum}</span>
        <button onClick={onClickNext} className="pageButton">
          다음 페이지
        </button>
      </div>
    </>
  );
};

export default HackathonList2;
