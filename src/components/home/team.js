import Image from 'next/image';
import Link from 'next/link';

import { FaLinkedin, FaInstagram } from "react-icons/fa";

const TeamPage = () => {
    return (
        <main className='w-full h-80 bg-[#5B71C8] border border-gray-400'>
            <div className='flex flex-col md:order-2 ml-9 pl-5 pt-10 h-screen'>
                <div className='mt-[3rem]'>
                    <h1 className="font-bold mt-1 text-white text-4xl">Meet our</h1>
                    <h1 className="font-bold mt-1 text-white text-4xl">creative team</h1>
                    <h1 className="font-bold mt-1 text-white text-4xl">member</h1>
                </div>

                <div className="team-container">
                    <div className="w-full px-10 pt-11">
                        <div className="container mx-auto">
                            <div role="list" aria-label="Behind the scenes People" className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                                <div role="list-item" data-wow-duration="1s" data-wow-delay="0.5s" className="xl:w-1/3 sm:w-3/4 md:w-2/5 fadeIn wow relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                    <div className="rounded overflow-hidden">
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <Image src="/images/team/Billy.svg" alt="Billy Franscois" className="profile-team rounded-full object-cover h-full w-full shadow-md" width={0} height={0} priority={true} />
                                            </div>
                                        </div>

                                        <div className="px-6 mt-16">
                                            <h1 className="font-bold text-2xl text-white text-center mb-1">Billy Franscois</h1>
                                            <p className="text-white text-1xl text-center">Back-End Developer</p>

                                            <div className="w-full flex justify-center mt-2">
                                                <a href="https://www.instagram.com/billyfrcs" target="_blank" className="mx-3">
                                                    <div aria-label="Github" role="img">
                                                        <FaInstagram className='text-white' />
                                                    </div>
                                                </a>
                                                <a href="https://www.linkedin.com/in/billyfrcs" target="_blank" className="mx-3">
                                                    <div aria-label="Instagram" role="img">
                                                        <FaLinkedin className='text-white' />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div role="list-item" data-wow-duration="1s" data-wow-delay="0.5s" className="xl:w-1/3 sm:w-3/4 md:w-2/5 fadeIn wow relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                    <div className="rounded overflow-hidden">
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <Image src="/images/team/Ejer.svg" alt="Jerry Huwae" role="img" className="rounded-full object-cover h-full w-full shadow-md" width={0} height={0} priority={true} />
                                            </div>
                                        </div>
                                        <div className="px-6 mt-16">
                                            <h1 className="font-bold text-white text-2xl text-center mb-1">Jerry Huwae</h1>
                                            <p className="text-white text-1xl text-center">Front-End Developer</p>

                                            <div className="w-full flex justify-center mt-2">
                                                <a href="" target="_blank" className="mx-3">
                                                    <div aria-label="Github" role="img">
                                                        <FaInstagram className='text-white' />
                                                    </div>
                                                </a>
                                                <a href="" target="_blank" className="mx-3">
                                                    <div aria-label="Instagram" role="img">
                                                        <FaLinkedin className='text-white' />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div role="list-item" data-wow-duration="1s" data-wow-delay="0.5s" className="xl:w-1/3 sm:w-3/4 md:w-2/5 fadeIn wow relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                                    <div className="rounded overflow-hidden">
                                        <div className="absolute -mt-20 w-full flex justify-center">
                                            <div className="h-32 w-32">
                                                <Image src="/images/team/Kim.svg" alt="Freedom George" role="img" className="rounded-full object-cover h-full w-full shadow-md" width={0} height={0} priority={true} />
                                            </div>
                                        </div>

                                        <div className="px-6 mt-16">
                                            <h1 className="font-bold text-white text-2xl text-center mb-1">Freedom George</h1>
                                            <p className="text-white text-1xl text-center">UI/UX Designer</p>

                                            <div className="w-full flex justify-center mt-2">
                                                <a href="" target="_blank" className="mx-3">
                                                    <FaInstagram className='text-white' />
                                                </a>
                                                <a href="" target="_blank" className="mx-3">
                                                    <div aria-label="Instagram" role="img">
                                                        <FaLinkedin className='text-white' />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default TeamPage;