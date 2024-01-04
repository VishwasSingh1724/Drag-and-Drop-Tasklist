import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

const TaskList = ({ category, tasks, onTaskDelete }) => {
  return (
    <Droppable droppableId={category} direction="vertical">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
        >
          <h2>{category}</h2>
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} onTaskDelete={onTaskDelete} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
