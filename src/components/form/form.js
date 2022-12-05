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
      content: '해커톤의 전체적인 구성은 만족스러웠나요?',
    },
    {
      id: 2,
      content: '해커톤의 전체적인 구성은 만족스러웠나요?',
    },
    {
      id: 3,
      content: '해커톤의 전체적인 구성은 만족스러웠나요?',
    },
    {
      id: 4,
      content: '해커톤의 전체적인 구성은 만족스러웠나요?',
    },
    {
      id: 5,
      content: '해커톤의 전체적인 구성은 만족스러웠나요?',
    },
  ]);

  return (
    <div className="form_background">
      <AlwaysScrollSection>
        <div className="form_wrapper">
          <p className="form_title">만족도 조사</p>
          {team.map((section) => (
            <div>
              <div className="p_wrap">
                <p className="form_p">{section.id}. </p>
              </div>
              <div className="form_formWrapper">
                <div className="question">
                  <p>{section.content}</p>
                </div>
                <div className="answer">
                  <p>예</p>
                  <input type="radio" name="answer" value="yes"></input>
                  <p className="form_p2">아니오</p>
                  <input type="radio" name="answer" value="no"></input>
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
