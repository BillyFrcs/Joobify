'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Card, FileInput, Label, Textarea, Select, Tabs } from 'flowbite-react';
import { FaLocationDot } from "react-icons/fa6";
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard, MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from "react-icons/ri";

import Link from 'next/link';
import Image from 'next/image';

import { MinimalNavigation } from '@/components/layouts/navbar';

import firebaseApp from '@/config/firebaseApp';

const Profile = () => {
    const auth = getAuth(firebaseApp);
    const router = useRouter();

    const [user, setUser] = useState(null);

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

    const signOutUser = async () => {
        try {
            await signOut(auth);

            router.push('/');
        } catch (error) {
            console.error('Error signing out with Google: ', error.message);
        }
    };

    return (
        <div>
            <MinimalNavigation linkName="/dashboard" navName="Dashboard" />

            <main className='flex flex-col md:order-2 ml-auto pl-auto pt-auto mt-20 h-auto'>
                <div className='container'>
                    <Tabs aria-label="Tabs with underline" style="pills" className='w-full flex justify-center items-center'>
                        <Tabs.Item active title="Profile" icon={HiUserCircle}>
                            <form method='' className='mt-5'>
                                <div className="flex w-full justify-end items-end">
                                    <div className='mb-[23rem] mr-[3rem] ml-[3rem]'>
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

                                    <div className="max-w-md justify-end items-end ml-10 mb-[20.5rem]">
                                        <div className="mb-2">
                                            <Label htmlFor="user-phone-number" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Nomor Telepon</Label>
                                            <input type="number" id="user-phone-number" name="user-phone-number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nomor telepon" required={true} />
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
                            </form>
                        </Tabs.Item>

                        <Tabs.Item title="Email" icon={MdEmail}>
                            <form method='' className='mt-5'>
                                <div className="flex flex-col w-full justify-center items-center">
                                    <div className="max-w-md justify-center items-center ml-10 mb-[15.5rem]">
                                        <h1 className="font-bold main-font text-[#373737] text-3xl">Change Email</h1>

                                        <p className="font-light main-font mt-5 mb-5 text-[#5B71C8] text-0.5xl text-center">Email anda saat ini adalah <span className='font-bold'>billymobile19@gmail.com</span></p>

                                        <div className="mb-5">
                                            <Label htmlFor="user-new-email" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">New Email</Label>
                                            <input type="email" id="user-new-email" name="user-new-email" disabled={false} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email baru" required={true} />
                                        </div>

                                        <div className="mb-5">
                                            <Label htmlFor="user-password" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Password</Label>
                                            <input type="password" id="user-password" name="user-password" disabled={false} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required={true} />
                                        </div>

                                        <div className='flex mt-8 gap-4'>
                                            <Button type='submit' className='btn-style main-font light-font joobify-main-color'>Update</Button>

                                            <Link href="/profile" className='btn-style w-auto h-auto light-font px-4 py-2 bg-[red] hover:bg-[#373737] rounded-lg text-white hover:text-white shadow-md'>Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Tabs.Item>

                        <Tabs.Item title="Password" icon={RiLockPasswordFill}>
                            <form method='' className='mt-5'>
                                <div className="flex flex-col w-full justify-center items-center">
                                    <div className="max-w-md justify-center items-center ml-10 mb-[15.5rem]">
                                        <h1 className="font-bold main-font text-[#373737] text-3xl">Change Password</h1>

                                        <div className='mt-5'>
                                            <div className="mb-5">
                                                <Label htmlFor="user-current-password" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Current Password</Label>
                                                <input type="password" id="user-current-password" name="user-current-password" disabled={false} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password saat ini" required={true} />
                                            </div>

                                            <div className="mb-5">
                                                <Label htmlFor="user-new-password" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">New Password</Label>
                                                <input type="password" id="user-new-password" name="user-new-password" disabled={false} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password baru" required={true} />
                                            </div>

                                            <div className="mb-5">
                                                <Label htmlFor="user-retype-password" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Retype New Password</Label>
                                                <input type="password" id="user-retype-password" name="user-retype-password" disabled={false} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ulangi password baru" required={true} />
                                            </div>
                                        </div>

                                        <div className='flex mt-8 gap-4'>
                                            <Button type='submit' className='btn-style main-font light-font joobify-main-color'>Update</Button>

                                            <Link href="/profile" className='btn-style w-auto h-auto light-font px-4 py-2 bg-[red] hover:bg-[#373737] rounded-lg text-white hover:text-white shadow-md'>Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Tabs.Item>
                    </Tabs>

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
                </div>
            </main>
        </div>
    );
};

export default Profile;