import './viewApplicant.css';
import React, { useState, memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import dummy from '../../data/userInfoDummy.json';

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

  const dummy_viewApplicant = dummy.data.map((item) => {
    return (
      <>
        <button className="viewApplicant_label">
          <Link
            to={'/approvalandrefusal'}
            className="linkStyle"
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            {item.name} / {item.age} / {item.university}
          </Link>
        </button>
      </>
    );
  });

  return (
    <>
      <div className="viewApplicant_wrap">
        <h1 className="name">{data.name}</h1>
        <div className="date_loc">
          <span className="date">{data.start_date}</span>
          <span className="date"> ~ {data.end_date}</span>
          <span className="date"> / {data.location}</span>
        </div>
        <div className="teamPart">
          <span className="teamBox11">기획자 : {data.pm}명</span>
          <span className="teamBox21">개발자 : {data.developer}명</span>
          <span className="teamBox31">디자이너 : {data.designer}명</span>
        </div>
      </div>
      <div className="horizon"></div>

      <div className="viewApplicant_wrap">
        <div className="detail_content">
          <h3>{data.content}</h3>
        </div>
      </div>

      <div className="applicationStatusWrap">
        <p className="viewApplicant_p">신청 현황</p>
        <div className="applicationStatus">
          <button className="teamBox11">기획자 : {data.pm}명</button>
          <button className="teamBox21">개발자 : {data.developer}명</button>
          <button className="teamBox31">디자이너 : {data.designer}명</button>
        </div>
        <div className="status">
          <AlwaysScrollSection>{dummy_viewApplicant}</AlwaysScrollSection>
        </div>

        <div className="buttonWrap">
          <button className="button1">저장</button>
          <button className="button2">해커톤 시작</button>
        </div>
      </div>
    </>
  );
}
