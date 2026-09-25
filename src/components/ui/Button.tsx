import type { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
};

const variantStyles = {
  default: "bg-gray-900 text-white hover:bg-gray-800",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        inline-flex items-center justify-center rounded-lg font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;