import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaBatteryQuarter } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import './Apply.css';

const Style = styled.div`
  color: white;
`;

const Apply = () => {
  const [data, setData] = useState([]);
  
  const location = useLocation();
  const [part, setPart] = useState('');
  const [description, setDescription] = useState('');

  const id = location.state.id; // 이 해커톤 아이디로 정보 조회
  const url = '/hackathon/detail/'+ id;

  const style = {
    backgroundImage: 'url(' + data.hackathon_image + ')',
  };

  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const onPartHandler = (event) => {
    console.log(event.currentTarget.value);
    setPart(event.currentTarget.value);
  };
  const onDescriptionHandler = (event) => {
    setDescription(event.currentTarget.value);
  };
  const onClickButton = (event) => {
    event.preventDefault();
    axios.post('/applicant/apply',{
      user_id: localStorage.getItem("userId"),
      hackathon_id: id,
      part: part,
      self_introduction: description
    }).then((response) => {
      if(response.data !== ''){
        alert("참가 신청 완료");
        navigate('/hackathon/list');
      } else {
        alert('신청 실패');
      }
    }).catch(((error) => {
      console.log(error);
      alert('신청 실패');
    }))
    // navigate('/hackathon/list');
  };
  const onClickBack = (event) => {
    event.preventDefault();
    navigate(-1);
  }

  return (
    <>
      <Style>
          <div className="hackathonDetail_wrap" style={style}>
            <h1 className="name">{data.name}</h1>
            <div className="date_loc">
              <span className="date">{data.start_date}</span>
              <span className="date"> ~ {data.end_date}</span>
              <span className="date"> / {data.location}</span>
            </div>
            <div className="hackathonDetail_teamPart">
              <span className="teamBox11">기획자 : {data.pm}명</span>
              <span className="teamBox21">개발자 : {data.developer}명</span>
              <span className="teamBox31">디자이너 : {data.designer}명</span>
            </div>
          </div>
          <div className="horizon"></div>
        
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
              <label>디자이너</label>
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
            <button className="submit1" onClick={onClickBack}>뒤로 가기</button>
          </div>
        </form>
      </Style>
    </>
  );
};

export default Apply;
