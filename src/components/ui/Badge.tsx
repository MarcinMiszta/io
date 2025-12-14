import React from 'react';
import clsx from 'clsx';
import './Badge.css';

interface BadgeProps {
    variant?: 'success' | 'warning' | 'danger' | 'neutral';
    children: React.ReactNode;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    variant = 'neutral',
    children,
    className
}) => {
    return (
        <span className={clsx('badge', `badge-${variant}`, className)}>
            {children}
        </span>
    );
};
