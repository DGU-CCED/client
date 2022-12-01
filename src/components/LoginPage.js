import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';
import "./LoginRegister.css"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    console.log({email});
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
    console.log({password});
  }

  const onClickButton = () => {
    navigate('/register');
  }

  const onClickHome = (e) => {
    // try{
    //   const response = axios.post('/auth/login',{
    //     email: email,
    //     password: password
    //   });
    //   console.log(response.header);
    //   console.log(response.statusCode);
    //   console.log(response.message);
    //   navigate('/hackathon/list');
    // } catch (error) {
    //   console.log(error);
    // }
    // try{
    //   const response = axios.get('/user');
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
    // const response = axios.post('/auth/login',{
    //   email: email,
    //   password: password
    // });
    // console.log(response.statusCode);
    const response = axios.get('/user');
    console.log(response);
  }

  const onclick = () => {
    // const response = axios.get('/user');
    // console.log(response);
    const response = axios.post('/auth/login',{
      email: email,
      password: password
    });
    console.log(response);
  }

  return (
      <div class="loginregister">
        <form class="form">
            <div class="title"><h2>로그인</h2></div>
            <div><input name="email" type="text" placeholder="E-mail" value={email} onChange={onEmailHandler} class="loginregister__input"/></div>
            <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} class="loginregister__input"/></div>
            <div><button onClick={onClickButton} class="moveRegister">회원가입 이동</button></div>
            <div><button onClick={onClickHome} class="loginregister__button">로그인</button></div>
        </form>
        <button onClick={onclick}>확인</button>
      </div>
    );
  }

export default LoginPage;