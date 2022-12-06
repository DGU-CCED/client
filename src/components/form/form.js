import { Line } from 'rc-progress';
import './form.css';
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
      content: '제공된 가이드라인은 해커톤을 진행하며 도움이 되었나요?',
    },
    {
      id: 2,
      content: '제공된 타임라인은 해커톤을 진행하며 도움이 되었나요?',
    },
    {
      id: 3,
      content: '제공된 파트별 공간은 해커톤을 진행하며 도움이 이되었나요?',
    },
    {
      id: 4,
      content: '해커톤의 주제는 적합하였나요?',
    },
    {
      id: 5,
      content: '해커톤 운영은 잘 진행되었나요?',
    },
    {
      id: 6,
      content: '해커톤의 팀 빌딩은 원할하게 진행 되었나요?',
    },
    {
      id: 7,
      content: '같이 진행한 팀원들은 열심히 참여하였나요?',
    },
  ]);

  return (
    <div className="form_background">
      <AlwaysScrollSection>
        <div className="form_wrapper">
          <p className="form_title">만족도 조사</p>
          {team.map((section) => (
            <div>
              <p className="form_p">{section.id}. </p>
              <div className="form_formWrapper">
                <div className="question">
                  <p>{section.content}</p>
                </div>
                <div className="answer">
                  <p>1</p>
                  <input type="radio" name="answer" value="1"></input>
                  <p className="form_p2">2</p>
                  <input type="radio" name="answer" value="2"></input>
                  <p className="form_p2">3</p>
                  <input type="radio" name="answer" value="3"></input>
                  <p className="form_p2">4</p>
                  <input type="radio" name="answer" value="4"></input>
                  <p className="form_p2">5</p>
                  <input type="radio" name="answer" value="5"></input>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="form_buttonWrap">
          <button className="form_button">제출</button>
        </div>
      </AlwaysScrollSection>
    </div>
  );
}
