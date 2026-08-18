import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export default function Input({ label, className = '', ...rest }: Props) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input className={`mt-1 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2 focus:ring-2 focus:ring-teal-200 ${className}`} {...rest} />
    </div>
  );
}
