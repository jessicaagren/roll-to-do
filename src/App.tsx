import { useState } from 'react';
import './App.css';
import D20Dice from './components/D20Dice';
import TaskLine from './components/TaskLine';
import TodoList from './components/ToDoList';

function App() {
  const [completedPoints, setCompletedPoints] = useState(0);
  const totalPoints = 20;

  return (
    <div className='min-h-screen bg-yellow-100 flex flex-col'>
      <header className='text-center py-6 border-b border-yellow-300'>
        <h1 className='text-5xl font-extrabold text-yellow-800 tracking-wide drop-shadow-sm'>
          Roll To Do
        </h1>
      </header>

      <div className='flex flex-col md:flex-row flex-1'>
        <div className='flex-1 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-yellow-300'>
          <TodoList setCompletedPoints={setCompletedPoints} />
        </div>

        <div className='flex-1 flex flex-col items-center justify-center gap-8 p-8 text-center'>
          <D20Dice />
          <TaskLine steps={totalPoints} completed={completedPoints} />
          <p className='text-yellow-700 font-medium'>
            {completedPoints}/{totalPoints} points earned
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
