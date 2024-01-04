import React, { useState } from 'react';

const TaskForm = ({ onTaskAdd }) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onTaskAdd({ title: newTask });
      setNewTask('');
    }
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
