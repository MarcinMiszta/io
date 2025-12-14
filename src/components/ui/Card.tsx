import React from 'react';
import clsx from 'clsx';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    interactive,
    ...props
}) => {
    return (
        <div
            className={clsx('card', interactive && 'card-interactive', className)}
            {...props}
        >
            {children}
        </div>
    );
};
