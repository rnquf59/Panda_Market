import Image from "next/image";
import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "heart";
  size:
    | "large"
    | "medium"
    | "small-40"
    | "small-48"
    | "heart-large"
    | "heart-small";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  heartIcon?: "line" | "pink";
}

export default function Button({
  variant,
  size,
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  heartIcon = "line",
  ...props
}: ButtonProps) {
  const baseClasses = "font-pretendard font-semibold";

  const variants = {
    primary:
      "bg-primary-100 text-gray-100 hover:bg-primary-200 active:bg-primary-300 disabled:bg-gray-400",
    secondary:
      "bg-gray-50 text-primary-100 border border-primary-100 hover:bg-primary-200 hover:text-gray-100 active:bg-primary-300 active:text-gray-100 disabled:bg-gray-400 disabled:text-gray-100 disabled:border-gray-400",
    heart: "bg-transparent hover:bg-gray-50 active:bg-gray-100",
  };

  const sizes = {
    large: "px-[124px] py-3 text-xl rounded-full",
    medium: "px-[71px] py-[11px] text-2lg rounded-full",
    "small-40": "px-[23px] py-2 text-lg rounded-lg",
    "small-48": "px-[43px] py-[11px] text-lg rounded-lg",
    "heart-large": "px-3 py-1 rounded-[35px] flex items-center gap-1",
    "heart-small": "px-3 py-[3px] rounded-[35px] flex items-center gap-1",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {variant === "heart" ? (
        <>
          <Image
            src={
              heartIcon === "pink"
                ? "/icon/ic_heart_pink.svg"
                : "/icon/ic_heart_line.svg"
            }
            alt="좋아요"
            width={size === "heart-large" ? 32 : 24}
            height={size === "heart-large" ? 32 : 24}
            className="flex items-center justify-center"
          />
          <span className="text-lg font-medium text-gray-500 flex items-center justify-center">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
