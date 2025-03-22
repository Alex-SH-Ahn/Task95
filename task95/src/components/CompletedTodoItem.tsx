interface CompletedTodoItemProps {
  text: string;
  dueDate: Date;
}

function CompletedTodoItem({ text, dueDate}: CompletedTodoItemProps) {
  const today = new Date();
  const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
  const isLongTerm = dueDate > twoWeeksFromNow;

  return (
    <div className="flex w-full items-center gap-3 rounded py-3 hover:bg-gray-100">
      <button
        disabled
        className="m-0 flex h-[20px] w-[20px] items-center p-0 sm:h-[30px] sm:w-[30px]"
      >
        <img
          src="/src/assets/icons/disabled-box.png"
          alt="Completed"
          className="h-[15px] w-[15px] sm:h-[30px] sm:w-[30px]"
        />
      </button>

      <div className="flex flex-grow items-center gap-2">
        {isLongTerm ? (
          <img
            src="../src/assets/icons/gray-calendar.png"
            alt="Calendar"
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        ) : (
          <img
            src="../src/assets/icons/gray-clock.png"
            alt="Clock"
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        )}
        <span className="pr-0 pt-1 text-base text-gray-500 line-through sm:text-xl">{text}</span>
        <div className="flex items-center text-xs text-gray-500 sm:text-base">
          <span>
            <span className="hidden md:inline">Due: </span>
            {dueDate.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CompletedTodoItem;
