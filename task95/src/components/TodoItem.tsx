interface TodoItemProps {
  text: string;
  dueDate: Date;
  isCompleted: boolean;
  onToggle: () => void;
}

function TodoItem({ text, dueDate, isCompleted, onToggle }: TodoItemProps) {
  const today = new Date();
  const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
  const isLongTerm = dueDate > twoWeeksFromNow;

  return (
    <div className="flex items-center gap-3 w-full py-3 hover:bg-gray-100 rounded">
      <button
        onClick={onToggle}
        className="m-0 p-0 h-[20px] w-[20px] sm:h-[30px] sm:w-[30px] items-center flex"
      >
        <img
          src={isCompleted ? '../src/assets/icons/checkbox-checked.png' : '../src/assets/icons/checkbox.png'}
          alt={isCompleted ? 'Completed' : 'Uncompleted'}
          className="h-[15px] w-[15px] sm:h-[30px] sm:w-[30px]"
        />
      </button>
      
      <div className="flex-grow flex items-center gap-2">
        {isLongTerm ? (
          <img src="../src/assets/icons/green-calendar.png" alt="Calendar" className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <img src="../src/assets/icons/orange-clock.png" alt="Clock" className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
        <span className={`text-base ${isCompleted ? 'line-through text-gray-500' : ''} text-base sm:text-xl pt-1 pr-0`}>
          {text}
        </span>
        <div className="flex items-center text-xs sm:text-base text-gray-500">
          <span>
            <span className="hidden md:inline">Due: </span>
            {dueDate.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
