import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    fullWidth,
    className,
    id,
    inputClassName,
    ...props
}, ref) => {
    const inputId = id || props.name;

    return (
        <div className={clsx('form-control', fullWidth && 'w-full', className)}>
            {label && <label htmlFor={inputId} className="form-label">{label}</label>}
            <input
                id={inputId}
                ref={ref}
                className={clsx('form-input', error && 'form-input-error', inputClassName)}
                {...props}
            />
            {error && <span className="form-error">{error}</span>}
        </div>
    );
});

Input.displayName = "Input";
