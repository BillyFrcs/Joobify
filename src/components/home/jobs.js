'use client';

import Image from 'next/image';

import { Button } from 'flowbite-react';

const JobsLists = () => {
    return (
        <main className='flex flex-col md:order-2 ml-9 pl-5 pt-10 h-screen' id='jobs'>
            <div className='flex flex-col items-center justify-center'>
                <div className='mt-20'>
                    <h6 className="black-color ml-24 text-1xl">Lihat daftar pekerjaan hari ini</h6>
                    <h2 className="font-bold mt-1 black-color text-2xl">CARI PEKERJAAN YANG TERSEDIA</h2>
                </div>

                <form method='' className='mt-5'>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>

                        <input type="search" id="default-search" className="w-auto search-input block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari pekerjaan..." required />

                        <Button type='submit' className="joobify-black-color main-btn absolute end-2.5 bottom-1.5 focus:ring-4 focus:outline-none rounded-lg font-medium text-sm">Search</Button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default JobsLists;