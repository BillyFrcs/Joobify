'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Card } from 'flowbite-react';
import { FaBuilding, FaRegTrashAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";

import Image from 'next/image';
import Link from 'next/link';

import { MinimalNavigation } from '@/components/layouts/navbar';

import firebaseApp from '@/config/firebaseApp';

const Dashboard = () => {
    const auth = getAuth(firebaseApp);
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [randomMessages, setRandomMessages] = useState('');

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

    useEffect(() => {
        const auth = getAuth(firebaseApp);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/signin');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    return (
        <div>
            <div>
                <MinimalNavigation linkName="" navName="Dashboard" />

                <div className='bg-[#263238] dashboard-container w-full h-auto'>
                    <main className='flex flex-col container md:order-2 ml-9 pl-5 pt-20' id='about'>
                        <div className='mt-20 mb-20'>
                            <h1 className="font-bold mt-1 text-white text-4xl">Halo, <span className="main-color">{user ? user.displayName : 'Guest'}.</span></h1>
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

            <main className='flex flex-col md:order-2 ml-auto pl-auto pt-auto h-auto'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='mt-0'>
                        <div className='container mt-[5rem] mb-10 grid grid-cols-2 gap-4 justify-center items-center'>
                            <Card className="w-full h-auto object-cover max-w-full rounded-lg shadow-md relative overflow-hidden" imgSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" horizontal="true">
                                <h5 className="text-2xl main-color font-bold tracking-tight text-gray-900 dark:text-white">TV Service</h5>

                                <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaBuilding className='inline-block' /> Samsung Service Center <span className='text-md main-color font-bold'>(Full-Time)</span></p>
                                <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaLocationDot className='inline-block' /> Ambon, Maluku</p>

                                <div className='flex justify-start gap-4'>
                                    <Link href="/dashboard/edit/id" className='joobify-main-color text-white px-4 py-2 shadow-md rounded-lg'><TiEdit className='text-[1rem] inline-block' /></Link>
                                    <Link href="" className='bg-red-600 text-white px-4 py-2 shadow-md rounded-lg'><FaRegTrashAlt className='text-[1rem] inline-block' /></Link>
                                </div>

                                <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Dibuat pada 24 Januari 2024</p>
                                <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Diubah pada 26 Januari 2024</p>
                            </Card>

                            <Card className="w-full h-auto object-cover max-w-full rounded-lg shadow-md relative overflow-hidden" imgSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" horizontal="true">
                                <h5 className="text-2xl main-color font-bold tracking-tight text-gray-900 dark:text-white">TV Service</h5>

                                <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaBuilding className='inline-block' /> Samsung Service Center <span className='text-md main-color font-bold'>(Full-Time)</span></p>
                                <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaLocationDot className='inline-block' /> Ambon, Maluku</p>

                                <div className='flex justify-start gap-4'>
                                    <Link href="/dashboard/edit/id" className='joobify-main-color text-white px-4 py-2 shadow-md rounded-lg'><TiEdit className='text-[1rem] inline-block' /></Link>
                                    <Link href="" className='bg-red-600 text-white px-4 py-2 shadow-md rounded-lg'><FaRegTrashAlt className='text-[1rem] inline-block' /></Link>
                                </div>

                                <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Dibuat pada 24 Januari 2024</p>
                                <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Diubah pada 26 Januari 2024</p>
                            </Card>

                            <Card className="w-full h-auto object-cover max-w-full rounded-lg shadow-md relative overflow-hidden" imgSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" horizontal="true">
                                <h5 className="text-2xl main-color font-bold tracking-tight text-gray-900 dark:text-white">TV Service</h5>

                                <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaBuilding className='inline-block' /> Samsung Service Center <span className='text-md main-color font-bold'>(Full-Time)</span></p>
                                <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaLocationDot className='inline-block' /> Ambon, Maluku</p>

                                <div className='flex justify-start gap-4'>
                                    <Link href="/dashboard/edit/id" className='joobify-main-color text-white px-4 py-2 shadow-md rounded-lg'><TiEdit className='text-[1rem] inline-block' /></Link>
                                    <Link href="" className='bg-red-600 text-white px-4 py-2 shadow-md rounded-lg'><FaRegTrashAlt className='text-[1rem] inline-block' /></Link>
                                </div>

                                <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Dibuat pada 24 Januari 2024</p>
                                <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Diubah pada 26 Januari 2024</p>
                            </Card>

                            <Card className="w-full h-auto object-cover max-w-full rounded-lg shadow-md relative overflow-hidden" imgSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" horizontal="true">
                                <h5 className="text-2xl main-color font-bold tracking-tight text-gray-900 dark:text-white">TV Service</h5>

                                <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaBuilding className='inline-block' /> Samsung Service Center <span className='text-md main-color font-bold'>(Full-Time)</span></p>
                                <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaLocationDot className='inline-block' /> Ambon, Maluku</p>

                                <div className='flex justify-start gap-4'>
                                    <Link href="/dashboard/edit/id" className='joobify-main-color text-white px-4 py-2 shadow-md rounded-lg'><TiEdit className='text-[1rem] inline-block' /></Link>
                                    <Link href="" className='bg-red-600 text-white px-4 py-2 shadow-md rounded-lg'><FaRegTrashAlt className='text-[1rem] inline-block' /></Link>
                                </div>

                                <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Dibuat pada 24 Januari 2024</p>
                                <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Diubah pada 26 Januari 2024</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;