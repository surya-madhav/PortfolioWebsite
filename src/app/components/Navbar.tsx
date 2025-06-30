"use client";
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

const links:{title:string,href:string}[] = [
  {
    title: "About Me",
    href: "/#about",
  },
  {
    title: "Projects",
    href: "/#projects",
  },
  {
    title: "Notes",
    href: "/notes",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Skills",
    href: "/#skills",
  }
]
export const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    
    useEffect(() => {
        const handleScroll = () => {
            const sections = {
                '/#about': document.getElementById('about')?.offsetTop,
                '/#projects': document.getElementById('projects')?.offsetTop,
                '/#skills': document.getElementById('skills')?.offsetTop
            };
            
            const scrollPosition = window.scrollY + 150; // Adjusted offset
            
            let currentSection = "";
            for (const [href, top] of Object.entries(sections)) {
                if (top && scrollPosition >= top) {
                    currentSection = href;
                }
            }
            setActiveSection(currentSection);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <nav className='w-full fixed top-0 left-0 right-0 z-10 bg-gray-900/60 backdrop-blur-md border-b border-gray-800/30 container mx-auto'>
            <div className='flex flex-wrap items-center justify-between mx-auto p-4'>
                <Link href={"/"} className='text-sm text-orange-400 opacity-80 font-medium shadow-sm font-mono'>rssmv.</Link>                
                <div className='mobile-menu block md:hidden'>
                    <button className='flex items-center px-3 py-2 border rounded border-slate-200' onClick={() => setNavbarOpen(!navbarOpen)}>
                        {navbarOpen ? <XMarkIcon className='h-5 w-5' /> : <Bars3Icon className='h-5 w-5' />}
                    </button>
                </div>
                <div className='menu hidden md:block md:w-auto' id='navbar'>
                    <ul className='flex flex-row lg:mr-24 xl:mr-36'>
                        {links.map((link, index) => (
                            <li key={index} className='inline-block md:ml-4'>
                                <Link 
                                    href={link.href} 
                                    className={`block py-2 pl-3 pr-4 ${activeSection === link.href ? 'text-orange-400 font-medium' : 'text-gray-200'} hover:text-orange-300`}
                                    onClick={() => setNavbarOpen(false)}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {navbarOpen && (
                <div className="md:hidden bg-gray-900/60 backdrop-blur-md border-t border-gray-800/30 py-2">
                    <ul className='flex flex-col py-4 items-center'>
                        {links.map((link, index) => (
                            <li key={index} className='py-2'>
                                <Link 
                                    href={link.href} 
                                    className={`block py-2 px-4 ${activeSection === link.href ? 'text-orange-400 font-medium' : 'text-gray-200'} hover:text-orange-300`}
                                    onClick={() => setNavbarOpen(false)}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    )
}
