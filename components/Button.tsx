import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  href?: string; // External
  to?: string;   // Internal
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  href, 
  to, 
  onClick, 
  className = '',
  type = 'button',
  fullWidth = false,
  disabled = false
}) => {
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-950 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base px-6 py-3 rounded-lg relative overflow-hidden group";
  
  const variants = {
    primary: "bg-brand-500 hover:bg-brand-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] focus:ring-brand-500 border border-transparent",
    secondary: "bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] focus:ring-emerald-500 border border-transparent", // Upwork green-ish
    outline: "bg-transparent border border-brand-800 text-brand-50 hover:border-brand-500 hover:text-brand-500 focus:ring-brand-500",
    ghost: "bg-transparent text-brand-300 hover:text-white hover:bg-brand-900 focus:ring-brand-500"
  };

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;
  const disabledClasses = disabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : '';

  const shimmer = variant === 'primary' && !disabled ? (
    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
  ) : null;

  const content = (
    <span className="relative z-20 flex items-center gap-2">{children}</span>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={`${combinedClasses} ${disabledClasses}`}
        target="_blank" 
        rel="nofollow noopener noreferrer"
        aria-disabled={disabled}
      >
        {shimmer}
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={`${combinedClasses} ${disabledClasses}`} aria-disabled={disabled}>
        {shimmer}
        {content}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={combinedClasses}
      disabled={disabled}
    >
      {shimmer}
      {content}
    </button>
  );
};