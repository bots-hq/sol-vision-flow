
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden">
        <svg 
          className="absolute inset-0 h-full w-full" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9945FF" />
              <stop offset="50%" stopColor="#14F195" />
              <stop offset="100%" stopColor="#03E1FF" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.8" />
          <g transform="translate(26, 26) scale(0.48)">
            <path fill="white" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
            <path fill="white" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
            <path fill="white" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
          </g>
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-solana via-solana-accent to-solana-secondary">
          SolWeb
        </h1>
        <p className="text-xs text-muted-foreground tracking-wide">EXPLORER</p>
      </div>
    </div>
  );
};

export default Logo;
