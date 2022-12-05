import { Line } from 'rc-progress';
import './progress.scss';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import React, { memo } from 'react';
import styled from 'styled-components';

const AlwaysScrollSection = memo((props) => {
  const { children } = props;
  return <StyledAlwaysScrollSection>{children}</StyledAlwaysScrollSection>;
});

const StyledAlwaysScrollSection = styled.div`
  overflow: scroll;
  height: 100%;
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
  const [team, setState] = useState([
    {
      id: 1,
      percent: 50,
    },
    {
      id: 2,
      percent: 60,
    },
    {
      id: 3,
      percent: 40,
    },
    {
      id: 4,
      percent: 50,
    },
    {
      id: 5,
      percent: 50,
    },
  ]);

  return (
    <div className="progress_background">
      <AlwaysScrollSection>
        <div className="progress_wrapper">
          <div>
            <p className="title">해커톤 진행률</p>
          </div>
          <div>
            <p className="subTitle">전체 진행도</p>
            <div className="progress_progressWrapper">
              <div className="progress">
                <Line percent="50"></Line>
              </div>
              <p>50%</p>
            </div>
          </div>
          <div>
            <p className="subTitle">각 팀별 진행도</p>
            {team.map((section) => (
              <div>
                <p className="progress_p">{section.id}팀</p>
                <div className="progress_progressWrapper">
                  <div className="progress">
                    <Line percent={section.percent}></Line>
                  </div>
                  <Link
                    to={'/kanbanboard'}
                    className="linkStyle"
                    style={{
                      textDecoration: 'none',
                      color: '#ff008c',
                      fontWeight: 'bolder',
                    }}
                  >
                    이동
                  </Link>
                </div>
                <p>{section.percent}%</p>
              </div>
            ))}
          </div>
        </div>
      </AlwaysScrollSection>
    </div>
  );
}
