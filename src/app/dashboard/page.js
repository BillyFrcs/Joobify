'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Card } from 'flowbite-react';
import { FaBuilding, FaRegTrashAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";
import { useAuthState } from 'react-firebase-hooks/auth';

import Image from 'next/image';
import Link from 'next/link';
import DeleteJob from '@/components/jobs/deleteJob';

import { axiosInstance } from "@/utils/axios";
import { MinimalNavigation } from '@/components/layouts/navbar';
import { firebaseApp } from '@/config/firebaseApp';

const Dashboard = () => {
    const auth = getAuth(firebaseApp);
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [jobID, setJobID] = useState(null);
    const [jobs, setJobs] = useState(null);
    const [activateTotalJob, setActivateTotalJob] = useState(false);
    const [error, setError] = useState('');
    const [randomMessages, setRandomMessages] = useState('');

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axiosInstance.get('/users/userProfile').then((response) => {
                setUser(response.data.data);

                // console.log(response.data.data);
            }).catch((error) => {
                router.push('/')

                // console.error('Error fetching protected data: ', error);
            });
        } catch (error) {
            console.error(error);
        }
    }, [router]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axiosInstance.get('/jobs/displayUserJobs').then((response) => {
            setJobs(response.data.data);
            setActivateTotalJob(true);

            if (jobs.length == 0) {
                setError("Anda belum posting lowongan pekerjaan, posting dulu ga sih?");

                setActivateTotalJob(false);
            } else {
                setError("");

                setActivateTotalJob(true);
            }

            // console.log(response.data.data);
        }).catch((error) => {
            // setError("Anda belum posting lowongan pekerjaan, posting dulu ga sih?");

            // setActivateTotalJob(false);

            // router.push('/')

            // console.error('Error fetching jobs data: ', error.response.data.message);
        });
    });

    useEffect(() => {
        const getRandomMessages = () => {
            const messages = [
                "Semoga harimu menyenangkan.",
                "Jangan lupa untuk berdoa.",
                "Selalu semangat menjalani hidup.",
                "Jadilah dirimu sendiri.",
                "Bersikaplah baik, tetapi tidak lemah.",
                "Selalu tersenyum dan bersyukur.",
                "Pikiran adalah segalanya.",
                "Hidup dimulai di ujung zona nyamanmu.",
                "Jangan pernah menyerah.",
                "Kenyamanan adalah pencapaian."
            ]

            const randomIndex = Math.floor(Math.random() * messages.length);

            const randomMessage = messages[randomIndex];

            setRandomMessages(randomMessage);
        };

        getRandomMessages();
    }, []);

    if (!jobs)
        return <p className='text-center mt-10 mb-10'>Memuat dashboard anda, tunggu sebentar yaa</p>;

    /*
    useEffect(() => {
        const auth = getAuth(firebaseApp);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // router.push('/signin');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);
    */

    return (
        <div>
            <div>
                <MinimalNavigation linkName="" navName="Dashboard" />

                <div className='bg-[#263238] dashboard-container w-full h-auto'>
                    <main className='flex flex-col container md:order-2 ml-9 pl-5 pt-20' id='about'>
                        <div className='mt-20 mb-20'>
                            <h1 className="font-bold mt-1 text-white text-4xl">Halo, <span className="main-color">{user?.name}.</span></h1>
                            <h1 className="font-bold mt-1 text-white text-4xl">Selamat Datang</h1>
                            <h1 className="font-bold mt-1 text-white text-4xl">Di Dashboard</h1>

                            <p className="font-medium mt-5 text-white text-2xl">{randomMessages}</p>
                        </div>
                    </main>
                </div>

                <div className='flex justify-center items-center mt-[-3.5rem]'>
                    <Link href="/dashboard/postjob" className='mt-8 btn-style text-white main-font px-4 py-2 border-4 border-[#263238] joobify-main-color shadow-md rounded-lg'>POSTING PEKERJAAN</Link>
                </div>
            </div>

            {activateTotalJob != false ? (
                <div className='flex justify-center items-center mt-10'>
                    <h1 className='black-color text-1xl font-medium '>Anda memiliki {jobs?.length} lowongan pekerjaan yang telah di posting</h1>
                </div>
            ) : <></>}

            <p className='text-md font-medium black-color text-center flex justify-center items-center mt-10'>{error}</p>

            <main className='flex flex-col md:order-2 justify-center items-center pt-auto h-auto'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='container mt-0 mb-10 grid grid-cols-2 gap-4 justify-center items-center'>
                        {jobs ? jobs.map((job, id) => (
                            <>
                                <div key={id}>
                                    <Card className="w-full h-auto object-cover max-w-full rounded-lg shadow-md relative overflow-hidden" imgSrc={job?.companyProfileImage} horizontal="true">
                                        <h5 className="text-2xl main-color font-bold tracking-tight text-gray-900 dark:text-white">{job?.title}</h5>

                                        <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaBuilding className='inline-block' /> {job?.companyName} <span className='text-md main-color font-bold'>({job?.jobType})</span></p>
                                        <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaLocationDot className='inline-block' /> {job?.location}</p>

                                        <div className='flex justify-start gap-4'>
                                            <Link href={{ pathname: `/dashboard/jobs/edit/${job?.id}` }} className='joobify-main-color text-white px-4 py-2 shadow-md rounded-lg'><TiEdit className='text-[1rem] inline-block' /></Link>

                                            <DeleteJob jobID={job?.id} />
                                        </div>

                                        <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Dibuat pada {job?.postedOn}</p>
                                        <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Diubah pada {job?.updatedOn}</p>
                                    </Card>
                                </div>

                                {/*
                            <Link key={id} href={{ pathname: `/jobs/${job?.id}` }}>
                                <Card className="w-full h-auto object-cover max-w-full rounded-lg shadow-md relative overflow-hidden" imgSrc={job?.companyProfileImage} horizontal="true">
                                    <h5 className="text-2xl main-color font-bold tracking-tight text-gray-900 dark:text-white">{job?.title}</h5>

                                    <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaBuilding className='inline-block' /> {job?.companyName} <span className='text-md main-color font-bold'>({job?.jobType})</span></p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaLocationDot className='inline-block' /> {job?.location}</p>

                                    <div className='flex justify-start gap-4'>
                                        <Link href={{ pathname: `/dashboard/jobs/edit/${job?.id}` }} className='joobify-main-color text-white px-4 py-2 shadow-md rounded-lg'><TiEdit className='text-[1rem] inline-block' /></Link>
                                        
                                        <DeleteJob jobID={job?.id} />
                                    </div>

                                    <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Dibuat pada {job?.postedOn}</p>
                                    <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Diubah pada {job?.updatedOn}</p>
                                </Card>
                        </Link>
                        */}
                            </>
                        )) : <p className='text-md black-color text-center flex justify-center items-center'>{error}</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;