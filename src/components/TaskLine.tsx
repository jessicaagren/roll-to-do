interface TaskLineProps {
  steps?: number;
  completed: number;
}

export default function TaskLine({ steps = 20, completed }: TaskLineProps) {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center space-x-1'>
        {Array.from({ length: steps }, (_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              i < completed
                ? 'bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]'
                : 'bg-neutral-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
