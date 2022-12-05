import './approvalAndRefusal.css';
import React, { useState, memo, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AlwaysScrollSection = memo((props) => {
  const { children } = props;
  return <StyledAlwaysScrollSection>{children}</StyledAlwaysScrollSection>;
});

const StyledAlwaysScrollSection = styled.div`
  overflow: scroll;
  height: 200px;
  &::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 8px;

    /* 가로 스크롤 높이 */
    height: 0px;

    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

export default function () {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('hackathonId');
  const user_id = searchParams.get('userid');
  const user_part = searchParams.get('part');
  const [data, setData] = useState([]);

  const url = '/applicant/'+id+'/'+user_id+'/'+user_part;
  useEffect(() => {
    const getData = async() => {
      try{
        const response = await axios.get(url);
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="approvalAndRefusal_wrap">
        <div className="formWrap">
          <p className="approvalAndRefusal_p">{user_part}파트 지원서</p>
          <div className="introWrap">
            <div className="image">image</div>
            <div className="intro">
              <p className="approvalAndRefusal_p2">이름: {data.name}</p>
              <p className="approvalAndRefusal_p2">나이: {data.age}</p>
              <p className="approvalAndRefusal_p2">학교: {data.institution}</p>
              <p className="approvalAndRefusal_p2">전공: {data.major}</p>
            </div>
          </div>
          <p className="approvalAndRefusal_p">자기소개</p>
          <div className="selfIntro">
            <AlwaysScrollSection>
              {data.self_Introduction}
            </AlwaysScrollSection>
          </div>
          <div className="approvalAndRefusal_buttonWrap">
            <button className="approvalAndRefusal_button1">참가 승인</button>
            <button className="approvalAndRefusal_button2">승인 거절</button>
          </div>
        </div>
      </div>
    </>
  );
}
