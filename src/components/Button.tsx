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
      className={`bg-subway-green shadow-lg text-lg hover:shadow-xl text-white py-3 px-6 rounded-md font-normal uppercase w-full mt-4 transition ease-in-out duration-200 active:bg-green-800 ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
