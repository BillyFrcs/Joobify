'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { Button, Card } from 'flowbite-react';
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import axiosInstance from '@/utils/axios';

const JobsList = () => {
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        axiosInstance.get('/jobs/allJobs').then((response) => {
            setJobs(response.data);
        });
    }, []);

    if (!jobs)
        return <p className='text-center mt-10 mb-10'>Memuat daftar lowongan pekerjaan, mohon tunggu...</p>;

    /*
    jobs.data.map((job, id) => {
        console.log(job.id);
    });
    */

    // console.log(jobs.data);

    return (
        <main className='flex flex-col md:order-2 ml-9 pl-5 pt-10 h-auto' id='jobs'>
            <div className='flex flex-col items-center justify-center'>
                <div className='mt-20'>
                    <h6 className="black-color ml-24 text-1xl">Lihat daftar pekerjaan hari ini</h6>
                    <h2 className="font-bold mt-1 black-color text-2xl">CARI PEKERJAAN YANG TERSEDIA</h2>
                </div>

                <form method='' className='mt-5'>
                    <div className="flex items-center justify-center">
                        {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div> */}

                        <input type="search" id="job-search" className="w-auto search-input block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pekerjaan apa yang ingin anda cari ?" required />

                        <Button type='submit' className="joobify-black-color main-btn h-auto w-[8rem] ml-[-8.5rem] bottom-[0rem] focus:ring-4 focus:outline-none rounded-lg font-medium text-sm">Cari</Button>

                        {/* <Button type='submit' className="joobify-black-color main-btn absolute end-2.5 bottom-1.5 focus:ring-4 focus:outline-none rounded-lg font-medium text-sm">Search</Button> */}
                    </div>

                    <div className='container mt-[5rem] mb-10 grid grid-cols-2 gap-4 justify-center items-center'>
                        {jobs.data.map((job, id) => (
                            <Link key={id} href={{ pathname: `/jobs/${job.id}` }}>
                                <Card className="w-full h-auto object-cover max-w-full rounded-lg shadow-md relative overflow-hidden" imgSrc={job.companyProfileImage} horizontal="true">
                                    <h5 className="text-2xl main-color font-bold tracking-tight text-gray-900 dark:text-white">{job.title}</h5>

                                    <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaBuilding className='inline-block' /> {job.companyName} <span className='text-md main-color font-bold'>({job.jobType})</span></p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaLocationDot className='inline-block' /> {job.location}</p>
                                    <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Dibuat pada {job.postedOn}</p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </form>
            </div>
        </main >
    );
}

export default JobsList;