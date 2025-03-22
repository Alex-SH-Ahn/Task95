import { useState, useMemo } from 'react';
import TextButton from '../components/TextButton';
import IconButton from '../components/IconButton';
import TodoItem from '../components/TodoItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // @mui/lab 대신 이것을 사용
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
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
      text: 'Buy groceries',
      dueDate: new Date('2025-03-25'),
      isCompleted: false,
    },
    {
      id: 2,
      text: 'Buy groceries',
      dueDate: new Date('2025-03-25'),
      isCompleted: false,
    },
    {
      id: 3,
      text: 'Buy groceries',
      dueDate: new Date('2025-03-25'),
      isCompleted: false,
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
    if (inputText.length > 50 || !selectedDate || selectedDate.toDate() < new Date()) {
      setIsErrorPopupOpen(true);
      setInputText('');
      setSelectedDate(null);
      return;
    }

    if (selectedDate && inputText) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: inputText,
          dueDate: selectedDate.toDate(),
          isCompleted: false,
        },
      ]);
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
        {filteredTodos.length === 0 ? (
          <p className="textShadow-dark text-center text-3xl text-background-darkGray">
            Add your first new task!
          </p>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              text={todo.text}
              dueDate={todo.dueDate}
              isCompleted={todo.isCompleted}
              onToggle={() => handleToggleTodo(todo.id)}
            />
          ))
        )}
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
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTodo();
          }}
        >
          <input
            type="text"
            placeholder="~50 letters"
            className="container-focus mr-2 min-h-[40px] w-[95%] self-start pl-2 outline-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="absolute right-[21%] top-1 flex max-h-[35px] items-center max-[400px]:right-[25%] lg:right-[7%] 2xl:right-[6%]">
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
                className="mr-1 max-h-[35px] max-w-[35px] group-hover:bg-background-darkGray"
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
                      '& .MuiPickersCalendarHeader-label': {
                        fontFamily: 'DungGeunMo, sans-serif',
                        fontSize: '1.2rem',
                      },
                      '& .MuiPaper-root': {
                        backgroundColor: 'white',
                        borderRadius: '0px',
                        borderRight: '3px solid #E9ECEB',
                        borderBottom: '3px solid #E9ECEB',
                        borderLeft: '3px solid #565656',
                        borderTop: '3px solid #565656',
                        boxShadow: '0px 0px 0px rgba(0,0,0,0.0)',
                        zIndex: 9999,
                      },
                      '& .MuiPickersCalendar-root': {
                        fontFamily: 'DungGeunMo, sans-serif',
                      },
                      '& .MuiPickersCalendarHeader-root': {
                        fontFamily: 'DungGeunMo, sans-serif',
                      },
                      '& .MuiPickersDay-root': {
                        fontFamily: 'DungGeunMo, sans-serif',
                        fontSize: '1.2rem',
                      },
                      '& .MuiDayCalendar-weekDayLabel': {
                        fontFamily: 'DungGeunMo, sans-serif',
                        fontSize: '1rem',
                      },
                      '& .MuiPickersDay-root.Mui-selected': {
                        fontFamily: 'DungGeunMo, sans-serif',
                      },
                      '& .MuiTypography-root': {
                        fontFamily: 'DungGeunMo, sans-serif',
                      },
                      '& .MuiButtonBase-root': {
                        fontFamily: 'DungGeunMo, sans-serif',
                      },
                      '& .MuiPickersToolbarText-root': {
                        fontFamily: 'DungGeunMo, sans-serif',
                      },
                      '& .MuiPickersYear-yearButton': {
                        fontFamily: 'DungGeunMo, sans-serif',
                        fontSize: '1.2rem',
                        color: '#393939',
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
                // disablePortal={false}
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
        message="Input valid task and date"
        isOpen={isErrorPopupOpen}
        onClose={() => setIsErrorPopupOpen(false)}
      />
    </div>
  );
}

export default Todo;
