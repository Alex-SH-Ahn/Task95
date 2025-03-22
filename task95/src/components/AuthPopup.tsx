import { useState } from 'react';
import IconButton from './IconButton';
import TextButton from './TextButton';
import ErrorPopup from './ErrorPopup';

interface AuthPopupProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onSubmit: (data: {
    username: string;
    password: string;
    confirmPassword?: string;
    rememberMe?: boolean;
  }) => void;
  onClose: () => void;
  onModeChange: (mode: 'login' | 'signup') => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, mode, onSubmit, onClose, onModeChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    // 이메일 검증
    if (username.length === 0) {
      setErrorMessage('Please enter your username');
      setIsErrorPopupOpen(true);
      return;
    }

    // 비밀번호 길이 검증
    if (password.length < 8 || password.length > 20) {
      setErrorMessage('Password must be 8 ~ 20 letters & numbers');
      setIsErrorPopupOpen(true);
      return;
    }

    // 회원가입 모드일 때 추가 검증
    if (mode === 'signup') {
      // 비밀번호 확인 일치 검증
      if (password !== confirmPassword) {
        setErrorMessage('Password does not match');
        setIsErrorPopupOpen(true);
        return;
      }
    }

    // 모든 검증을 통과하면 제출
    onSubmit({ username, password, confirmPassword, rememberMe });
  };

  const handleModeChange = () => {
    // 입력 필드 초기화
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setRememberMe(false);

    // 모드 변경
    onModeChange(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="fixed inset-0 z-50 mx-4 flex items-center">
      <div className="container relative -top-5 w-[100%] transform sm:w-[600px] md:-top-[13%] md:left-[54%]">
        <div className="banner m-0 flex items-center justify-between px-3 py-2 pr-1">
          <div className="flex items-center gap-2 text-xl text-text-light sm:text-[1.7rem]">
            <img src="../src/assets/icons/profile-white.png" alt="Profile" className="h-7" />
            {mode === 'login' ? 'Log In' : 'Sign Up'}
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
          <p className="mb-2">Username:</p>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="container-focus mb-3 h-[40px] w-[100%] pl-2 outline-none"
          />
          <p className="mb-2">Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8 ~ 20 letters & numbers"
            className="container-focus mb-3 h-[40px] w-[100%] pl-2 outline-none"
          />

          {mode === 'signup' && (
            <div className="mb-4 w-[100%]">
              <p className="mb-2">Password Check:</p>
              <input
                type="password"
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="container-focus mb-3 h-[40px] w-[100%] pl-2 outline-none"
              />
            </div>
          )}

          {mode === 'login' && (
            <label className="m-0 -ml-3 mb-2 flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="invisible"
              />
              {rememberMe ? (
                <img
                  src="../src/assets/icons/checkbox-checked.png"
                  alt="Checkbox"
                  className="m-0 mr-2 h-5 w-5"
                />
              ) : (
                <img
                  src="../src/assets/icons/checkbox.png"
                  alt="Checkbox"
                  className="m-0 mr-2 h-5 w-5"
                />
              )}
              Remember me
            </label>
          )}

          <div className="flex w-full items-end justify-between">
            <div>
              <p className="mr-1.5 hidden md:inline-block">
                {mode === 'login' ? "Don't have an account?" : 'Already have account?'}
              </p>
              <button
                onClick={handleModeChange}
                className="p-0 underline hover:text-background-darkGray"
              >
                {mode === 'login' ? 'Create an account' : 'Log in'}
              </button>
            </div>
            <TextButton
              text={mode === 'login' ? 'Log In' : 'Sign Up'}
              alt="OK"
              size={23}
              className="mb-0 mr-0 justify-center outline-none"
              onClick={handleSubmit}
            />
          </div>
        </div>

        <ErrorPopup
          message={errorMessage}
          isOpen={isErrorPopupOpen}
          onClose={() => setIsErrorPopupOpen(false)}
        />
      </div>
    </div>
  );
};

export default AuthPopup;
