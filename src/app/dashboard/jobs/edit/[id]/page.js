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
import { axiosInstanceMultipart } from '@/utils/axios';

const getJobDetail = async ({ id }) => {
    try {
        const token = localStorage.getItem('token');

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axiosInstance.get(`/jobs/displayJobDetail/${id}`);

        return response.data;
    } catch (error) {
        // console.error(error);

        return;
    }

    /*
    const res = await fetch(`${joobifyEndpoint}/jobs/jobDetail/${id}`);

    return res.json();
    */
};

const UpdateJob = ({ params }) => {
    const auth = getAuth(firebaseApp);
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [job, setJob] = useState(null);
    const [jobID, setJobID] = useState(null);
    const [companyProfileImage, setCompanyProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

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
            // console.error(error);
        }
    }, [router]);

    useEffect(() => {
        const { id } = params;

        getJobDetail({ id }).then((response) => {
            setJobID(id);
            setJob(response.data);

            // console.log(response.data);
        });
    }, [params]);

    const handleChange = (event) => {
        setJob({ ...job, [event.target.name]: event.target.value });
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        setCompanyProfileImage(selectedImage);

        // Preview the selected image
        const reader = new FileReader();

        reader.onload = () => {
            setPreviewUrl(reader.result);
        };

        reader.readAsDataURL(selectedImage);
    };

    // Callback function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            formData.append('companyProfileImage', companyProfileImage);
            formData.append('title', job?.title);
            formData.append('companyName', job?.companyName);
            formData.append('location', job?.location);
            formData.append('email', job?.email);
            formData.append('jobType', job?.jobType);
            formData.append('jobDescription', job?.jobDescription);

            const contents = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            // Handle form submission logic, such as sending data to the server
            await axiosInstanceMultipart.put(`/jobs/updateUserJob/${jobID}`, formData, { 'headers': contents }).then((response) => {
                // console.log('Updated job data: ', response.data.data);

                router.push('/dashboard');
            }).catch((error) => {
                setError(error.response.data.message);

                setIsVisible(true);

                // Set the timeout
                setTimeout(() => {
                    setIsVisible(false);
                }, 5000);

                // console.error(error.response.data.message);

                // console.error('Error updating user data: ', error);
            });
        } catch (error) {
            // console.log(error);
        }

        // console.log('Updated job data: ', user);
    };

    if (!job)
        return (
            <div>
                <p className='text-center black-color mt-10 mb-10'>Memuat data pekerjaan, harap tunggu...</p>
            </div>
        );

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
        <>
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
                    <form method='PUT' onSubmit={handleSubmit}>
                        <div className="flex w-full items-center justify-center">
                            <Label
                                htmlFor="companyProfileImage"
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

                                <FileInput id="companyProfileImage" name="companyProfileImage" onChange={handleImageChange} itemType='image' accept='image/*' className="hidden" />
                            </Label>

                            <div className='flex flex-col justify-start items-start ml-5'>
                                <Image className="z-0 shadow-lg new-company-profile-image-update" alt={job?.companyName} src={previewUrl || job?.companyProfileImage} height={0} width={0} />
                            </div>

                            <div className='ml-10 flex flex-col items-center justify-center'>
                                <div className="mb-4">
                                    <Label htmlFor="title" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Nama Pekerjaan</Label>
                                    <input type="text" id="title" name="title" value={job?.title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama pekerjaan" required={true} />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="companyName" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Nama Perusahaan</Label>
                                    <input type="text" id="companyName" name="companyName" value={job?.companyName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama perusahaan" required={true} />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="location" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Lokasi Perusahaan</Label>
                                    <input type="text" id="location" name="location" value={job?.location} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lokasi" required={true} />
                                </div>

                                <div className="mb-4">
                                    <Label htmlFor="email" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Email Perusahaan</Label>
                                    <input type="email" id="email" name="email" value={job?.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required={true} />
                                </div>
                            </div>

                            <div className="max-w-md justify-end items-end ml-20 mt-[4rem]">
                                <div className=''>
                                    <div className="mb-2 block">
                                        <Label htmlFor="job-type" className='black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font' value="Tipe Pekerjaan" />
                                    </div>

                                    <Select className='' id="jobType" name="jobType" value={job?.jobType} onChange={handleChange} required>
                                        <option>Full-Time</option>
                                        <option>Part-Time</option>
                                        <option>Contract</option>
                                        <option>Temporary</option>
                                        <option>Internship</option>
                                    </Select>
                                </div>

                                <div className='mt-5'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="jobDescription" className='black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font' value="Deskripsi Pekerjaan" />
                                    </div>

                                    <Textarea id="jobDescription" name="jobDescription" value={job?.jobDescription} onChange={handleChange} placeholder="Deskripsi pekerjaan" required rows={10} cols={50} />
                                </div>

                                <div className='mt-6'>
                                    {isVisible && <span className='text-sm text-red-500'>{error}</span>}
                                </div>

                                <div className='flex mt-5 gap-4'>
                                    <Button type='submit' className='btn-style main-font light-font joobify-main-color'>Update</Button>

                                    <Link href="/dashboard" className='btn-style w-auto h-auto light-font px-4 py-2 bg-[red] hover:bg-[#373737] rounded-lg text-white hover:text-white shadow-md'>Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className='container mt-[5rem] mb-10 grid grid-cols-2 gap-4 justify-between'>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UpdateJob;