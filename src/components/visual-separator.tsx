import React from 'react';

interface VisualSeparatorProps {
  type?: 'subtle' | 'gradient' | 'dots';
  className?: string;
}

export function VisualSeparator({ type = 'subtle', className = '' }: VisualSeparatorProps) {
  if (type === 'gradient') {
    return (
      <div className={`w-full h-24 flex items-center justify-center ${className}`}>
        <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`w-full h-24 flex items-center justify-center ${className}`}>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-red-300"></div>
          <div className="w-2 h-2 rounded-full bg-red-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-16 ${className}`}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent"></div>
    </div>
  );
}