import { Line } from 'rc-progress';
import './form.css';
import { useState, useEffect, useRef } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import React, { memo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HackathonDetail from '../HackathonDetail';

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
  const navigate = useNavigate();
  const [ans1, setAns1] = useState(1);
  const [ans2, setAns2] = useState(1);
  const [ans3, setAns3] = useState(1);
  const [ans4, setAns4] = useState(1);
  const [ans5, setAns5] = useState(1);
  const [ans6, setAns6] = useState(1);
  const [ans7, setAns7] = useState(1);

  const user_id = Number(localStorage.getItem("userId"));
  const hackathon_id = Number(useParams().hackathon_id);


  const ans1Handler = (event) => {
    console.log(Number(event.currentTarget.value));
    setAns1(Number(event.currentTarget.value));
  }
  const ans2Handler = (event) => {
    console.log(Number(event.currentTarget.value));
    setAns2(Number(event.currentTarget.value));
  }
  const ans3Handler = (event) => {
    console.log(Number(event.currentTarget.value));
    setAns3(Number(event.currentTarget.value));
  }
  const ans4Handler = (event) => {
    console.log(Number(event.currentTarget.value));
    setAns4(Number(event.currentTarget.value));
  }
  const ans5Handler = (event) => {
    console.log(Number(event.currentTarget.value));
    setAns5(Number(event.currentTarget.value));
  }
  const ans6Handler = (event) => {
    console.log(Number(event.currentTarget.value));
    setAns6(Number(event.currentTarget.value));
  }
  const ans7Handler = (event) => {
    console.log(Number(event.currentTarget.value));
    setAns7(Number(event.currentTarget.value));
  }

  const formSubmit = (event) => {
    event.preventDefault();

    axios.defaults.withCredentials = false;
    axios.post('/survey', {
      hackathon_id: hackathon_id,
      user_id: user_id,
      q1: ans1,
      q2: ans2,
      q3: ans3,
      q4: ans4,
      q5: ans5,
      q6: ans6,
      q7: ans7
    })
      .then((response) => {
        alert('설문 조사 완료');
        navigate('/hackathon/list');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="form_background">
      <AlwaysScrollSection>
        <div className="form_wrapper">
          <p className="form_title">만족도 조사</p>
          <p className='form_desc'>설문 조사 결과는 더 나은 서비스를 위해 익명으로 사용될 예정입니다.</p>
          <div>
            <p className="form_p">1. </p>
            <div className="form_formWrapper">
              <div className='question'>
                <p>제공된 가이드라인은 해커톤을 진행하며 도움이 되었나요?</p>
              </div>
              <div className='answer'>
                <p>1</p><input type="radio" checked={ans1 === 1} name="answer1" value="1" onChange={ans1Handler}></input>
                <p className="form_p2">2</p><input type="radio" checked={ans1 === 2} name="answer1" value="2" onChange={ans1Handler}></input>
                <p className="form_p2">3</p><input type="radio" checked={ans1 === 3} name="answer1" value="3" onChange={ans1Handler}></input>
                <p className="form_p2">4</p><input type="radio" checked={ans1 === 4} name="answer1" value="4" onChange={ans1Handler}></input>
                <p className="form_p2">5</p><input type="radio" checked={ans1 === 5} name="answer1" value="5" onChange={ans1Handler}></input>
              </div>
            </div>
          </div>

          <div>
            <p className="form_p">2. </p>
            <div className="form_formWrapper">
              <div className='question'>
                <p>제공된 타임라인은 해커톤을 진행하며 도움이 되었나요?</p>
              </div>
              <div className='answer'>
                <p>1</p><input type="radio" checked={ans2 === 1} name="answer2" value="1" onChange={ans2Handler}></input>
                <p className="form_p2">2</p><input type="radio" checked={ans2 === 2} name="answer2" value="2" onChange={ans2Handler}></input>
                <p className="form_p2">3</p><input type="radio" checked={ans2 === 3} name="answer2" value="3" onChange={ans2Handler}></input>
                <p className="form_p2">4</p><input type="radio" checked={ans2 === 4} name="answer2" value="4" onChange={ans2Handler}></input>
                <p className="form_p2">5</p><input type="radio" checked={ans2 === 5} name="answer2" value="5" onChange={ans2Handler}></input>
              </div>
            </div>
          </div>

          <div>
            <p className="form_p">3. </p>
            <div className="form_formWrapper">
              <div className='question'>
                <p>제공된 파트별 공간은 해커톤을 진행하며 도움이 되었나요?</p>
              </div>
              <div className='answer'>
                <p>1</p><input type="radio" checked={ans3 === 1} name="answer3" value="1" onChange={ans3Handler}></input>
                <p className="form_p2">2</p><input type="radio" checked={ans3 === 2} name="answer3" value="2" onChange={ans3Handler}></input>
                <p className="form_p2">3</p><input type="radio" checked={ans3 === 3} name="answer3" value="3" onChange={ans3Handler}></input>
                <p className="form_p2">4</p><input type="radio" checked={ans3 === 4} name="answer3" value="4" onChange={ans3Handler}></input>
                <p className="form_p2">5</p><input type="radio" checked={ans3 === 5} name="answer3" value="5" onChange={ans3Handler}></input>
              </div>
            </div>
          </div>

          <div>
            <p className="form_p">4. </p>
            <div className="form_formWrapper">
              <div className='question'>
                <p>해커톤의 주제는 적합하였나요?</p>
              </div>
              <div className='answer'>
                <p>1</p><input type="radio" checked={ans4 === 1} name="answer4" value="1" onChange={ans4Handler}></input>
                <p className="form_p2">2</p><input type="radio" checked={ans4 === 2} name="answer4" value="2" onChange={ans4Handler}></input>
                <p className="form_p2">3</p><input type="radio" checked={ans4 === 3} name="answer4" value="3" onChange={ans4Handler}></input>
                <p className="form_p2">4</p><input type="radio" checked={ans4 === 4} name="answer4" value="4" onChange={ans4Handler}></input>
                <p className="form_p2">5</p><input type="radio" checked={ans4 === 5} name="answer4" value="5" onChange={ans4Handler}></input>
              </div>
            </div>
          </div>

          <div>
            <p className="form_p">5. </p>
            <div className="form_formWrapper">
              <div className='question'>
                <p>해커톤 운영은 잘 진행되었나요?</p>
              </div>
              <div className='answer'>
                <p>1</p><input type="radio" checked={ans5 === 1} name="answer5" value="1" onChange={ans5Handler}></input>
                <p className="form_p2">2</p><input type="radio" checked={ans5 === 2} name="answer5" value="2" onChange={ans5Handler}></input>
                <p className="form_p2">3</p><input type="radio" checked={ans5 === 3} name="answer5" value="3" onChange={ans5Handler}></input>
                <p className="form_p2">4</p><input type="radio" checked={ans5 === 4} name="answer5" value="4" onChange={ans5Handler}></input>
                <p className="form_p2">5</p><input type="radio" checked={ans5 === 5} name="answer5" value="5" onChange={ans5Handler}></input>
              </div>
            </div>
          </div>

          <div>
            <p className="form_p">6. </p>
            <div className="form_formWrapper">
              <div className='question'>
                <p>해커톤의 팀 빌딩은 원할하게 진행 되었나요?</p>
              </div>
              <div className='answer'>
                <p>1</p><input type="radio" checked={ans6 === 1} name="answer6" value="1" onChange={ans6Handler}></input>
                <p className="form_p2">2</p><input type="radio" checked={ans6 === 2} name="answer6" value="2" onChange={ans6Handler}></input>
                <p className="form_p2">3</p><input type="radio" checked={ans6 === 3} name="answer6" value="3" onChange={ans6Handler}></input>
                <p className="form_p2">4</p><input type="radio" checked={ans6 === 4} name="answer6" value="4" onChange={ans6Handler}></input>
                <p className="form_p2">5</p><input type="radio" checked={ans6 === 5} name="answer6" value="5" onChange={ans6Handler}></input>
              </div>
            </div>
          </div>

          <div>
            <p className="form_p">7. </p>
            <div className="form_formWrapper">
              <div className='question'>
                <p>같이 진행한 팀원들은 열심히 참여하였나요?</p>
              </div>
              <div className='answer'>
                <p>1</p><input type="radio" checked={ans7 === 1} name="answer7" value="1" onChange={ans7Handler}></input>
                <p className="form_p2">2</p><input type="radio" checked={ans7 === 2} name="answer7" value="2" onChange={ans7Handler}></input>
                <p className="form_p2">3</p><input type="radio" checked={ans7 === 3} name="answer7" value="3" onChange={ans7Handler}></input>
                <p className="form_p2">4</p><input type="radio" checked={ans7 === 4} name="answer7" value="4" onChange={ans7Handler}></input>
                <p className="form_p2">5</p><input type="radio" checked={ans7 === 5} name="answer7" value="5" onChange={ans7Handler}></input>
              </div>
            </div>
          </div>

        </div>
        <div className="form_buttonWrap">
          <button className="form_button" onClick={formSubmit}>제출</button>
        </div>
      </AlwaysScrollSection>
    </div>
  );
}
