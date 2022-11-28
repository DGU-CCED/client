import React, {useState} from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';  // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; 	// 스타일 맥이기
import './react-datepicker.css';

const Create = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState('');

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onLocationHandler = (event) => {
        setLocation(event.currentTarget.value);
    }
    const onStartDateHandler = (event) => {
        setStartDate(event.currentTarget.value);
    }
    const onEndDateHandler = (event) => {
        setEndDate(event.currentTarget.value);
        
        console.log(startDate);
    }

    const getFormattedDate = (date) => {
        const month = date.toLocaleDateString('ko-KR', {
          month: 'long',
        });
        
        const day = date.toLocaleDateString('ko-KR', {
          day: 'numeric',
        });
        
        return `${month.substr(0, month.length - 1)}/${day.substr(0, day.length - 1)}`;
      }
      
      // 요일 반환
      const getDayName = (date) => {
        return date.toLocaleDateString('ko-KR', {
          weekday: 'long',
        }).substr(0, 1);
      }
      
      // 날짜 비교시 년 월 일까지만 비교하게끔
      const createDate = (date) => {
        return new Date(new Date(date.getFullYear()
          , date.getMonth()
          , date.getDate()
          , 0
          , 0
          , 0));
      }

    return (
        <>
            <div className='FormWrap'>
                <form class="form" style={{color: 'white'}}>
                    <p>해커톤 이름</p>
                    <div><input name="name" type="text" placeholder='해커톤 이름' value={name} onChange={onNameHandler}/></div>
                    <p>시작 날짜</p>
                    <div>
                        <DatePicker
                          minDate={new Date()}
                          closeOnScroll={true}
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          showTimeSelect
                          timeFormat='HH:mm'
                          timeIntervals={30}
                          timeCaption="time"
                          dateFormat="yyyy MM/dd, hh:mm aa"
                          popperPlacement='auto'                          
                          dayClassName={date =>
                            getDayName(createDate(date)) === '토' ? "saturday"
                          :
                            getDayName(createDate(date)) === '일' ? "sunday" : undefined
                        }
                        />
                    </div>
                    <p>종료 날짜</p>
                    <div>
                        <DatePicker
                            minDate={startDate}
                            closeOnScroll={true}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={30}
                            timeCaption="time"
                            dateFormat="yyyy MM/dd, hh:mm aa"
                            popperPlacement='auto'                          
                            dayClassName={date =>
                                getDayName(createDate(date)) === '토' ? "saturday"
                            :
                                getDayName(createDate(date)) === '일' ? "sunday" : undefined
                            }
                        />
                    </div>
                    <p>진행 장소</p>
                    <div><input name="location" type="text" placeholder='진행 장소' value={location} onChange={onLocationHandler} /></div>
                    <p>팀 구성</p>
                    <span>기획자</span>
                    <span><input type="number" className='teamMember'/></span>
                    <span>개발자</span>
                    <span><input type="number" className='teamMember'/></span>
                    <span>디자이너</span>
                    <span><input type="number" className='teamMember'/></span>
                    <p>해커톤 이미지</p>
                    {/* 업로드 구현 */}<input type="text"/>
                    <p>해커톤 소개</p>
                    <div>
                        <input type="textarea"/>
                    </div>
                    <div><button className="move">Upload</button></div>
                    {/* <div><button onClick={onClickButton} class="moveRegister">회원가입 이동</button></div>
                    <div><button onClick={onClickHome} class="loginregister__button">로그인</button></div> */}
                </form>
            </div>
        </>
    );
}

export default Create;