import './approvalAndRefusal.css';
import React, { useState, memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  const [data, setData] = useState([]);

  return (
    <>
      <div className="approvalAndRefusal_wrap">
        <div className="formWrap">
          <p className="approvalAndRefusal_p">기획파트 지원서</p>
          <div className="introWrap">
            <div className="image">image</div>
            <div className="intro">
              <p className="approvalAndRefusal_p2">이름: 홍민기</p>
              <p className="approvalAndRefusal_p2">나이: 24</p>
              <p className="approvalAndRefusal_p2">학교: 동국대학교</p>
              <p className="approvalAndRefusal_p2">전공: 컴퓨터공학</p>
            </div>
          </div>
          <p className="approvalAndRefusal_p">자기소개</p>
          <div className="selfIntro">
            <AlwaysScrollSection>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
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
