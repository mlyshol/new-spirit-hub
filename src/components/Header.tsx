'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" onClick={handleLinkClick} className="font-heading text-xl font-bold">
          The Spirit Hub
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/watch" className="hover:text-watch">Watch</Link>
          <Link href="/listen" className="hover:text-listen">Listen</Link>
          <Link href="/read" className="hover:text-read">Read</Link>
          <Link href="/search" className="hover:text-search">Search</Link>
          <Link href="/about" className="hover:text-about">About</Link>
          <Link href="/support" className="hover:text-support">Support</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-neutral"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3 text-sm font-medium">
          <Link href="/watch" onClick={handleLinkClick} className="block hover:text-watch">Watch</Link>
          <Link href="/listen" onClick={handleLinkClick} className="block hover:text-listen">Listen</Link>
          <Link href="/read" onClick={handleLinkClick} className="block hover:text-read">Read</Link>
          <Link href="/search" onClick={handleLinkClick} className="block hover:text-search">Search</Link>
          <Link href="/about" onClick={handleLinkClick} className="block hover:text-about">About</Link>
          <Link href="/support" onClick={handleLinkClick} className="block hover:text-support">Support</Link>
        </div>
      )}
    </header>
  );
}