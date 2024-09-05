import React, { MouseEventHandler } from "react";

const Chip = ({
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
      className={`font-roboto font-normal bg-white text-sm border-2 p-2 px-6 shadow rounded-full ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Chip;
