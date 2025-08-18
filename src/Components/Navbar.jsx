import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { toast } from 'react-toastify';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Follow system preference if no theme is set
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        
        if (!localStorage.getItem('theme')) {
            setTheme(systemTheme);
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Listen for system theme changes
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const logOut = () => {
        signOutUser().then(() => {
            toast.success('Sign Out Successful');
            setIsMenuOpen(false);
        });
    };

    const closeMenu = () => setIsMenuOpen(false);

    // Navigation links for logged-out users (3 links)
    const loggedOutLinks = (
        <>
            <NavLink 
                className={({ isActive }) => 
                    `px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-primary-focus ${
                        isActive ? 'bg-primary-focus text-primary-content' : 'text-primary-content'
                    }`
                } 
                to={'/'} 
                onClick={closeMenu}
            >
                Home
            </NavLink>
            <NavLink 
                className={({ isActive }) => 
                    `px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-primary-focus ${
                        isActive ? 'bg-primary-focus text-primary-content' : 'text-primary-content'
                    }`
                } 
                to={'/all-scholarships'} 
                onClick={closeMenu}
            >
                All Scholarships
            </NavLink>
            <NavLink 
                className={({ isActive }) => 
                    `px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-primary-focus ${
                        isActive ? 'bg-primary-focus text-primary-content' : 'text-primary-content'
                    }`
                } 
                to={'/login'} 
                onClick={closeMenu}
            >
                Login
            </NavLink>
        </>
    );

    // Navigation links for logged-in users (5 links)
    const loggedInLinks = (
        <>
            <NavLink 
                className={({ isActive }) => 
                    `px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-primary-focus ${
                        isActive ? 'bg-primary-focus text-primary-content' : 'text-primary-content'
                    }`
                } 
                to={'/'} 
                onClick={closeMenu}
            >
                Home
            </NavLink>
            <NavLink 
                className={({ isActive }) => 
                    `px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-primary-focus ${
                        isActive ? 'bg-primary-focus text-primary-content' : 'text-primary-content'
                    }`
                } 
                to={'/all-scholarships'} 
                onClick={closeMenu}
            >
                All Scholarships
            </NavLink>
            <NavLink 
                className={({ isActive }) => 
                    `px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-primary-focus ${
                        isActive ? 'bg-primary-focus text-primary-content' : 'text-primary-content'
                    }`
                } 
                to={'/dashboard'} 
                onClick={closeMenu}
            >
                Dashboard
            </NavLink>
            <NavLink 
                className={({ isActive }) => 
                    `px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-primary-focus ${
                        isActive ? 'bg-primary-focus text-primary-content' : 'text-primary-content'
                    }`
                } 
                to={'/my-profile'} 
                onClick={closeMenu}
            >
                My Profile
            </NavLink>
        </>
    );

    return (
        <nav className='sticky top-0 z-50 w-full bg-primary shadow-lg transition-all duration-300'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <Link to={'/'} className='flex items-center space-x-2 flex-shrink-0'>
                        <img 
                            className='h-10 w-10 rounded-full' 
                            src='/logo.png' 
                            alt="Akademi Logo" 
                        />
                        <span className='text-xl font-bold text-primary-content hidden sm:block'>
                            Akademi
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-2'>
                        {user ? loggedInLinks : loggedOutLinks}
                    </div>

                    {/* Right side - Theme toggle and User profile */}
                    <div className='flex items-center space-x-4'>
                        {/* Dark/Light Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-lg bg-primary-focus text-primary-content hover:bg-opacity-80 transition-all duration-300'
                            aria-label='Toggle theme'
                        >
                            {theme === 'light' ? (
                                <FaMoon className='h-5 w-5' />
                            ) : (
                                <FaSun className='h-5 w-5' />
                            )}
                        </button>

                        {/* User Profile Dropdown */}
                        {user ? (
                            <div className='relative'>
                                <div className='dropdown dropdown-end'>
                                    <div 
                                        tabIndex={0} 
                                        role='button' 
                                        className='btn btn-ghost btn-circle avatar hover:bg-primary-focus'
                                    >
                                        <div className='w-10 rounded-full ring-2 ring-primary-content ring-opacity-20'>
                                            <img 
                                                alt={user?.displayName || 'User'} 
                                                src={user?.photoURL || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} 
                                                className='rounded-full'
                                            />
                                        </div>
                                    </div>
                                    <ul 
                                        tabIndex={0} 
                                        className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border'
                                    >
                                        <li className='menu-title'>
                                            <span className='text-base-content font-semibold'>
                                                {user?.displayName || 'User'}
                                            </span>
                                        </li>
                                        <li>
                                            <Link to='/my-profile' className='text-base-content hover:bg-primary hover:text-primary-content'>
                                                My Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/dashboard' className='text-base-content hover:bg-primary hover:text-primary-content'>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={logOut} 
                                                className='text-base-content hover:bg-error hover:text-error-content w-full text-left'
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <Link 
                                to={'/login'} 
                                className='hidden md:inline-flex px-4 py-2 bg-accent text-accent-content font-medium rounded-lg hover:bg-accent-focus transition-all duration-300'
                            >
                                Login
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='md:hidden p-2 rounded-lg text-primary-content hover:bg-primary-focus transition-all duration-300'
                            aria-label='Toggle menu'
                        >
                            {isMenuOpen ? (
                                <FaTimes className='h-6 w-6' />
                            ) : (
                                <FaBars className='h-6 w-6' />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className='md:hidden bg-primary-focus rounded-lg mt-2 p-4 space-y-2 shadow-lg'>
                        {user ? loggedInLinks : loggedOutLinks}
                        {!user && (
                            <Link 
                                to={'/login'} 
                                onClick={closeMenu}
                                className='block w-full px-4 py-2 bg-accent text-accent-content font-medium rounded-lg hover:bg-accent-focus transition-all duration-300 text-center'
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;