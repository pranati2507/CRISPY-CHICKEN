import React from 'react';
import { motion } from 'motion/react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'white' | 'gray' | 'gradient-light' | 'gradient-warm' | 'dark';
  spacing?: 'none' | 'small' | 'medium' | 'large';
}

export function SectionWrapper({ 
  children, 
  id, 
  className = '', 
  background = 'white',
  spacing = 'medium'
}: SectionWrapperProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50/80',
    'gradient-light': 'bg-gradient-to-br from-gray-50/90 via-white to-gray-100/90',
    'gradient-warm': 'bg-gradient-to-br from-red-50/90 via-white to-orange-50/90',
    dark: 'bg-gradient-to-br from-black via-gray-900 to-red-900'
  };

  const spacingClasses = {
    none: '',
    small: 'py-12',
    medium: 'py-16 lg:py-20',
    large: 'py-20 lg:py-32'
  };

  return (
    <motion.section
      id={id}
      className={`
        relative w-full scroll-mt-16
        ${backgroundClasses[background]} 
        ${spacingClasses[spacing]}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Subtle border separation */}
      {background !== 'white' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />
        </>
      )}
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </motion.section>
  );
}