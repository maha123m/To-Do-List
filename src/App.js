// App.js
import React from 'react';
import TodoList from './components/TodoList/TodoList';
import { TodoProvider } from './components/TodoList/TodoContext';

function App() {
    return (
        <TodoProvider>
            <TodoList />
        </TodoProvider>
    );
}

export default App;
