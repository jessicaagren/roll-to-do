import { useState } from 'react';

interface D20DiceProps {
  setRolledNumber: React.Dispatch<React.SetStateAction<number | null>>;
  isCompleted: boolean;
}

export default function D20Dice({
  setRolledNumber,
  isCompleted,
}: D20DiceProps) {
  const [value, setValue] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [message, setMessage] = useState('Click to roll the dice.');

  const roll = () => {
    if (rolling || isCompleted) return;

    setRolling(true);
    setMessage('Rolling...');

    let count = 0;
    const totalRolls = 20;
    let finalValue = Math.floor(Math.random() * 20) + 1;

    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 20) + 1;
      setValue(randomValue);
      finalValue = randomValue;
      count++;

      if (count >= totalRolls) {
        clearInterval(interval);
        setRolling(false);
        setValue(finalValue);
        setRolledNumber(finalValue);
        setMessage(`You rolled task #${finalValue}!`);
      }
    }, 70);
  };

  return (
    <div className='flex flex-col items-center'>
      <div
        className={`relative flex items-center justify-center w-28 h-28 text-4xl font-bold text-yellow-900 border border-yellow-700 cursor-pointer select-none transition-transform duration-300 ease-in-out rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.4)] 
        bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-500
        ${
          rolling
            ? 'animate-spin'
            : isCompleted
            ? 'opacity-60 cursor-default'
            : 'hover:scale-105 hover:shadow-[0_0_25px_rgba(234,179,8,0.6)]'
        }`}
        onClick={roll}>
        {isCompleted ? '🏆' : value ?? 'D20'}
      </div>

      <p className='mt-6 text-base text-yellow-800 text-center px-4 font-medium'>
        {isCompleted ? 'All tasks completed! 🎉' : message}
      </p>
    </div>
  );
}
