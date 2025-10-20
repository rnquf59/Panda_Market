import React from "react";

interface DropdownProps {
  variant: "large" | "medium" | "small";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Dropdown({
  variant,
  children,
  className = "",
  onClick,
}: DropdownProps) {
  const baseClasses = "bg-white flex flex-col cursor-pointer";

  const variants = {
    large: "w-[132px] h-[92px] rounded-lg border border-gray-300",
    medium: "w-[102px] h-[90px] rounded-lg border border-gray-300",
    small: "w-[130px] h-[84px] rounded-xl border border-gray-200",
  };

  const textStyles = {
    large: "text-lg font-regular text-gray-500",
    medium: "text-md font-regular text-gray-500",
    small: "text-lg font-regular text-gray-800",
  };

  const childrenArray = React.Children.toArray(children);
  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      <div
        className={`h-1/2 flex items-center justify-center ${
          variant === "small" ? "border-b border-gray-200" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onClick) {
            onClick();
          }
        }}
      >
        <span className={textStyles[variant]}>{childrenArray[0]}</span>
      </div>

      {childrenArray.length > 1 && (
        <div
          className="h-1/2 flex items-center justify-center"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <span className={textStyles[variant]}>{childrenArray[1]}</span>
        </div>
      )}
    </div>
  );
}
