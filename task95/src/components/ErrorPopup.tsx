import IconButton from './IconButton';
import TextButton from './TextButton';

interface ErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

function ErrorPopup({ isOpen, onClose, message }: ErrorPopupProps) {
  if (!isOpen) return null;

  return (
    // 배경 오버레이
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      {/* 팝업 컨텐츠 */}
      <div className="container w-[90%] max-w-[500px] transform bg-background-gray shadow-lg sm:w-[400px]">
        <div className="banner m-0 flex items-center justify-between px-2 py-2 pr-1">
          <div className="flex items-center gap-2 text-lg text-text-light sm:text-[1.7rem]">
            <img src="../src/assets/icons/warning.png" alt="Warning" className="h-8" />
            Error Message
          </div>
          <div className="flex items-center gap-2">
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
        <div className="flex flex-col items-center justify-center">
          <div className="mt-4 flex items-center justify-center p-4 text-lg">
            <img src="../src/assets/icons/warning.png" alt="Warning" className="mr-2 h-8" />
            {message}
          </div>
          <TextButton
            text="OK"
            alt="OK"
            size={23}
            className="mb-4 mr-1 justify-center"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default ErrorPopup;
