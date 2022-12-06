import './viewApplicant.css';
import React, { useState, memo, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import dummy from '../../data/userInfoDummy.json';
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
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [applicantData, setApplicantData] = useState([]);
  const [part, setPart] = useState('pm');

  const url = '/hackathon/detail/' + id;
  const navigate = useNavigate();
  const style = {
    backgroundImage: 'url(' + data.hackathon_image + ')',
  };

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

  useEffect(() => {
    const getData2 = async () => {
      try {
        const response = await axios.get('/applicant/list/' + id + '/pm');
        console.log(response);
        setApplicantData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData2();
  }, []);
  useEffect(() => {
    const getData3 = async () => {
      try {
        const response = await axios.get('/applicant/list/' + id + '/' + part);
        console.log(response);
        setApplicantData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData3();
  }, [part]);

  const onPartHandler = (event) => {
    console.log(event.currentTarget.value);
    setPart(event.currentTarget.value);
  };

  const startHackathon = (event) => {
    axios.defaults.withCredentials = false;
    event.preventDefault();
    axios.post('/hackathon/start', {
      hackathon_id: Number(id),
    })
      .then((response) => {
        if (response.data.data !== '') {
          alert('해커톤 시작..!');
          navigate('/hackathon/list/');
        } else {
          alert('시작 실패');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('시작 실패');
      })
  }

  const part_viewApplicant =
    applicantData &&
    applicantData.map((item) => {
      if (part === 'pm') {
        return (
          <>
            <button className="viewApplicant_label_pm">
              <Link
                to={
                  '/approvalandrefusal/?' +
                  'hackathonId=' +
                  id +
                  '&userid=' +
                  item.id +
                  '&part=' +
                  part
                }
                className="linkStyle"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                {item.name} / {item.age} / {item.institution}
              </Link>
            </button>
          </>
        );
      } else if (part === 'developer') {
        return (
          <>
            <button className="viewApplicant_label_developer">
              <Link
                to={
                  '/approvalandrefusal/?' +
                  'hackathonId=' +
                  id +
                  '&userid=' +
                  item.id +
                  '&part=' +
                  part
                }
                className="linkStyle"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                {item.name} / {item.age} / {item.institution}
              </Link>
            </button>
          </>
        );
      } else {
        return (
          <>
            <button className="viewApplicant_label_designer">
              <Link
                to={
                  '/approvalandrefusal/?' +
                  'hackathonId=' +
                  id +
                  '&userid=' +
                  item.id +
                  '&part=' +
                  part
                }
                className="linkStyle"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                {item.name} / {item.age} / {item.institution}
              </Link>
            </button>
          </>
        );
      }
    });

  const dummy_viewApplicant = dummy.data.map((item) => {
    return (
      <>
        <p>{item.name} 이메일 입력: </p>
        <textarea></textarea>
      </>
    );
  });

  return (
    <>
      <div className="viewApplicant_wrap" style={style}>
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

      <div className="applicationStatusWrap">
        <p className="viewApplicant_p">신청 현황</p>
        <div className="applicationStatus">
          <button value="pm" className="teamBox11" onChange={onPartHandler}>기획자 : {data.pm}명</button>
          <button value="developer" className="teamBox21" onChange={onPartHandler}>개발자 : {data.developer}명</button>
          <button value="designer" className="teamBox31" onChange={onPartHandler}>디자이너 : {data.designer}명</button>
        </div>
        <AlwaysScrollSection>
          <div className="status">
            {part_viewApplicant}
          </div>

          <div className="buttonWrap">
            <button className="button1">저장</button>
            <button className="button2" onClick={startHackathon}>해커톤 시작</button>
          </div>
        </AlwaysScrollSection>
      </div>
    </>
  );
}
