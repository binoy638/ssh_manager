import React from "react";

function Button({
  children,
  onClick,
  props,
}: {
  children: React.ReactNode;
  onClick: () => void;
  props?: any;
}) {
  return (
    <div
      className="bg-red-500 px-4 py-2 cursor-pointer flex justify-center items-center rounded text-white hover:opacity-80"
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export default Button;
