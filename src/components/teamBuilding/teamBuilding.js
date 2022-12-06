import './teamBuilding.css';
import React from 'react';
import { useState, useRef, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserList from './userList';

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

function CreateUser({ teamName, email, onChange, onCreate }) {
    return (
        <div className='input_wrapper'>
            <div className='teambuilding_input_wrapper'>
                <input className='teambuilding_input'
                    name="teamName"
                    placeholder="팀명을 입력하시오"
                    onChange={onChange}
                    value={teamName}
                />
            </div>

            <div>
                <input className='teambuilding_input'
                    name="email"
                    placeholder="팀원들의 이메일을 입력하시오"
                    onChange={onChange}
                    value={email}
                />
            </div>
            <button className="register_button" onClick={onCreate}>등록</button>
        </div>
    )
}

function TeamBuilding() {
    const hackathon_id = useParams();

    const [inputs, setInputs] = useState({
        email: '',
        teamName: ''
    });
    const { email, teamName } = inputs;
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };
    const [users, setUsers] = useState([]);

    const nextId = useRef(1);
    const onCreate = () => {
        const user = {
            id: nextId.current,
            email
        };
        setUsers([...users, user]);

        setInputs({
            email: ''
        });
        nextId.current += 1;
    };
    const check = (event) => {
        console.log("해커톤 아이디 : hackathon_id");
        
    }

    return (
        <>
            <div className="applicationStatusWrap">
                <p className="teamBuilding_p">팀빌딩</p>
                <div className="status">
                    <CreateUser
                        email={email}
                        onChange={onChange}
                        onCreate={onCreate}
                    />
                    <UserList users={users} />
                </div>

                <div className="buttonWrap">
                    <button className="button1" onClick={check}>팀 빌딩 완료</button>
                    <button className="button2">팀 페이지로 이동
                        <Link
                            to={'/kanbanboard'}
                            className="linkStyle"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                            }}
                        >
                        </Link></button>
                </div>
            </div>
        </>
    );
}

export default TeamBuilding;
