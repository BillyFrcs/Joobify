'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signOut, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Flowbite, CustomFlowbiteTheme,
  Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Avatar
} from 'flowbite-react';

import Link from 'next/link';
import Image from 'next/image';

import firebaseApp from '@/config/firebaseApp';

import '../../styles/globals.css';

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState(null);

  const auth = getAuth(firebaseApp);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSetActive = (navItem) => {
    setActive(navItem);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);

      router.push('/');
    } catch (error) {
      console.error('Error signing out with Google: ', error.message);
    }
  };

  return (
    <Navbar fluid rounded className='main-navbar overflow-auto fixed mx-auto top-0 left-0 w-full z-50'>
      <NavbarBrand href="/">
        <Image className="mr-3 ml-0 h-6 sm:h-10 logo" src="/images/JoobifyLogo.svg" width={0} height={0} priority={true} alt="Joobify Logo" />
      </NavbarBrand>

      <div className="flex flex-col md:order-2">
        {
          user ? (
            <div className='flex'>
              <Dropdown
                className=''
                arrowIcon={false}
                inline
                label={
                  <Avatar className="mr-5 rounded" img={user.photoURL} alt={user.displayName} rounded />
                }
              >
                <DropdownHeader >
                  <span className="block text-sm">{user.displayName}</span>
                  <span className="block truncate text-sm font-medium">{user.email}</span>
                </DropdownHeader>
                <DropdownItem>
                  <Link href="/profile">Profile</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={signOutUser} className='hover:bg-red-500' color='failure'>Sign out</DropdownItem>
              </Dropdown>
            </div>
          ) : (
            <div className='flex mr-3 gap-2'>
              <Link className="main-font" href="/signin">
                <Button className="joobify-black-color main-btn">Sign in</Button>
              </Link>

              <Link className="main-font" href="/signup">
                <Button className="joobify-main-color main-btn">Sign up</Button>
              </Link>
            </div>
          )
        }

        <NavbarToggle />
      </div>

      <NavbarCollapse className='justify-center'>
        <NavbarLink onClick={() => handleSetActive('home')} className={`${active === 'home' ? 'main-color font-extrabold' : ''} main-text mr-5`} href="#home">Home</NavbarLink>
        <NavbarLink onClick={() => handleSetActive('jobs')} className={`${active === 'jobs' ? 'main-color font-extrabold' : ''} main-text mr-5`} href="#jobs">Jobs</NavbarLink>
        <NavbarLink onClick={() => handleSetActive('about')} className={`${active === 'about' ? 'main-color font-extrabold' : ''} main-text mr-5`} href="#about">About</NavbarLink>
        <NavbarLink onClick={() => handleSetActive('contact')} className={`${active === 'contact' ? 'main-color font-extrabold' : ''} main-text mr-5}`} href="#contact">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

const SimpleNavigation = () => {
  return (
    <Navbar fluid rounded className='fixed w-full'>
      <NavbarBrand href="/">
        <Image className="mr-3 ml-0 h-6 sm:h-10 logo" src="/images/JoobifyLogo.svg" width={0} height={0} priority={true} alt="Joobify Logo" />
      </NavbarBrand>
    </Navbar>
  );
};

export { Navigation, SimpleNavigation };