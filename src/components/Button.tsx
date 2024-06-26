import React, { MouseEventHandler } from "react";

const Button = ({
  text,
  handleClick,
  className,
}: {
  text: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => {
  return (
    <button
      className={`bg-subway-green shadow uppercase hover:bg-green-700 text-white py-2 px-4 rounded-md font-light w-full mt-4 ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
