import './kanban.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from '../../mockData'
import { useState } from 'react'
import Card from '../card'
import React from 'react'

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

const Kanban = () => {
    const [data, setData] = useState(mockData)

    const onDragEnd = result => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]

            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            data[sourceColIndex].tasks = sourceTask
            data[destinationColIndex].tasks = destinationTask

            setData(data)
        }
    }

    return (

        <div>
            <div>
                <textarea placeholder="CodeConvention을 입력해주세요"></textarea>
            </div>
            <div>
                <form>
                    <label>
                        19:00~20:00
                        <input type="text" />
                        <br />
                        20:00~21:00
                        <input type="text" />
                    </label>
                </form>
            </div>


            <Editor
                previewStyle="vertical"
                plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
            />


            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban">
                    {
                        data.map(section => (
                            <Droppable
                                key={section.id}
                                droppableId={section.id}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        className='kanban__section'
                                        ref={provided.innerRef}
                                    >
                                        <div className="kanban__section__title">
                                            {section.title}
                                        </div>
                                        <div className="kanban__section__content">
                                            {
                                                section.tasks.map((task, index) => (
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
                                                                    opacity: snapshot.isDragging ? '0.5' : '1'
                                                                }}
                                                            >
                                                                <Card>
                                                                    {task.title}
                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))
                    }
                </div>
            </DragDropContext>
        </div>

    )
}

export default Kanban