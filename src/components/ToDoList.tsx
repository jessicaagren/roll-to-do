import { useState, useEffect } from 'react';
import { initialTodos } from '../data/initialTodos';

interface TodoListProps {
  setCompletedPoints: React.Dispatch<React.SetStateAction<number>>;
  rolledNumber: number | null;
}

export default function TodoList({
  setCompletedPoints,
  rolledNumber,
}: TodoListProps) {
  const [todos, setTodos] = useState(
    initialTodos.map((task) => ({ ...task, done: false }))
  );
  const [highlighted, setHighlighted] = useState<number | null>(null);

  useEffect(() => {
    if (rolledNumber === null) return;
    setHighlighted(rolledNumber);

    const timeout = setTimeout(() => setHighlighted(null), 1500);
    return () => clearTimeout(timeout);
  }, [rolledNumber]);

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
      <style>
        {`
        @keyframes blink {
          0%, 100% { background-color: #facc15; } /* yellow-400 */
          50% { background-color: #fef08a; } /* yellow-200 */
        }
        .animate-blink {
          animation: blink 0.4s ease-in-out 3;
        }
        `}
      </style>

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
                const isHighlighted = highlighted === num;

                return (
                  <li
                    key={`${value}-${num}`}
                    className={`flex items-center rounded-lg p-2 text-yellow-900 shadow-sm transition cursor-pointer ${
                      todo.done
                        ? 'bg-yellow-300 opacity-70 line-through'
                        : 'bg-yellow-200 hover:bg-yellow-300'
                    } ${
                      isHighlighted
                        ? 'ring-4 ring-yellow-500 scale-105 animate-blink'
                        : ''
                    }`}
                    onClick={() => toggleTodo(globalIndex)}>
                    <span className='flex-1'>
                      <strong>{num}.</strong> {todo.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
    </div>
  );
}
