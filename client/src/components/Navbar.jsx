import React, { useState } from 'react';
import lawn_care from '../assets/lawn_care.avif';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='relative flex items-center justify-between px-6 font-semibold text-[3rem] text-black w-100vh bg-white font-robotoCondensed md:px-0 md:w-100vw lg:text-[3rem] lg:w-100vw'>
            {/* Logo */}
            <img src={lawn_care} className='w-[26rem] h-[8rem] pl-4 md:ml-4 lg:w-[24rem]' alt="Lawn Care Logo" />

            {/* Menu for larger screens */}
            <ul className='flex-row items-center hidden space-x-2 pr-[0rem] md:flex md:space-x-[2rem] lg:space-x-0 lg:text-[3rem] md:gap-10 md:mr-4'>
                <li className='cursor-pointer hover:border-b-2 hover:text-red-500 hover:border-black'>HOME</li>
                <li className='cursor-pointer hover:border-b-2 hover:text-red-500 hover:border-black'>ABOUT</li>
                <li className='cursor-pointer hover:border-b-2 hover:text-red-500 hover:border-black'>SERVICES</li>
                <li className='cursor-pointer hover:border-b-2 hover:text-red-500 hover:border-black'>CONTACT</li>
                <li className='cursor-pointer hover:border-b-2 hover:text-red-500 hover:border-black'>ACCOUNT</li>
            </ul>

            {/* Hamburger Menu for small/medium screens */}
            <button
                className='text-3xl text-center md:hidden focus:outline-none'
                onClick={toggleMenu}
            >
                &#9776;
            </button>

            {/* Side Menu for small/medium screens */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${isMenuOpen ? 'translate-x-[-15rem]' : 'translate-x-full'} w-64 md:hidden`}>
                <button
                    x onClick={toggleMenu}
                >
                    &times;
                </button>
                <ul className='flex flex-col items-start p-4 space-y-6 text-sm'>
                    <li className='cursor-pointer hover:border-b-2 hover:border-black'>HOME</li>
                    <li className='cursor-pointer hover:border-b-2 hover:border-black'>ABOUT</li>
                    <li className='cursor-pointer hover:border-b-2 hover:border-black'>SERVICES</li>
                    <li className='cursor-pointer hover:border-b-2 hover:border-black'>CONTACT</li>
                    <li className='cursor-pointer hover:border-b-2 hover:border-black'>ACCOUNT</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
