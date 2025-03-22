import { useState } from 'react';
import IconButton from '../components/IconButton';
import GuidePopup from '../components/GuidePopup';
import AuthPopup from '../components/AuthPopup';
import Todo from './Todo';
import MyPage from '../components/MyPage';

function MainPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isMyPageOpen, setIsMyPageOpen] = useState(true);
  const [userId, setUserId] = useState('');

  const handleAuthSubmit = (data: {
    username: string;
    password: string;
    confirmPassword?: string;
    rememberMe?: boolean;
  }) => {
    // 로그인/회원가입 처리
    console.log(data);
  };

  const handleAuthOpen = () => {
    if (userId) {
      setIsMyPageOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <div className="container absolute h-[80vh] w-[80vw]">
      <div className="banner m-1 flex items-center justify-between px-2 py-1 sm:px-5 sm:py-3">
        <h1 className="text-3xl text-text-light md:text-4xl">Task95</h1>
        <div className="flex items-center justify-center">
          <IconButton
            iconName="guide-black"
            alt="guide"
            size={23}
            paddingRight={1}
            className="mr-2"
            handleClick={() => setIsGuideOpen(true)}
          />
          <IconButton
            iconName="profile"
            alt="profile"
            size={20}
            paddingRight={1}
            className="mr-2"
            handleClick={() => handleAuthOpen()}
          />
          <IconButton
            iconName="github"
            alt="github"
            size={24}
            paddingRight={2}
            href="https://github.com/Alex-SH-Ahn/Task95"
          />
        </div>
      </div>

      <div className="flex h-[90%] w-[80vw] items-center justify-center">
        <Todo />
      </div>

      <MyPage
        isOpen={isMyPageOpen}
        userId={userId}
        onClose={() => setIsMyPageOpen(false)}
      />

      <AuthPopup
        isOpen={isAuthOpen}
        mode={authMode}
        onSubmit={handleAuthSubmit}
        onClose={() => setIsAuthOpen(false)}
        onModeChange={(newMode) => setAuthMode(newMode)}
      />

      <GuidePopup isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
}

export default MainPage;
