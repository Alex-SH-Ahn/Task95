import { useState } from 'react';
import IconButton from './IconButton';
import TextButton from './TextButton';
import ErrorPopup from './ErrorPopup';
import TodoItem from './TodoItem';
import CompletedTodoItem from './CompletedTodoItem';

interface MyPageProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Todo {
  id: number;
  text: string;
  dueDate: Date;
  isCompleted: boolean;
}

const MyPage: React.FC<MyPageProps> = ({ isOpen, userId, onClose }) => {
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [mode, setMode] = useState<'logout' | 'delete'>('logout');
  const logoutMessage = "Logout Message";
  const deleteMessage = "Delete Message";
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: 'Buy groceries',
      dueDate: new Date('2025-03-25'),
      isCompleted: true,
    },
    {
      id: 2,
      text: 'Buy groceries',
      dueDate: new Date('2025-03-25'),
      isCompleted: true,
    },
    {
      id: 3,
      text: 'Buy groceries',
      dueDate: new Date('2025-03-25'),
      isCompleted: true,
    },
  ]);

  if (!isOpen) return null;

  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <div className="fixed inset-0 z-50 mx-4 flex items-center">
      <div className="container relative -top-5 w-[100%] transform sm:w-[600px] md:-top-[13%] md:left-[54%]">
        <div className="banner m-0 flex items-center justify-between px-3 py-2 pr-1">
          <div className="flex items-center gap-2 text-xl text-text-light sm:text-[1.7rem]">
            <img src="../src/assets/icons/profile-white.png" alt="Profile" className="h-7" />
            My Page
          </div>
          <div className="flex items-center">
            <IconButton
              iconName="X"
              alt="Close"
              size={18}
              paddingRight={1}
              className="mr-1"
              handleClick={onClose}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center p-3 px-5 text-xl">
          <div className="custom-scrollbar h-[200px] w-full -translate-y-1 overflow-y-scroll bg-background-white p-5 container-focus">
            {completedTodos.map((todo) => {
              return (
                <CompletedTodoItem
                  key={todo.id}
                  text={todo.text}
                  dueDate={todo.dueDate}
                />
              )
            })}
          </div>
          <div className="flex w-full mt-3 items-end">
            <TextButton
              text='Log Out'
              alt="OK"
              size={23}
              className="-mb-1 mr-0 justify-center outline-none"
              onClick={() => setIsErrorPopupOpen(true)}
            />
            <button className="p-0 underline hover:text-background-darkGray text-lg">
              Delete Account
            </button>
          </div>
        </div>

        <ErrorPopup
          message={mode === 'logout' ? logoutMessage : deleteMessage}
          isOpen={isErrorPopupOpen}
          onClose={() => setIsErrorPopupOpen(false)}
        />
      </div>
    </div>
  );
};

export default MyPage;
