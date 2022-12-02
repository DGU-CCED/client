import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import './LoginRegister.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // const getData = async () => {
  //   await axios
  //   .get('/user')
  //   .then((res) => setData(res.data)).then(
  //     console.log(data[0].id), console.log(data[0].name),
  //   )
  // };

  // useEffect(() => {
  //   getData();
  // },[]);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
    console.log({ email });
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
    console.log({ password });
  };

  const onClickButton = () => {
    navigate('/register');
  };

  const onClickHome = (e) => {
    // get api 연습
    // const response = axios.get('/user');
    // console.log(response);

    e.preventDefault();
    axios.post('/auth/login', {
      email: email,
      password: password,
    })
    .then((response) => {
      let accessToken = response.headers.get("access-token");
      let refreshToken = response.headers.get("refresh-token");
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    })
    .then((response) => {
      if(response){
        alert("로그인 성공~!~!");
      }
      else{
        alert("로그인 실패 ㅠ_ㅜ");
      }
    })
    .then(() => {
      navigate('/hackathon/list/newest/1');
    })
  };

  const onclick = () => { // 나중에 삭제
    // const response = axios.get('/user');
    // console.log(response);
    const response = axios.post('/auth/login', {
      email: email,
      password: password,
    });
    console.log(response);
  };

  return (
    <div className="loginregister">
      <form className="form">
        <div className="login_title">
          <p>로그인</p>
        </div>
        <div>
          <input
            name="email"
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={onEmailHandler}
            class="loginregister__input"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
            class="loginregister__input"
          />
        </div>
        <div>
          <button onClick={onClickButton} class="moveRegister">
            회원가입 이동
          </button>
        </div>
        <div>
          <button onClick={onClickHome} class="loginregister__button">
            로그인
          </button>
        </div>
      </form>
      <button onClick={onclick}>확인</button>
    </div>
  );
}

export default LoginPage;
