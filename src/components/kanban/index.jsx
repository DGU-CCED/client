import './kanban.scss';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import mockData from '../../mockData';
import { useState, useRef, useCallback, memo } from 'react';
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
  const [data, setData] = useState(mockData);

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

  const [textValue, setTextValue] = useState('');
  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const [value, setValue] = useState('');

  const TodoTemplate = ({ children }) => {
    return (
      <div className="TodoTemplate">
        <div className="contents">{children}</div>
      </div>
    );
  };

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
    const { id, text, checked } = todo;
    return (
      <div className="TodoListItem">
        <div
          className={cn('checkbox', { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
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
        {todos.map((todo) => (
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

  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   text: '리액트의 기초 알아보기',
    //   checked: true,
    // },
    // {
    //   id: 2,
    //   text: '컴포넌트 스타일링 해보기',
    //   checked: true,
    // },
    // {
    //   id: 3,
    //   text: '일정 관리 앱 만들어 보기',
    //   checked: false,
    // },
  ]);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기

  const nextId = useRef(4);
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos]
  );

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
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [todos]
  );

  return (
    <div className="background">
      <div className="kanban_wrapper">
        <AlwaysScrollSection>
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
                <button className="kanban_save_button">저장하기</button>
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
              <button className="kanban_save_button2">저장하기</button>
            </div>
          </div>

          <div className="freespaceWrapper">
            <div className="freespace">
              <div>
                <label className="label">자유 공간</label>
              </div>
              <Editor
                previewStyle="vertical"
                plugins={[
                  colorSyntax,
                  [codeSyntaxHighlight, { highlighter: Prism }],
                ]}
              />
              <div className="kanban_save_button_wrapper">
                <button className="kanban_save_button">저장하기</button>
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
                          <button className="kanban_insert_button">+</button>
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
