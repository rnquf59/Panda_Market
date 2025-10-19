import React from "react";

interface InputPorps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  errorMessage?: string;
}

export default function Input({
  icon,
  errorMessage,
  className = "",
  ...props
}: InputPorps) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          {...props}
          className={`w-full px-6 py-[15px] text-lg font-regular rounded-xl bg-gray-100 placeholder-gray-400 border border-transparent focus:bg-gray-50 focus:border-primary-100 focus:placeholder-transparent focus:outline-none [&:not(:placeholder-shown)]:placeholder-transparent ${
            errorMessage ? "border-error" : ""
          } ${icon ? "pr-12" : ""} ${className}`}
        />
        {icon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-error">{errorMessage}</p>
      )}
    </div>
  );
}
