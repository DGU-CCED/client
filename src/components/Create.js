import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // DatePicker 라는 컴포넌트도 가져오깅

import 'react-datepicker/dist/react-datepicker.css'; // 스타일 맥이기
import './react-datepicker.css';
import './Create.css';

const ImgPreview = styled.img`
  border: 3px solid #ffffff;
  border-style: solid;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30%;
`;

const UploadImage = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30%;
`;

const Create = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState('');
    const [pm, setPm] = useState(0);
    const [developer, setDeveloper] = useState(0);
    const [designer, setDesigner] = useState(0);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [img, setImg] = useState('');
    const owner_id = Number(localStorage.getItem("userId"));
    const created_time = new Date();
  

  //   const formSubmit = (e) => {
  //     const img = e.target.files[0];
  //     const formData = new FormData();
  //     formData.append('file', img);


    const formSubmit = (event) => {
        const formData = new FormData();
        formData.append("images", event.target.files[0]);
        axios.post('/image', formData)
        .then((response) => {
           setImg(response.data.data);
           console.log(response.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };
    const onLocationHandler = (event) => {
        setLocation(event.currentTarget.value);
    };
    const onStartDateHandler = (event) => {
        setStartDate(event.currentTarget.value);
    };
    const onEndDateHandler = (event) => {
        setEndDate(event.currentTarget.value);

        console.log(startDate);
    };
    const onPmHandler = (event) => {
        setPm(event.currentTarget.value);
    };
    const onDeveloperHandler = (event) => {
        setDeveloper(event.currentTarget.value);
    };
    const onDesignerHandler = (event) => {
        setDesigner(event.currentTarget.value);
    };
    const onDescriptionHandler = (event) => {
        setDescription(event.currentTarget.value);
       
    };
    const onClickButton = (event) => {

        axios.defaults.withCredentials=false;
        event.preventDefault();
        axios.post('/hackathon/create',{
            owner_id: owner_id,
            name: name,
            start_date: startDate,
            end_date: endDate,
            location: location,
            content: description,
            developer: Number(developer),
            pm: Number(pm),
            designer: Number(designer),
            hackathon_image: img,
            views: 0,
            is_progress: false,
            created_time: created_time,
            tag: "해커톤",
        })
        .then((response) => {
            if(response.data.data !== ""){
                let h_title = response.data.data.name;
                alert({h_title}+" 개설 성공");
                navigate('/management');
            } else {
                alert("개설 실패");
            }
        })
        .catch((error) => {
            console.log(error);
            alert("개설 실패");
        })
        // navigate('/management');
    };

  

  const getFormattedDate = (date) => {
    const month = date.toLocaleDateString('ko-KR', {
      month: 'long',
    });

    const day = date.toLocaleDateString('ko-KR', {
      day: 'numeric',
    });

    return `${month.substr(0, month.length - 1)}/${day.substr(
      0,
      day.length - 1
    )}`;
  };

  // 요일 반환
  const getDayName = (date) => {
    return date
      .toLocaleDateString('ko-KR', {
        weekday: 'long',
      })
      .substr(0, 1);
  };

  // 날짜 비교시 년 월 일까지만 비교하게끔
  const createDate = (date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };

  return (
    <>
      <div className="Wrapper">
        <h1 style={{color: 'white', fontSize: '50px'}}>대회 개설하기</h1>

        <div className="FormWrap">
          <form className="form" style={{ color: 'white' }}>
            <p className="text">해커톤 이름</p>
            <div>
              <input
                className="input"
                name="name"
                type="text"
                placeholder="해커톤 이름"
                value={name}
                onChange={onNameHandler}
              />
            </div>
            <p className="text">시작 날짜</p>
            <div>
              <DatePicker
                className="input"
                minDate={new Date()}
                closeOnScroll={true}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="time"
                dateFormat="yyyy MM/dd, hh:mm aa"
                popperPlacement="auto"
                dayClassName={(date) =>
                  getDayName(createDate(date)) === '토'
                    ? 'saturday'
                    : getDayName(createDate(date)) === '일'
                    ? 'sunday'
                    : undefined
                }
              />
            </div>
            <p className="text">종료 날짜</p>
            <div>
              <DatePicker
                className="input"
                minDate={startDate}
                closeOnScroll={true}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="time"
                dateFormat="yyyy MM/dd, hh:mm aa"
                popperPlacement="auto"
                dayClassName={(date) =>
                  getDayName(createDate(date)) === '토'
                    ? 'saturday'
                    : getDayName(createDate(date)) === '일'
                    ? 'sunday'
                    : undefined
                }
              />
            </div>
            <p className="text">진행 장소</p>
            <div>
              <input
                className="input"
                name="location"
                type="text"
                placeholder="진행 장소"
                value={location}
                onChange={onLocationHandler}
              />
            </div>
            <p className="text">팀 구성</p>
            <span className="teamBox1">
              <span>기획자</span>
              <span>
                <input
                  type="number"
                  className="teamMember"
                  onChange={onPmHandler}
                />
              </span>
            </span>
            <span className="teamBox2">
              <span>개발자</span>
              <span>
                <input
                  type="number"
                  className="teamMember"
                  onChange={onDeveloperHandler}
                />
              </span>
            </span>
            <span className="teamBox3">
              <span>디자이너</span>
              <span>
                <input
                  type="number"
                  className="teamMember"
                  onChange={onDesignerHandler}
                />
              </span>
            </span>
            <p className="text">해커톤 이미지</p>
            <div className="img-preview">
              <ImgPreview src={img} alt="이미지 선택 전" />
            </div>
            <div>
              <UploadImage
                type="file"
                accept="image/*"
                id="img"
                onChange={formSubmit}
              ></UploadImage>
            </div>
            
            <p className="text">해커톤 소개</p>
            <div>
              <textarea
                rows={1}
                name="description"
                type="textarea"
                wrap="on"
                placeholder="자기소개"
                value={description}
                onChange={onDescriptionHandler}
                className="loginregister__desc"
              />
            </div>
            <div>
              <button className="move" onClick={onClickButton}>
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
