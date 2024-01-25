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

import firebaseApp from '@/config/firebase';

import '../../styles/globals.css';

const Navigation = () => {
  const [user, setUser] = useState(null);
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

  const signOutUser = async () => {
    try {
      await signOut(auth);

      router.push('/');
    } catch (error) {
      console.error('Error signing out with Google: ', error.message);
    }
  };

  return (
    <Navbar fluid rounded className='main-navbar'>
      <NavbarBrand href="/">
        <Image className="mr-3 ml-0 h-6 sm:h-10 logo" src="/images/JoobifyLogo.svg" width={0} height={0} priority={true} alt="Joobify Logo" />

        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span> */}

      </NavbarBrand>

      <div className="flex md:order-2">
        {
          user ? (
            <div className='flex'>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar className="mr-5" alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                }
              >
                <DropdownHeader>
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
            <div className='flex'>
              <div className="mr-3">
                <Link className="main-font" href="/signin">
                  <Button className="joobify-black-color main-btn">Sign in</Button>
                </Link>
              </div>

              <div className="mr-3">
                <Link className="main-font" href="/signup">
                  <Button className="joobify-main-color main-btn">Sign up</Button>
                </Link>
              </div>
            </div>
          )
        }

        <NavbarToggle />
      </div>

      <NavbarCollapse className='justify-center'>
        <NavbarLink className="main-text mr-5" href="#home">Home</NavbarLink>
        <NavbarLink className="main-text mr-5" href="#jobs">Jobs</NavbarLink>
        <NavbarLink className="main-text mr-5" href="#about">About</NavbarLink>
        <NavbarLink className="main-text mr-5" href="#contact">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

const SimpleNavigation = () => {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
        <Image className="mr-3 ml-0 h-6 sm:h-10 logo" src="/images/JoobifyLogo.svg" width={0} height={0} priority={true} alt="Joobify Logo" />
      </NavbarBrand>
    </Navbar>
  );
};

export { Navigation, SimpleNavigation };