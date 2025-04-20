'use client';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useState } from 'react';

const themes = {
  dracula: 'dracula',
  winter: 'winter'
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.dracula);

  const toggleTheme = () => {
    const newTheme = theme === themes.dracula ? themes.winter : themes.dracula;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className='btn btn-sm btn-outline'>
      {theme === 'winter' ? (
        <BsMoonFill className='h-4 w-4 ' />
      ) : (
        <BsSunFill className='h-4 w-4' />
      )}
    </button>
  );
};
export default ThemeToggle;