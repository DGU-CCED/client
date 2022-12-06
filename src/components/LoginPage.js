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
    axios.defaults.withCredentials = false;
    e.preventDefault();
    axios.post('/auth/login', {
      email: email,
      password: password,
    }).then((response) => {
      if(response){
        console.log(JSON.parse(JSON.stringify(response.data.data[2].user_id)));
        const user_id = JSON.parse(JSON.stringify(response.data.data[2].user_id));
        localStorage.setItem("userId", user_id);
        alert("로그인 성공!");
        navigate('/hackathon/list');
      } else {
        alert("로그인 실패..");
      }
    }).catch((error) => {
      console.log(error);
      alert("로그인 실패..");
    })
  };

  const onclick = () => { // 나중에 삭제
    axios.defaults.withCredentials = false;
    axios.post('/auth/login', {
      email: email,
      password: password
    }).then(response => {
      if (response) {
        localStorage.setItem("userId", response.data.data);
        console.log(localStorage.getItem("userId"));
        let userId = localStorage.getItem("userId")
        alert({userId}+" 님 환영합니다.");
      } else{
        alert("로그인 실패..");
      }
    })
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
