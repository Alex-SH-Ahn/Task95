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
        className="m-0 p-0 h-[30px] items-center flex"
      >
        <img
          src={isCompleted ? '../src/assets/icons/checkbox-checked.png' : '../src/assets/icons/checkbox.png'}
          alt={isCompleted ? 'Completed' : 'Uncompleted'}
          className="h-[25px]"
        />
      </button>
      
      <div className="flex-grow flex items-center gap-2">
        {isLongTerm ? (
          <img src="../src/assets/icons/green-calendar.png" alt="Calendar" className="w-5 h-5" />
        ) : (
          <img src="../src/assets/icons/orange-clock.png" alt="Clock" className="w-5 h-5" />
        )}
        <span className={`text-base ${isCompleted ? 'line-through text-gray-500' : ''} text-xl`}>
          {text}
        </span>
        <div className="flex items-center gap-1 text-base text-gray-500">
          <span>Due:{dueDate.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
