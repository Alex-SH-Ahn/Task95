import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Popup({ isOpen, onClose, children }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 팝업 컨텐츠 */}
      <div className="relative bg-background-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <img src="../src/assets/icons/X.png" alt="Close" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Popup; 