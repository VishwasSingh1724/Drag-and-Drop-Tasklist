import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskList from './components/TaskList';
import "./App.css"
import TaskForm from './components/TaskForm';
const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleTaskAdd = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask, category: 'Added' }]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks.find((task) => task.id === Number(result.draggableId));
    draggedTask.category = result.destination.droppableId;

    setTasks(updatedTasks);
  };

  return (
   <div className='main'>
     <div className="app-container">
    <h1>Task Management Board</h1>
    <TaskForm onTaskAdd={handleTaskAdd} />
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="board-container"
          >
            <TaskList
              category="Added"
              tasks={tasks.filter((task) => task.category === 'Added')}
              onTaskDelete={handleTaskDelete}
            />
            <TaskList
              category="Started"
              tasks={tasks.filter((task) => task.category === 'Started')}
              onTaskDelete={handleTaskDelete}
            />
            <TaskList
              category="Completed"
              tasks={tasks.filter((task) => task.category === 'Completed')}
              onTaskDelete={handleTaskDelete}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
    
  </div>
   </div>
  );
};

export default App;
