import React, { MouseEventHandler } from "react";

const Chip = ({
  text,
  handleClick,
  className,
  isActive,
}: {
  text: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  isActive?: boolean;
}) => {
  return (
    <button
      className={`font-oswald font-bold text-sm p-2 uppercase px-6 rounded-full transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-subway-dark-green text-white "
            : "bg-white text-subway-dark-green "
        }
        hover:bg-subway-green hover:text-white ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Chip;
