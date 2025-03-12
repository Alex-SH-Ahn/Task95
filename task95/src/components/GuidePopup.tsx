import { useState } from 'react';
import IconButton from './IconButton';

interface GuidePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function GuidePopup({ isOpen, onClose }: GuidePopupProps) {
  const [language, setLanguage] = useState<'ko' | 'en'>('en');

  if (!isOpen) return null;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ko' ? 'en' : 'ko'));
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* 팝업 컨텐츠 */}
      <div className="container relative top-40 bg-background-gray shadow-lg left-[25%] w-[70vw] sm:left-[50vw] sm:w-[35%]">
        <div className="banner m-0 flex items-center justify-between px-2 py-2 pr-1">
          <div className="flex items-center gap-2 text-lg sm:text-[1.7rem] text-text-light">
            <img src="../src/assets/icons/guide-white.png" alt="Guide" className="h-8" />
            {language === 'ko' ? '환영합니다!' : 'Welcome!'}
          </div>
          <div className="flex items-center gap-2">
            <IconButton
              iconName="world"
              alt="language change"
              size={27}
              paddingRight={1}
              className="sm:mr-2"
              handleClick={toggleLanguage}
            />
            <IconButton
              iconName="X"
              alt="Close"
              size={23}
              paddingRight={1}
              className="mr-1"
              handleClick={onClose}
            />
          </div>
        </div>
        <div className="p-4 text-lg">
          {language === 'ko' ? (
            <div className="whitespace-pre-wrap">
              {`Task95를 만나보세요! 🚀
Task95는 Windows 95 스타일의 심플한 목표 트래커입니다.
⏰ 단기 목표와 📅 장기 목표를 별도로 확인하고 관리하세요.
완료한 목표는 마이페이지에서 언제든지 다시 볼 수 있습니다.
Task95와 함께 목표를 정리하고 실천해 보세요! ✅`}
            </div>
          ) : (
            <div className="whitespace-pre-wrap">
              {`Welcome to Task95! 🚀
Task95 is a Windows 95-themed goal tracker.
Manage ⏰ short-term and 📅 long-term goals with a separate view. 
Completed goals are stored in My Page for review. 
Plan, track, and achieve with Task95! ✅`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuidePopup;
