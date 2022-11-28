import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "./LoginRegister.css"

function RegisterPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [institution, setInstitution] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const navigate = useNavigate();

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }
  const onIdHandler = (event) => {
      setId(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
  }

  const onDescriptionHandler = (event) => {
    setDescription(event.currentTarget.value);
  }

  const onInstitutionHandler = (event) => {
    setInstitution(event.currentTarget.value);
  }

  const onMajorHandler = (event) => {
    setMajor(event.currentTarget.value);
  }

  const onAgeHandler = (event) => {
    setAge(event.currentTarget.value);
  }

  const onSexHandler = (event) => {
    console.log(event.currentTarget.value);
    setSex(event.currentTarget.value);
  }

  const onClickButton = (event) => {
    
    navigate('/login');
  }

  return (
    <div class="loginregister">
      <form class="form">
          <div class="title"><h2>회원가입</h2></div>
          <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} className="loginregister__input"/></div>
          <div><input name="email" type="text" placeholder="ID" value={id} onChange={onIdHandler} className="loginregister__input"/></div>
          <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} className="loginregister__input"/></div>
          <div><textarea rows={1} name="description" type="textarea" wrap="on" placeholder="자기소개" value={description} onChange={onDescriptionHandler} className="loginregister__desc"/></div>
          <div><input name="institution" type="text" placeholder="학교" value={institution} onChange={onInstitutionHandler} className="loginregister__input"/></div>
          <div><input name="major" type="text" placeholder="학과" value={major} onChange={onMajorHandler} className="loginregister__input"/></div>
          <div><input name="age" type="number" placeholder="나이(숫자만 입력하세요)" value={age} onChange={onAgeHandler} className="loginregister__input"/></div>
          <span><input type="radio" value="Male" checked={sex === "Male"} onChange={onSexHandler} /><label className="loginregister__sex">남자</label></span>
          <span><input type="radio" value="Female" checked={sex === "Female"} onChange={onSexHandler} /><label className="loginregister__sex">여자</label></span>
          <div><button type="submit" onClick={onClickButton} className="moveRegister">회원가입 완료</button></div>
      </form>
    </div>
  );
}
export default RegisterPage;
