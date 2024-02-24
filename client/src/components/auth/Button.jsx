import React from "react";
import Icons from "../Icons";

const Button = ({ children, onClick, icon }) => {
  return (
    <div
      className="w-full cursor-pointer rounded-full bg-gradient-to-br from-[#44DDA0] to-[#84e1bc] hover:bg-opacity-95 flex items-center justify-center gap-2 text-[#141414] shadow-md shadow-black text-center font-semibold text-sm py-3"
      onClick={onClick}
    >
      {icon && <Icons name={icon} width={16} height={16} />}
      <div>{children}</div>
    </div>
  );
};

export default Button;
