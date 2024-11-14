import React, { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
    const { tasks, toggleTaskCompletion, deleteTask, deleteFilteredTasks } = useContext(TodoContext); 
    const [filter, setFilter] = useState('All');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Active') return !task.completed;
        if (filter === 'Completed') return task.completed;
        return true;
    });

    return (
        <div className="todo-container">
            <h1>My TODO</h1>
            <div className="filters">
                <span className={`filter ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</span>
                <span className={`filter ${filter === 'Active' ? 'active' : ''}`} onClick={() => setFilter('Active')}>Active</span>
                <span className={`filter ${filter === 'Completed' ? 'active' : ''}`} onClick={() => setFilter('Completed')}>Completed</span>
            </div>
            
            <TodoInput />

            {filteredTasks.map((task) => (
                <TodoItem
                    key={task.taskId}
                    task={task}
                    onToggleCompletion={() => toggleTaskCompletion(task.taskId)}
                    onDeleteTask={() => deleteTask(task.taskId)}
                />
            ))}

            {filteredTasks.length === 0 && <p className="empty-message">No tasks to display</p>}

            {}
            <button className="delete-all-btn" onClick={() => deleteFilteredTasks(filter)}>Delete All</button>
        </div>
    );
};

export default TodoList;
