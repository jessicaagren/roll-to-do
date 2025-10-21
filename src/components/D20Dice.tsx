import { useState } from 'react';

export default function D20Dice() {
  const [value, setValue] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    if (rolling) return;
    setRolling(true);

    let count = 0;
    const totalRolls = 20;

    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 20) + 1;
      setValue(randomValue);
      count++;
      if (count >= totalRolls) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 70);
  };

  return (
    <div className='flex flex-col items-center'>
      <div
        className={`relative flex items-center justify-center w-28 h-28 text-4xl font-bold border border-yellow-700 cursor-pointer select-none transition-transform duration-300 ease-in-out rounded-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-yellow-700 shadow-[0_0_20px_rgba(245,158,11,0.3)] ${
          rolling ? 'animate-spin' : 'hover:scale-105'
        }`}
        onClick={roll}>
        {value ?? 'D20'}
      </div>

      <p className='mt-6 text-base text-black'>
        {rolling
          ? 'Rolling...'
          : value
          ? `You rolled a ${value}!`
          : 'Click to roll the dice.'}
      </p>
    </div>
  );
}
