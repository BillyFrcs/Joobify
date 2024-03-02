'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Card, FileInput, Label, Textarea, Select, Tabs } from 'flowbite-react';
import { FaLocationDot } from "react-icons/fa6";
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard, MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from "react-icons/ri";

import axios from "axios";
import Link from 'next/link';
import Image from 'next/image';
import ChangeEmailForm from '@/components/account/userEmail';
import ChangePasswordForm from '@/components/account/userPassword';

import { axiosInstance, axiosInstanceMultipart, axiosExternalInstance } from "@/utils/axios";
import { MinimalNavigation } from '@/components/layouts/navbar';
import { firebaseApp } from '@/config/firebaseApp';

function ConvertToPascalCase(inputString) {
    const words = inputString.toLowerCase().split(' ');
  
    const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
    const pascalCaseString = pascalCaseWords.join(' ');
  
    return pascalCaseString;
}
  
const UserProfileForm = ({ user, handleChange, handleSubmit, handleImageChange, previewUrl, isVisible, error }) => {
    const [location, setLocation] = useState([]);

    useEffect(() => {
        const apiKey = process.env.GOAPI_API_KEY;

        axiosExternalInstance.get(`/regional/provinsi?api_key=${apiKey}`)
            .then(response => {
                // Handle response data here
                setLocation(response.data.data);

                // console.log(response.data);
            })
            .catch(error => {
                // Handle errors here
                console.error('Error: ', error);
            });
    }, []);

    return (
        <>
            <form method='PUT' onSubmit={handleSubmit} className='mt-5'>
                <div className="flex w-full justify-end items-end">
                    <div className='mb-[23rem] mr-[3rem] ml-[3rem]'>
                        <div className='h-[30rem] w-[20rem] shadow-lg profile-container rounded-lg'> </div>

                        <div className='flex justify-center items-center mt-[-25rem]'>
                            <Image className="rounded-full z-0 shadow-lg border-4 border-[#5B71C8] user-profile-image" alt={user?.name} src={previewUrl || user?.userProfileImage} height={0} width={0} />
                        </div>

                        <div className='flex flex-col justify-center items-center mt-5'>
                            <h1 className="font-bold z-0 mt-1 black-color text-2xl">{user?.name}</h1>

                            <h2 className="font-bold z-0 mt-2 text-white text-1xl bg-[#5B71C8] rounded-lg px-2 py-1 h-auto w-auto shadow-sm">{user?.headline}</h2>

                            <p className="font-medium mt-2 black-color text-1xl"><FaLocationDot className="inline" /> {user?.location}</p>
                        </div>
                    </div>

                    <div className='ml-10 mb-[10.4rem] flex flex-col justify-end items-end'>
                        <div className="mb-4">
                            <Label htmlFor="name" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Nama</Label>
                            <input type="text" id="name" name="name" value={user?.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama lengkap" required={true} />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="headline" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Headline</Label>
                            <input type="text" id="headline" name="headline" value={user?.headline} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Headline" required={true} />
                        </div>

                        {/* <div className="mb-4">
                            <Label htmlFor="location" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Lokasi Domisili</Label>
                            <input type="text" id="location" name="location" value={user?.location} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lokasi domisili" required={true} />
                        </div> */}

                        <div className='mb-4'>
                            <Label htmlFor="location" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Lokasi</Label>
                            <Select className='' id="location" name="location" onChange={handleChange} required>
                                <option>Pilih lokasi anda</option>

                                {location?.map((loc, index) => (
                                    <option key={index} value={ConvertToPascalCase(loc?.name)}>{ConvertToPascalCase(loc?.name)}</option>
                                ))}
                            </Select>
                        </div>

                        <Label htmlFor="userProfileImage" className="dark:hover:bg-bray-800 mb-10 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Foto anda</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                            </div>

                            <FileInput onChange={handleImageChange} itemType='image' id="userProfileImage" name="userProfileImage" accept='image/*' className="hidden" />
                        </Label>
                    </div>

                    <div className="max-w-md justify-end items-end ml-10 mb-[19.3rem]">
                        <div className="mb-2">
                            <Label htmlFor="phoneNumber" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Nomor Telepon</Label>
                            <input type="text" id="phoneNumber" name="phoneNumber" value={user?.phoneNumber} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nomor telepon" required={true} />
                        </div>

                        <div className='mt-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="about" className='black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font' value="About" />
                            </div>
                            <Textarea id="about" name="about" placeholder="About you" value={user?.about} onChange={handleChange} required={true} rows={10} cols={50} />
                        </div>

                        <div className='mt-6'>
                            {isVisible && <span className='text-sm text-red-500'>{error}</span>}
                        </div>

                        <div className='flex mt-10 gap-4'>
                            <Button type='submit' className='btn-style main-font light-font joobify-main-color'>Update</Button>

                            <Link href="/profile" className='btn-style w-auto h-auto light-font px-4 py-2 bg-[red] hover:bg-[#373737] rounded-lg text-white hover:text-white shadow-md'>Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>

            {/* <form method='POST'>
<div className="flex w-full justify-end items-end">
    <div className='mb-[23rem] mr-[3rem]'>
        <div className='h-[30rem] w-[20rem] shadow-lg profile-container rounded-lg'> </div>

        <div className='flex justify-center items-center mt-[-25rem]'>
            <Image className="rounded-full z-0 shadow-lg border-2 border-[#5B71C8] user-profile-image" alt="" src="/images/team/Billy.svg" height={0} width={0} />
        </div>

        <div className='flex flex-col justify-center items-center mt-5'>
            <h1 className="font-bold z-0 mt-1 black-color text-2xl">Billy Franscois Kolibonso</h1>

            <h2 className="font-bold z-0 mt-2 text-white text-1xl bg-[#5B71C8] rounded-lg px-2 py-1 h-auto w-auto shadow-sm">Software Developer</h2>

            <p className="font-medium mt-2 black-color text-1xl"><FaLocationDot className="inline" /> Ambon, Maluku</p>
        </div>
    </div>

    <div className='ml-10 mb-[10.4rem] flex flex-col justify-end items-end'>
        <div className="mb-4">
            <Label htmlFor="user-name" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Nama</Label>
            <input type="text" id="user-name" name="user-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama lengkap" required={true} />
        </div>

        <div className="mb-4">
            <Label htmlFor="headline" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Headline</Label>
            <input type="text" id="headline" name="headline" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Headline" required={true} />
        </div>

        <div className="mb-4">
            <Label htmlFor="user-location" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Lokasi Domisili</Label>
            <input type="text" id="user-location" name="user-location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lokasi domisili" required={true} />
        </div>

        <Label htmlFor="user-profile-image" className="dark:hover:bg-bray-800 mb-10 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Foto anda</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
            </div>

            <FileInput id="user-profile-image" name="user-profile-image" className="hidden" />
        </Label>
    </div>

    <div className="max-w-md justify-end items-end ml-10 mb-[15.5rem]">
        <div className="mb-2">
            <Label htmlFor="user-phone-number" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Nomor Telepon</Label>
            <input type="number" id="user-phone-number" name="user-phone-number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nomor telepon" required={true} />
        </div>

        <div className="mb-2">
            <Label htmlFor="user-email" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Email</Label>
            <input type="email" id="user-email" name="user-email" disabled={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required={true} />
        </div>

        <div className='mt-4'>
            <div className="mb-2 block">
                <Label htmlFor="user-about" className='black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font' value="About" />
            </div>
            <Textarea id="user-about" name="user-about" placeholder="About you" required rows={10} cols={50} />
        </div>

        <div className='flex mt-5 gap-4'>
            <Button type='submit' className='btn-style main-font light-font joobify-main-color'>Update</Button>

            <Link href="/profile" className='btn-style w-auto h-auto light-font px-4 py-2 bg-[red] hover:bg-[#373737] rounded-lg text-white hover:text-white shadow-md'>Cancel</Link>
        </div>
    </div>
</div>
</form> */}
        </>
    );
};

export default UserProfileForm;