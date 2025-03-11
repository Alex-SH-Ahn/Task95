import React, { useState, useMemo } from 'react';
import TextButton from '../components/TextButton';
import IconButton from '../components/IconButton';
import TodoItem from '../components/TodoItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // @mui/lab 대신 이것을 사용
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ErrorPopup from '../components/ErrorPopup';

interface Todo {
  id: number;
  text: string;
  dueDate: Date;
  isCompleted: boolean;
}

function Todo() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: '똥싸기',
      dueDate: new Date('2025-04-30'),
      isCompleted: false,
    },
    {
      id: 2,
      text: '방구먹기',
      dueDate: new Date('2025-03-10'),
      isCompleted: true,
    },
    {
      id: 3,
      text: '방구 뀌기',
      dueDate: new Date('2025-06-25'),
      isCompleted: true,
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const desktopTabs = ['All', 'Short Term', 'Long Term'];
  const mobileTabs = ['All', 'Short', 'Long'];

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    );
  };

  const filteredTodos = useMemo(() => {
    const today = new Date();
    const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

    switch (activeTab) {
      case 'Short Term':
        return todos.filter((todo) => todo.dueDate <= twoWeeksFromNow);
      case 'Long Term':
        return todos.filter((todo) => todo.dueDate > twoWeeksFromNow);
      default:
        return todos;
    }
  }, [todos, activeTab]);

  const handleAddTodo = () => {
    if (selectedDate && inputText) {
      setTodos([...todos, {
        id: todos.length + 1,
        text: inputText,
        dueDate: selectedDate.toDate(),
        isCompleted: false,
      }]);
      setInputText('');
      setSelectedDate(null);
    } else {
      setIsErrorPopupOpen(true);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-5 py-2">
      <div className="flex h-11 w-full">
        {desktopTabs.map((tab, index) => (
          <TextButton
            key={tab}
            text={tab}
            mobileText={mobileTabs[index]}
            alt={tab}
            size={20}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className="z-10"
          />
        ))}
      </div>

      <div className="container-todo -z-5 custom-scrollbar h-[84%] w-full -translate-y-1 overflow-y-scroll bg-background-white p-5">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            dueDate={todo.dueDate}
            isCompleted={todo.isCompleted}
            onToggle={() => handleToggleTodo(todo.id)}
          />
        ))}
      </div>

      {!inputOpen ? (
        <TextButton
          text="Add New Goal"
          alt="add new goal"
          size={20}
          className="mt-3 min-h-[40px] self-start"
          onClick={() => setInputOpen(true)}
        />
      ) : (
        <form 
          action="" 
          className="relative mt-3 flex w-[100%] items-center self-start"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder=" ~50 letters"
            className="container-focus mr-2 min-h-[40px] w-[95%] self-start"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="absolute right-[20%] top-1 flex max-h-[35px] items-center md:right-[9%]">
            <div
              className="group m-0 flex cursor-pointer items-center rounded-lg p-0 px-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <IconButton
                iconName="Calendar"
                alt="Calendar"
                size={20}
                paddingRight={0}
                className="mr-2 max-h-[35px] max-w-[35px] group-hover:bg-background-darkGray"
                handleClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(true);
                }}
              />
              <p className="m-0 hidden cursor-pointer p-0 font-dunggeunmo text-lg group-hover:text-background-darkGray md:inline">
                {selectedDate ? selectedDate.format('YYYY-MM-DD') : 'Select Date'}
              </p>
              <p className="m-0 cursor-pointer p-0 font-dunggeunmo text-lg group-hover:text-background-darkGray md:hidden">
                {selectedDate ? selectedDate.format('MM-DD') : ''}
              </p>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                value={selectedDate}
                onChange={(newValue: any) => setSelectedDate(newValue)}
                slotProps={{
                  textField: {
                    sx: { display: 'none' },
                  },
                  popper: {
                    sx: {
                      '& .MuiPaper-root': {
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
                        zIndex: 9999,
                      },
                    },
                    placement: 'bottom-start',
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [1200, 480], // [horizontal, vertical] 오프셋
                        },
                      },
                    ],
                  },
                }}
                disablePortal={false} // 포털 사용
                PopperProps={{
                  keepMounted: false,
                  disablePortal: false,
                  onClick: (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
                    e.preventDefault();
                    e.stopPropagation();
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          <TextButton 
            text="OK" 
            alt="OK" 
            size={23} 
            className="mr-0 min-h-[40px] min-w-[5%]"
            onClick={handleAddTodo}
          />
        </form>
      )}

      <ErrorPopup
        message="Input your goal and due date"
        isOpen={isErrorPopupOpen}
        onClose={() => setIsErrorPopupOpen(false)}
      />
    </div>
  );
}

export default Todo;
