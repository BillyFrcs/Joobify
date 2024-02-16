'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Card, FileInput, Label, Textarea, Select } from 'flowbite-react';
import { FaBuilding, FaRegTrashAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";

import Image from 'next/image';
import Link from 'next/link';

import { axiosInstance } from "@/utils/axios";
import { MinimalNavigation } from '@/components/layouts/navbar';
import { firebaseApp } from '@/config/firebaseApp';

const JobPosedDetail = () => {
    const auth = getAuth(firebaseApp);
    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axiosInstance.get('/users/userProfile').then((response) => {
                setUser(response.data.data);

                console.log(response.data.data);
            }).catch((error) => {
                router.push('/')

                // console.error('Error fetching protected data: ', error);
            });
        } catch (error) {
            console.error(error);
        }
    }, [router]);

    /*
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
    */

    return (
        <div>
            <div>
                <MinimalNavigation linkName="/dashboard" navName="Dashboard" />

                <div className='bg-[#263238] dashboard-container w-full h-auto'>
                    <main className='flex flex-col container md:order-2 ml-9 pl-5 pt-20' id='about'>
                        <div className='mt-20 mb-20'>
                            <h1 className="font-bold mt-1 text-white text-4xl">Halo, <span className="main-color">{user?.name}.</span></h1>
                            <h1 className="font-bold mt-1 text-white text-4xl">Silahkan update lowongan pekerjaan</h1>
                            <h1 className="font-bold mt-1 text-white text-4xl">Jika ada yang ingin diubah</h1>
                        </div>
                    </main>
                </div>

                {/* <div className='flex justify-center items-center mt-[-3.5rem]'>
                    <Link href="/dashboard" className='mt-8 btn-style text-white main-font px-4 py-2 border-4 border-[#263238] bg-[red] hover:bg-[#373737] hover:text-white shadow-md rounded-lg'>Kembali</Link>
                </div> */}
            </div>

            <main className='flex flex-col md:order-2 ml-auto pl-auto pt-auto h-auto'>
                <div className='flex flex-col items-center justify-between'>
                    <form method='PUT'>
                        <div className="flex w-full items-center justify-center">
                            <Label
                                htmlFor="company-profile-image"
                                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Logo perusahaan</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                                </div>

                                <FileInput id="company-profile-image" name="company-profile-image" className="hidden" />
                            </Label>

                            <div className='ml-10 flex flex-col items-center justify-center'>
                                <div className="mb-4">
                                    <Label htmlFor="job-title" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Nama Pekerjaan</Label>
                                    <input type="text" id="job-title" name="job-title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama pekerjaan" required={true} />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="company-name" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Nama Perusahaan</Label>
                                    <input type="text" id="company-name" name="company-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama perusahaan" required={true} />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="job-location" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Lokasi Perusahaan</Label>
                                    <input type="text" id="job-location" name="job-location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lokasi" required={true} />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="company-email" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Email Perusahaan</Label>
                                    <input type="email" id="company-email" name="company-email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required={true} />
                                </div>
                            </div>

                            <div className="max-w-md justify-end items-end ml-20 mt-[4rem]">
                                <div className=''>
                                    <div className="mb-2 block">
                                        <Label htmlFor="job-type" className='black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font' value="Tipe Pekerjaan" />
                                    </div>
                                    <Select className='' id="job-type" name="job-type" required>
                                        <option>Full-Time</option>
                                        <option>Part-Time</option>
                                        <option>Contract</option>
                                        <option>Temporary</option>
                                        <option>Internship</option>
                                    </Select>
                                </div>

                                <div className='mt-5'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="job-description" className='black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font' value="Deskripsi Pekerjaan" />
                                    </div>
                                    <Textarea id="job-description" placeholder="Deskripsi pekerjaan" required rows={10} cols={50} />
                                </div>

                                <div className='flex mt-5 gap-4'>
                                    <Button type='submit' className='btn-style main-font light-font joobify-main-color'>Post</Button>

                                    <Link href="/dashboard" className='btn-style w-auto h-auto light-font px-4 py-2 bg-[red] hover:bg-[#373737] rounded-lg text-white hover:text-white shadow-md'>Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className='container mt-[5rem] mb-10 grid grid-cols-2 gap-4 justify-between'>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobPosedDetail;