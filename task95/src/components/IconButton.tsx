import React from 'react';

interface IconButtonProps {
  iconName: string;
  alt: string;
  paddingRight: number;
  size: number;
  className?: string;
  href?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  alt,
  paddingRight,
  size,
  href,
  className = '',
}) => {
  const iconPath = `../src/assets/icons/${iconName}.png`;

  const button = (
    <button
      className={`button container flex items-center justify-center ${className} p-0 w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem]`}
    >
      <img
        src={iconPath}
        alt={alt}
        className="object-contain"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          paddingRight: `${paddingRight}px`,
        }}
      />
    </button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {button}
      </a>
    );
  }

  return button;
};

export default IconButton;
