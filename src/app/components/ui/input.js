import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(function Input({ className, type, ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      {...props}
      className={cn(
        "focus:outline-none bg-transparent p-2 border border-border rounded-lg focus-visible:border-white w-full",
        className
      )}
    />
  );
});

const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      {...props}
      className={cn(
        "focus:outline-none bg-transparent p-2 border border-border rounded-lg focus-visible:border-white w-full",
        className
      )}
    />
  );
});

export { Input, Textarea };
