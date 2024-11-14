import React from 'react';

const TodoItem = ({ task, onToggleCompletion, onDeleteTask }) => {
    
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            onDeleteTask();
        }
    };

    return (
        <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={onToggleCompletion} 
            />
            <span 
                onClick={onToggleCompletion} 
                className="task-name" 
            >
                {task.taskName}
            </span>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
    );
};

export default TodoItem;
