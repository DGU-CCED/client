import './kanban.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState, useRef, useCallback, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import mockData from '../../mockData';
import Card from '../card';
import React from 'react';
import styled from 'styled-components';

import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import './todoListItem.scss';
import './todoInsert.scss';
import cn from 'classnames';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdAdd,
} from 'react-icons/md';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import markdownIt from "markdown-it";
import DOMPurify from 'dompurify';

const AlwaysScrollSection = memo((props) => {
  const { children } = props;
  return <StyledAlwaysScrollSection>{children}</StyledAlwaysScrollSection>;
});

const StyledAlwaysScrollSection = styled.div`
  overflow: scroll;
  height: 800px;
  &::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 8px;

    /* 가로 스크롤 높이 */
    height: 8px;

    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const Kanban = () => {
  const user_id = localStorage.getItem("userId");
  const hackathon_id = useParams();
  const [part, setPart] = useState('team');

  const changePart1 = () => {
    console.log('team');
    setPart('team');
  }
  const changePart2 = () => {
    console.log('pm');
    setPart('pm');
  }
  const changePart3 = () => {
    console.log('개발자');
    setPart('developer');
  }
  const changePart4 = () => {
    console.log('디자이너');
    setPart('designer');
  }

  // const [spaceNum1, setStateNum1] = useState(1);
  const spaceNum1 = 513;
  const [spaceNum2, setStateNum2] = useState(2);
  const [spaceNum3, setStateNum3] = useState(3);
  const [spaceNum4, setStateNum4] = useState(4);
  useEffect(() => {
    axios.defaults.withCredentials=false;
    axios.post('/space',{
      user_id: Number(user_id),
      hackathon_id: 27
    })
    .then((response) => {
      if(response !== ''){
        console.log(response.data.data[0].space_id);
        // setStateNum1(response.data.data[0].space_id);
        console.log(response.data.data[1].space_id);
        setStateNum2(response.data.data[1].space_id);
        console.log(response.data.data[2].space_id);
        setStateNum3(response.data.data[2].space_id);
        console.log(response.data.data[3].space_id);
        setStateNum4(response.data.data[3].space_id);
      } else{
        console.log('22');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  },[]);


  // 코드 컨벤션 부분
  const codeUrl = '/guideline/' + spaceNum1;
  const codeUrl1 = '/guideline/' + spaceNum1;
  const [textArr, setTextArr] = useState([]);
  var [textValue, setTextValue] = useState('');
  useEffect(() => { // get으로 받아오기
    const getCodeData = async () => {
      try {
        const response = await axios.get(codeUrl1);
        console.log(response);
        console.log("코드컨벤션 가져오기");
        
        var i;
        for(i=0; i<response.data.data.length; i++){
          console.log(response.data.data[i].codeconvention);
          textValue += response.data.data[i].codeconvention+'\n';
          setTextValue(textValue);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCodeData();
  }, []);

  useEffect(() => { // get으로 받아오기
    const getCodeData = async () => {
      try {
        const response = await axios.get(codeUrl1);
        console.log(response);
        console.log("코드컨벤션 가져오기");
        
        var i;
        for(i=0; i<response.data.data.length; i++){
          console.log(response.data.data[i].codeconvention);
          textValue += response.data.data[i].codeconvention+'\n';
          setTextValue(textValue);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCodeData();
  }, [part]);
  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const codeSubmit = (event) => { // put으로 데이터 수정
    axios.defaults.withCredentials = false;
    event.preventDefault();
    axios
      .put(codeUrl, {
        codeconvention: textValue,
      })
      .then((response) => {
        if (response.data.data !== '') {
          console.log(response);
        } else {
          console.log('서버에 안들어가짐')
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }


  // 진행상황 부분
  const TodoTemplate = ({ children }) => {
    return (
      <div className="TodoTemplate">
        <div className="contents">{children}</div>
      </div>
    );
  };
  

  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     content: '주제 정하기',
  //     status: false,
  //   },
  //   {
  //     id: 2,
  //     content: 'Code Convention 정하기',
  //     status: false,
  //   },
  //   {
  //     id: 3,
  //     content: '해커톤을 시작해 봅시다',
  //     status: false,
  //   },
  // ]);
  const [todoV, setTodoV] = useState([]);
  const [todos, setTodos] = useState([
    {
      id:0,
      content: '예시',
      status: true,
    },
  ]);
  const nextId = useRef(todoV.length);
  const todoUrl = '/timeline/'+spaceNum1;
  useEffect(() => {
    const getTodoData = async () => {
      try{
        const response = await axios.get(todoUrl);
        console.log(response);
        console.log("타임라인 가져오기");
        setTodoV(response.data.data);
        var i;
        for(i=0; i<response.data.data.length; i++){ 
          console.log(response.data.data[i].content);
          // todos[i].id = i+1;
          // todos[i].content = response.data.data[i].content;
          // todos[i].status = response.data.data[i].status;
          
          todos.push({"id": i+1, "content": response.data.data[i].content, "status": response.data.data[i].status});
        }
      } catch (error){
        console.log(error);
      }
      
    };
   

    getTodoData();
    
  }, [part]);
  const onInsert = useCallback(
    (content) => {
      const todo = {
        id: nextId.current,
        content,
        status: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;

       
    },
    [todos]
  );

  const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('');

    const onChange = useCallback((e) => {
      setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
      (e) => {
        onInsert(value);
        setValue(''); // value 값 초기화

        //submit 이벤트는 브라우저에서 새로고침을 발생시킵니다.
        //이를 방지하기 위해 이 함수를 호출합니다.
        e.preventDefault();
      },
      [onInsert, value]
    );

    const onClick = useCallback(() => {
      onInsert(value);
      setValue(''); // value 값 초기화
      console.log(todos);
      axios.defaults.withCredentials=false;
      axios.put(todoUrl,{
        content: value,
        status: false,
      })
      .then((response) => {
        if (response.data.data !== '') {
          console.log(response);
        } else {
          console.log('서버에 안들어가짐')
        }
      })
      .catch((error) => {
        console.log(error);
      })

    }, [onInsert, value]);

    return (
      <form className="TodoInsert">
        <input
          placeholder="시간별 권장 진행사항을 입력하세요."
          value={value}
          onChange={onChange}
        />
        <button onClick={onClick}>
          <MdAdd />
        </button>
      </form>
    );
  };

  const TodoListItem = ({ todo, onRemove, onToggle }) => {
    const { id, content, status } = todo;
    return (
      <div className="TodoListItem">
        <div
          className={cn('checkbox', { status })}
          onClick={() => onToggle(id)}
        >
          {status ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{content}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    );
  };

  
  const TodoList = ({ todos, onRemove, onToggle }) => {
    return (
      <div className="TodoList">
        {todos.map((todo, index) => (
          <TodoListItem
            todo={todo}
            key={todo.id}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        ))}
      </div>
    );
  };

  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     content: '주제 정하기',
  //     status: false,
  //   },
  //   {
  //     id: 2,
  //     content: 'Code Convention 정하기',
  //     status: false,
  //   },
  //   {
  //     id: 3,
  //     content: '해커톤을 시작해 봅시다',
  //     status: false,
  //   },
  // ]);


  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  // 나중에는 서버에 개수 저장해놓고 그 개수를 useRef에다가 넣어야 할듯
  // const nextId = useRef(4);
  
  // const [nextId, setNextId] = useState(4);
  

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
        )
      );
    },
    [todos]
  );

  

  // 자유공간 코드
  const editorRef = useRef();
  const freeUrl = '/freeboard/' + spaceNum1;
  var [freeValue, setFreeValue] = useState('');

  useEffect(() => { // get으로 받아오기
    const getCodeData = async () => {
      try {
        const response = await axios.get(codeUrl1);
        console.log(response);
        console.log("코드컨벤션 가져오기");
        
        var i;
        for(i=0; i<response.data.data.length; i++){
          console.log(response.data.data[i].codeconvention);
          textValue += response.data.data[i].codeconvention+'\n';
          setTextValue(textValue);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCodeData();
  }, []);

  useEffect(() => { // 첫 랜더링 시 입력했던 정보 가져옴
    const getFreeData = async () => {
      try {
        const response = await axios.get(freeUrl);
        console.log(response);
        console.log("프리 가져오기");
        
        var i;
        for(i=0; i<response.data.data.length; i++){
          console.log(response.data.data[i].content);
          freeValue += response.data.data[i].content+'\n';
          setFreeValue(freeValue);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFreeData();
    editorRef.current.getInstance().setHTML(freeValue);
  }, []);

  const freeSubmit = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = false;
    console.log(editorRef.current?.getInstance().getHTML()); // text editor 값 가져오기

    axios.put(freeUrl, {
      content: freeValue
    })
    .then((response) => {
      if (response.data.data !== '') {
        console.log(response);
      } else {
        console.log('서버에 안들어가짐');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const mockData = [
    {
        id: uuidv4(),
        title: ' 📃 To do',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn JavaScript'
            },
            {
                id: uuidv4(),
                title: 'Learn Git'
            },
            {
                id: uuidv4(),
                title: 'Learn Python'
            },
            {
              id: uuidv4(),
              title: '주제 정하기'
            },
        ]
    },
    {
        id: uuidv4(),
        title: ' ✏️ In progress',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn CSS'
            },
            {
                id: uuidv4(),
                title: 'Learn Golang'
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ✔️ Completed',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn HTML'
            }
        ]
    }
]


  // 칸반 코드

  const [data, setData] = useState(mockData);

  useEffect(() => {
    const fetchData = async () => { // async, await, axios로 data 가져옴.
      const response = await axios.put('/kanban/32', {
        state: Number(0),
        content: '씨발',
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error)
        })
    };
    fetchData();
  }, [data]);


  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      setData(data);
    }
  };
  const insert = (event) => {
    mockData[0].tasks.push({
      id: uuidv4(),
      title: '주제 정하기'
    });
  }



  // const [text, setText] = useState("");
  // const sanitizer = DOMPurify.sanitize;
  // const handleClick = () => {
  //   setText(editorRef.current.getInstance().getMarkdown());
  //   console.log("작동함", text);
  //   console.log(markdownIt().render(text), "태그화");
  // };
  // const handleFocus = () => {
  //   console.log("focus!!");
  //   editorRef.current.getRootElement().classList.add("my-editor-root");
  // };


  return (
    <div className="background">
      <div className="kanban_wrapper">
        <AlwaysScrollSection>
          <div className="kanban_buttonWrapper">
            <button onClick={changePart1} className="index_total1">전체 공간</button>
            <button onClick={changePart2} className="index_total2">PM</button>
            <button onClick={changePart3} className="index_total3">개발자</button>
            <button onClick={changePart4} className="index_total4">디자이너</button>
          </div>
          <div className="codeConventionWrapper">
            <div className="codeConvention">
              <div>
                <label className="label">코드컨벤션</label>
              </div>
              <p className="paragraph">{textValue}</p>
              <textarea
                className="textArea"
                placeholder="Code Convention을 입력해주세요."
                value={textValue}
                onChange={(e) => handleSetValue(e)}
              ></textarea>
              <div className="kanban_save_button_wrapper">
                <button className="kanban_save_button" onClick={codeSubmit}>저장하기</button>
              </div>
            </div>
          </div>

          <div className="progressWrapper">
            <div className="progress">
              <div className="progressLabelWrapper">
                <label className="label">진행상황</label>
              </div>
              <TodoTemplate>
                <TodoInsert onInsert={onInsert} />
                <TodoList
                  todos={todos}
                  onRemove={onRemove}
                  onToggle={onToggle}
                />
              </TodoTemplate>
            </div>
            <div className="kanban_save_button_wrapper">
              <button className="kanban_save_button2" >저장하기</button>
            </div>
          </div>

          <div className="freespaceWrapper">
            <div className="freespace">
              <div>
                <label className="label">자유 공간</label>
              </div>
              <Editor
                initialValue="hello react editor world!"
                previewStyle="vertical"
                height="500px"
                minHeight="200px"
                initialEditType="markdown"
                useCommandShortcut={true}
                ref={editorRef}
              />
              {/* <div
                dangerouslySetInnerHTML={{
                  __html: sanitizer(markdownIt().render(text)),
                }}
              ></div> */}
              <div className="kanban_save_button_wrapper">
                <button onClick={freeSubmit} className="kanban_save_button">저장하기</button>
              </div>
            </div>
          </div>

          <div className="kanbanBoardWrapper">
            <div>
              <label className="label">칸반보드</label>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="kanban">
                {data.map((section) => (
                  <Droppable key={section.id} droppableId={section.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        className="kanban__section"
                        ref={provided.innerRef}
                      >
                        <div className="kanban__section__title">
                          {section.title}
                        </div>
                        <div className="kanban__section__content">
                          {section.tasks.map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    opacity: snapshot.isDragging ? '0.5' : '1',
                                  }}
                                >
                                  <Card>{task.title}</Card>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                        <div className="kanban_insert_wrapper">
                          <input
                            className="kanban_insert"
                            placeholder="추가할 작업을 입력하세요."
                          />
                          <button className="kanban_insert_button" onClick={insert}>+</button>
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </div>
        </AlwaysScrollSection>
      </div>
    </div>
  );
};

export default Kanban;
