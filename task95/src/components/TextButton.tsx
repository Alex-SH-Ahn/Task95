import React from 'react';

interface TextButtonProps {
  text: string;
  mobileText?: string;
  alt: string;
  size: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  mobileText,
  size,
  isActive = false,
  onClick,
  className = '',
}) => {
  const firstChar = text.charAt(0);
  const restOfText = text.slice(1);
  const mobileFirstChar = mobileText ? mobileText.charAt(0) : firstChar;
  const mobileRestOfText = mobileText ? mobileText.slice(1) : restOfText;

  return (
    <button
      className={`button mb-2 mr-2 flex min-h-[35px] min-w-fit items-start whitespace-nowrap px-4 py-2 text-lg leading-[0.7rem] ${
        isActive ? 'container-focus min-h-[43px]' : 'container'
      } ${className} ${
        isActive ? '' : 'hover:bg-background-darkGray'
      }`}
      onClick={onClick}
    >
      <span className="decoration-1.5 underline md:hidden">{mobileFirstChar}</span>
      <span className="md:hidden">{mobileRestOfText}</span>
      <span className="hidden md:inline decoration-1.5 underline">{firstChar}</span>
      <span className="hidden md:inline">{restOfText}</span>
    </button>
  );
};

export default TextButton;
