'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button, FloatingLabel } from 'flowbite-react';
import { FaLinkedin, FaInstagramSquare, FaFacebook, FaRegCopyright } from "react-icons/fa";

const Footer = () => {
    return (
        <main className='flex flex-col md:order-2 ml-9 pl-5 pt-5 h-[25rem]' id='contact'>
            <Image className="logo" src="/images/JoobifyLogo.svg" width={0} height={0} priority={true} alt="Joobify Logo" />

            <div className='grid grid-cols-none'>
                <p className='light-font mt-3'>Joobify Corp</p>
                <p className='light-font mt-1'>Jl Pattimura No. 25</p>
                <p className='light-font mt-1'>Batu Meja</p>
                <p className='light-font mt-1'>Kecamatan Sirimau</p>
                <p className='light-font mt-1'>Ambon, Maluku 97129</p>
                <p className='light-font mt-1'>Indonesia</p>

                <div className="flex justify-start mt-3 ml-[-0.5rem]">
                    <a href="" target="_blank" className="mx-2">
                        <div aria-label="Github" role="img">
                            <FaInstagramSquare className='w-6 h-auto' />
                        </div>
                    </a>
                    <a href="" target="_blank" className="mx-2">
                        <div aria-label="Instagram" role="img">
                            <FaLinkedin className='w-6 h-auto' />
                        </div>
                    </a>
                    <a href="" target="_blank" className="mx-2">
                        <div aria-label="Instagram" role="img">
                            <FaFacebook className='w-6 h-auto' />
                        </div>
                    </a>
                </div>

                <div className='mt-[-13rem] ml-[25rem]'>
                    <Link href=''>
                        <p className='light-font mt-1'>FAQ</p>
                    </Link>
                    <Link href=''>
                        <p className='light-font mt-1'>Privacy Policy</p>
                    </Link>
                    <Link href=''>
                        <p className='light-font mt-1'>Terms of Service</p>
                    </Link>
                </div>

                <form method='POST'>
                    <div className='mt-[-13rem] ml-[50rem]'>
                        <h5 className="font-medium mt-1 black-color text-2xl">Contact us</h5>

                        <FloatingLabel className='w-[28rem]' variant="standard" label="Name" required />
                        <FloatingLabel className='w-[28rem]' variant="standard" label="Email" required />
                        <FloatingLabel className='w-[28rem]' variant="standard" label="Description" required />

                        <Button type='submit' className='mt-8 btn-style main-font light-font joobify-main-color'>Submit</Button>
                    </div>
                </form>
            </div>

            <div>
                <div className='w-[78rem] h-[1px] bg-[#373737] mt-5'></div>

                <div className='flex flex-col align-center justify-center'>
                    <FaRegCopyright className='text-[#373737] w-5 h-auto mt-3' />

                    <p className='light-font text-[#373737] font-light text-sm mt-[-1.3rem] ml-[2rem]'>
                        {new Date().getFullYear()} Joobify Corp. All rights reserved.  The content, design, and trademarks on this site are the exclusive property of Joobify Corp. Reproduction, <br />
                        distribution, or unauthorized use of any material herein is strictly prohibited. Joobify and the Joobify logo are registered trademarks. By accessing <br />
                        this site, you agree to comply with all applicable laws and regulations.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Footer;