import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import "./LoginRegister.css"

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

  
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
    console.log({id});
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
    console.log({password});
  }

  const onClickButton = () => {
    navigate('/register');
  }

  const onClickHome = () => {
    api.post('/Auth/login',{
      id: id,
      password: password,
    }).then((response)=> {
      console.log(response);
      navigate('/hackathon/list');
    }).catch((error) => {
      console.log(error);
    });

    // navigate('/hackathon/list');
    
  }

  return (
      <div class="loginregister">
        <form class="form">
            <div class="title"><h2>로그인</h2></div>
            <div><input name="ID" type="text" placeholder="ID" value={id} onChange={onIdHandler} class="loginregister__input"/></div>
            <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} class="loginregister__input"/></div>
            <div><button onClick={onClickButton} class="moveRegister">회원가입 이동</button></div>
            <div><button onClick={onClickHome} class="loginregister__button">로그인</button></div>
        </form>
      </div>
    );
  }

export default LoginPage;