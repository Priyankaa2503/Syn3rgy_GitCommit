import React from "react";
import Icons from "../Icons";

const Button = ({ children, onClick, icon }) => {
  return (
    <div
      className="w-full cursor-pointer rounded-full bg-[#0C21C1] hover:bg-opacity-95 flex items-center justify-center gap-2 text-white shadow-md shadow-gray-300 text-center font-semibold text-sm py-3"
      onClick={onClick}
    >
      {icon && <Icons name={icon} width={16} height={16} />}
      <div>{children}</div>
    </div>
  );
};

export default Button;
