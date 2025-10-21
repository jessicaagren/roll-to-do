import { useState, useEffect } from 'react';
import { initialTodos } from '../data/initialTodos';

interface TodoListProps {
  setCompletedPoints: React.Dispatch<React.SetStateAction<number>>;
}

export default function TodoList({ setCompletedPoints }: TodoListProps) {
  const [todos, setTodos] = useState(
    initialTodos.map((task) => ({ ...task, done: false }))
  );

  useEffect(() => {
    const total = todos
      .filter((todo) => todo.done)
      .reduce((sum, todo) => sum + todo.value, 0);
    setCompletedPoints(total);
  }, [todos, setCompletedPoints]);

  const toggleTodo = (index: number) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.value]) acc[todo.value] = [];
    acc[todo.value].push(todo);
    return acc;
  }, {} as Record<number, { text: string; value: number; done: boolean }[]>);

  let counter = 1;

  return (
    <div className='text-left space-y-6'>
      {Object.entries(groupedTodos)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([value, group]) => (
          <div key={value}>
            <h2 className='text-xl font-bold text-yellow-800 mb-3'>+{value}</h2>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              {group.map((todo) => {
                const num = counter++;
                const globalIndex = todos.findIndex(
                  (t) => t.text === todo.text
                );

                return (
                  <li
                    key={`${value}-${num}`}
                    className={`flex items-center bg-yellow-200 rounded-lg p-2 text-yellow-900 shadow-sm hover:bg-yellow-300 transition cursor-pointer ${
                      todo.done ? 'opacity-70 line-through' : ''
                    }`}
                    onClick={() => toggleTodo(globalIndex)}>
                    <span className='flex-1'>
                      <strong>{num}.</strong> {todo.text}
                    </span>
                    {/* <span className='text-xs text-yellow-700 ml-2'>
                      (+{todo.value})
                    </span> */}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
    </div>
  );
}
