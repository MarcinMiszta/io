import React from 'react';
import clsx from 'clsx';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading,
  leftIcon,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && 'btn-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="animate-spin">⌛</span>}
      {!isLoading && leftIcon}
      {children}
    </button>
  );
};
