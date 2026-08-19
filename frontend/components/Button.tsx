import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' };

export default function Button({ children, className = '', variant = 'primary', ...rest }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium';
  const variants: Record<string,string> = {
    primary: 'bg-teal-500 text-white hover:bg-teal-600',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700'
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
