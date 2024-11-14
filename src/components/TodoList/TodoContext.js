import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            return savedTasks ? JSON.parse(savedTasks) : [];
        } catch (error) {
            console.error("Failed to parse tasks from localStorage", error);
            return [];
        }
    });

    const updateLocalStorage = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = (taskName) => {
        const newTask = {
            taskId: Date.now().toString(),
            taskName,
            completed: false,
            createdAt: new Date(),
        };
        const updatedTasks = [...tasks, newTask];
        updateLocalStorage(updatedTasks);
        setTasks(updatedTasks);
    };

    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.taskId === taskId ? { ...task, completed: !task.completed } : task
        );
        updateLocalStorage(updatedTasks);
        setTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.taskId !== taskId);
        updateLocalStorage(updatedTasks);
        setTasks(updatedTasks);
    };

    
    const deleteFilteredTasks = (filter) => {
        let updatedTasks;
        if (filter === 'Active') {
            updatedTasks = tasks.filter(task => task.completed); 
        } else if (filter === 'Completed') {
            updatedTasks = tasks.filter(task => !task.completed); 
        } else {
            updatedTasks = []; 
        }
        updateLocalStorage(updatedTasks);
        setTasks(updatedTasks);
    };

    return (
        <TodoContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask, deleteFilteredTasks }}>
            {children}
        </TodoContext.Provider>
    );
};
