import React from "react";

interface ButtonProps {
  text: string;
  handleClick: () => void;
  className?: string;
}

const Button = ({ text, handleClick, className }: ButtonProps) => {
  return (
    <button
      className={`rounded-full inline-block px-4 py-1 bg-yellow text-dark-green ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
