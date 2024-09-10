'use client'

import { useState } from 'react';
import Link from 'next/link';

const NavbarTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between md:justify-center">
        <div className="text-white text-lg font-bold md:absolute md:left-4">
          MyWebsite
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            Home
          </Link>
          <Link href="/about">
            About
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link href="/">
          Home
          </Link>
          <Link href="/about">
          About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarTest;