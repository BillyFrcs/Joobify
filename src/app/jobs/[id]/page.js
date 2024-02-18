'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/home/footer';

import { axiosInstance } from "@/utils/axios";
import { MinimalNavigation } from '@/components/layouts/navbar';

const getJobDetail = async ({ id }) => {
    const response = await axiosInstance.get(`/jobs/jobDetail/${id}`);

    return response.data;

    /*
    const res = await fetch(`${joobifyEndpoint}/jobs/jobDetail/${id}`);

    return res.json();
    */
};

const JobDetail = ({ params }) => {
    const [job, setJob] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const { id } = params;

        getJobDetail({ id }).then((data) => {
            setJob(data);
        });
    }, [params]);

    if (!job)
        return (
            <div>
                <p className='text-center mt-10 mb-10'>Memuat data lowongan pekerjaan, harap tunggu...</p>
            </div>
        );

    // console.log(job);

    return (
        <div>
            <MinimalNavigation linkName="/dashboard" navName="Dashboard" />

            <main className='container flex flex-col md:order-2 ml-9 pl-5 pt-20'>
                <div className='bg-[#5B71C8] justify-start min-w-max rounded-job-detail rounded-sm h-[5rem] flex'>
                    <h1 className='font-bold main-font text-white text-3xl ml-5 mt-5'>{job.data.title}</h1>

                    <a href={`mailto:${job.data.email}`}>
                        <h2 className='font-medium main-font text-white text-1xl ml-5 mt-7'>{job.data.email}</h2>
                    </a>

                    <h2 className='font-medium main-font text-white text-1xl ml-5 mt-7'>
                        <FaBuilding className='inline-block' /> {job.data.companyName}
                    </h2>
                    <h2 className='font-medium main-font text-white text-1xl ml-5 mt-7'>
                        <FaLocationDot className='inline-block' /> {job.data.location}
                    </h2>
                    <h2 className='font-bold main-font black-color bg-white rounded-md shadow-md border-[3px] border-[#373737] w-auto h-9 text-2xl ml-5 mt-5'>{job.data.jobType}</h2>
                </div>

                <div className='mt-10'>
                    <Image className='company-profile-image rounded-lg' src={job.data.companyProfileImage} alt={job.data.companyName} width={0} height={0} priority={true} />

                    <div className='mt-10'>
                        <h2 className='font-medium main-font black-color text-2xl'>Deskripsi Pekerjaan :</h2>

                        <p className='mt-5 main-font black-color'>{job.data.jobDescription}</p>
                    </div>

                    <p className="font-medium text-gray-700 dark:text-gray-400 text-1xl mt-10 whitespace-normal text-end">Dibuat pada {job.data.postedOn}</p>

                    <div className='flex justify-start gap-4 mb-20'>
                        <a href={`mailto:${job.data.email}`}>
                            <Button type='submit' className='flex btn-style w-[10rem] h-auto light-font joobify-main-color'>Hubungi kami</Button>
                        </a>

                        <Link href="/">
                            <Button type='submit' className='btn-style w-[10rem] h-auto light-font' color="failure">Kembali</Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default JobDetail;