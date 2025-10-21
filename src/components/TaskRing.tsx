import { useState } from 'react';

interface TaskRingProps {
  size?: number;
  strokeWidth?: number;
  totalTasks?: number;
}

export default function TaskRing({
  size = 120,
  strokeWidth = 12,
  totalTasks = 5,
}: TaskRingProps) {
  const [completed, setCompleted] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const handleClick = () => {
    setCompleted((prev) => (prev < totalTasks ? prev + 1 : 0));
  };

  const progress = (completed / totalTasks) * circumference;

  return (
    <div className='flex flex-col items-center'>
      <svg
        width={size}
        height={size}
        onClick={handleClick}
        className='cursor-pointer'>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke='#A16207'
          strokeWidth={strokeWidth}
          fill='none'
          className='opacity-30'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke='url(#grad)'
          strokeWidth={strokeWidth}
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap='round'
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className='transition-all duration-500 ease-out'
        />
        <defs>
          <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#facc15' />
            <stop offset='100%' stopColor='#f97316' />
          </linearGradient>
        </defs>
      </svg>
      <p className='mt-2 text-yellow-200'>
        {completed}/{totalTasks} tasks completed
      </p>
    </div>
  );
}
