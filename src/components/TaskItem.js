import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskItem = ({ task, index, onTaskDelete }) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`task-item ${snapshot.isDragging ? 'dragging' : ''}`}
        >
          <span>{task.title}</span>
          <button onClick={() => onTaskDelete(task.id)} className='btn'>&#10006;</button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
