import React, { useState } from 'react';
import { FaBatteryQuarter } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import './Apply.css';

const Style = styled.div`
  color: white;
`;

const Apply = () => {
  const location = useLocation();
  const [part, setPart] = useState('');
  const [description, setDescription] = useState('');
  // const config = {
  //     headers: {
  //         Authorization: Bearer $;
  //     }
  // }
  const id = location.state.id; // 이 해커톤 아이디로 정보 조회

  const navigate = useNavigate();

  const onPartHandler = (event) => {
    console.log(event.currentTarget.value);
    setPart(event.currentTarget.value);
  };
  const onDescriptionHandler = (event) => {
    setDescription(event.currentTarget.value);
  };
  const onClickButton = (event) => {
    event.preventDefault();

    navigate('/hackathon/list');
  };

  return (
    <>
      <Style>
        <h1>해커톤 정보 출력...</h1>
        <h2>hi</h2>
        <h1>{id}</h1>
        <form className="form">
          <div className="apply_teamPart">
            <h3 className="text_part">직군 선택</h3>
          </div>
          <div className="teamPartSelect">
            <span className="teamBox1">
              <input
                type="radio"
                value="pm"
                checked={part === 'pm'}
                onChange={onPartHandler}
              />
              <label>기획자</label>
            </span>
            <span className="teamBox2">
              <input
                type="radio"
                value="developer"
                checked={part === 'developer'}
                onChange={onPartHandler}
              />
              <label>개발자</label>
            </span>
            <span className="teamBox3">
              <input
                type="radio"
                value="designer"
                checked={part === 'designer'}
                onChange={onPartHandler}
              />
              <label>개발자</label>
            </span>
          </div>

          <div className="description">
            <h3 className="text_desc">자기 소개</h3>
            <textarea
              className="applicant_desc"
              rows={1}
              name="description"
              type="textarea"
              wrap="on"
              placeholder="자기소개"
              value={description}
              onChange={onDescriptionHandler}
            />
          </div>
          <div className="buttonWrapper">
            <button type="submit" onClick={onClickButton} className="submit">
              참가 제출
            </button>
          </div>
        </form>
      </Style>
    </>
  );
};

export default Apply;
