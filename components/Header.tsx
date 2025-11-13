
import React from 'react';
import { FootballIcon } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm p-4 sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto flex items-center gap-3">
        <FootballIcon />
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
          Turneringsresultat
        </h1>
      </div>
    </header>
  );
};
