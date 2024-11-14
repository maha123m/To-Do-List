import React, { useState, useContext } from 'react';
import { TodoContext } from './TodoContext';

const TodoInput = () => {
    const [taskName, setTaskName] = useState('');
    const [error, setError] = useState(''); 
    const { addTask } = useContext(TodoContext);

    const handleAddTask = () => {
        if (taskName.trim() === '') {
            setError('Please enter a task name'); 
            return;
        }
        addTask(taskName);
        setTaskName('');
        setError(''); 
    };

    return (
        <div className="todo-input">
            <input
                type="text"
                placeholder="Add a new task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            {}
            {error && <p className="error-message">{error}</p>}
            
            <button className="add-btn" onClick={handleAddTask}>Add</button>
        </div>
    );
};

export default TodoInput;
