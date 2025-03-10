import React, { useState, useMemo } from 'react';
import TextButton from '../components/TextButton';
import TodoItem from '../components/TodoItem';

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
      text: 'Complete project documentation',
      dueDate: new Date('2025-04-30'),
      isCompleted: false,
    },
    {
      id: 2,
      text: 'Review pull requests',
      dueDate: new Date('2025-03-10'),
      isCompleted: true,
    },
    {
      id: 3,
      text: 'Review pull requests',
      dueDate: new Date('2025-06-25'),
      isCompleted: true,
    },
  ]);

  const desktopTabs = ['All', 'Short Term', 'Long Term'];
  const mobileTabs = ['All', 'Short', 'Long'];

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const filteredTodos = useMemo(() => {
    const today = new Date();
    const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

    switch (activeTab) {
      case 'Short Term':
        return todos.filter(todo => todo.dueDate <= twoWeeksFromNow);
      case 'Long Term':
        return todos.filter(todo => todo.dueDate > twoWeeksFromNow);
      default:
        return todos;
    }
  }, [todos, activeTab]);

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
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            dueDate={todo.dueDate}
            isCompleted={todo.isCompleted}
            onToggle={() => handleToggleTodo(todo.id)}
          />
        ))}
      </div>

      <TextButton text="Add New Goal" alt="add new goal" size={20} className="mt-3 self-start" />
    </div>
  );
}

export default Todo;
