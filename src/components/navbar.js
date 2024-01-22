import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Flowbite, CustomFlowbiteTheme,
  Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Avatar
} from 'flowbite-react';

import '../styles/globals.css';

const Navigation = () => {
  return (
    <Navbar fluid rounded className='main-navbar'>
      <NavbarBrand href="">
        <Image className="mr-3 ml-0 h-6 sm:h-10" src="/images/JoobifyLogo.svg" width={200} height={200} alt="Joobify Logo" />

        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span> */}

      </NavbarBrand>

      {/* <div className="flex md:order-2">
        <Button>Sign In</Button>
        <NavbarToggle />
      </div> */}

      <div className="flex md:order-2">
        <div className="mr-3">
          <Button className="joobify-black-color main-btn">
            <Link className="main-font" href="/signin">Sign in</Link>
          </Button>
        </div>
        <div className="mr-3">
          <Button className="joobify-main-color main-btn ">
            <Link className="main-font" href="/signup">Sign up</Link>
          </Button>
        </div>

        {/* <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar className="mr-5" alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Billy Franscois</span>
            <span className="block truncate text-sm font-medium">billyfrcs@gmail.com</span>
          </DropdownHeader>
          <DropdownItem>
            <Link href="/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown> */}

        <NavbarToggle />
      </div>

      <NavbarCollapse>
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
    <Navbar fluid rounded className=''>
      <NavbarBrand href="">
        <Image className="mr-3 ml-0 h-6 sm:h-10" src="/images/JoobifyLogo.svg" width={200} height={200} alt="Joobify Logo" />
      </NavbarBrand>
    </Navbar>
  );
};

export { Navigation, SimpleNavigation };