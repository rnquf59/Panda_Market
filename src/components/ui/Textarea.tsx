import React from "react";

interface TextareaPorps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  className?: string;
}

export default function Textarea({
  errorMessage,
  className = "",
  ...props
}: TextareaPorps) {
  return (
    <div className="w-full">
      <div className="relative">
        <textarea
          {...props}
          className={`w-full px-6 py-4 text-lg font-regular rounded-xl bg-gray-100 placeholder-gray-400 border border-transparent focus:bg-gray-50 focus:border-primary-100 focus:placeholder-gray-800 focus:outline-none [&:not(:placeholder-shown)]:placeholder-gray-800 resize-none ${
            errorMessage ? "border-error" : ""
          } ${className}`}
        />
      </div>
      {errorMessage && (
        <p className="mt-2 text-lg text-error">{errorMessage}</p>
      )}
    </div>
  );
}
