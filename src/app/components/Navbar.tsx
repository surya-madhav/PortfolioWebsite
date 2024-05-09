"use client";
import Link from 'next/link'
import React from 'react'
import NavLink from './NavLink'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import MenuOverlay from './MenuOverlay';
import ContactMeDialog from './ContactDialog';
const links:{title:string,href:string}[] = []
export const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <nav className='w-full fixed top-0 left-0 right-0 z-10 bg-opacity-100 bg-gray-900 container mx-auto'>
            <div className='flex flex-wrap items-center justify-between mx-auto p-4'>
                <Link href={"/"} className='text-sm text-orange-400  opacity-80 font-medium shadow-sm  font-mono'>rssmv.</Link>                
                <div className='mobile-menu hidden'>
                    {
                        !navbarOpen ? (<button className='flex items-center px-3 py-2 border rounded border-slate-200' onClick={() => setNavbarOpen(true)}><Bars3Icon className='h-5 w-5' /></button>) : (<button className='flex items-center px-3 py-2 border rounded border-slate-200' onClick={() => setNavbarOpen(false)}>
                            <XMarkIcon className='h-5 w-5' />
                        </button>)
                    }
                </div>
                <div className='menu hidden md:block md:w-auto' id='navbar'>
                    <ul className='flex flex-row lg:mr-24 xl:mr-36'>
                        {
                            links.map((link, index) => (
                                <li key={index} className='inline-block md:ml-4'>
                                    <NavLink href={link.href} title={link.title} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            {navbarOpen ? <MenuOverlay links={links}/>: null}
        </nav>
    )
}
