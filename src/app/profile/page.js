'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Card, FileInput, Label, Textarea, Select } from 'flowbite-react';
import { LuPencil } from "react-icons/lu";

import Link from 'next/link';
import Image from 'next/image';

import { axiosInstance } from "@/utils/axios";
import { MinimalNavigation } from '@/components/layouts/navbar';
import { firebaseApp } from '@/config/firebaseApp';

const Profile = () => {
    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // console.log(user);

            axiosInstance.get(`/users/userProfile`).then((response) => {
                setUser(response.data.data);

                // console.log(response.data.data);
            }).catch((error) => {
                router.push('/')

                // console.error('Error fetching protected data: ', error);
            });
        } catch (error) {
            // console.error(error);
        }
    }, [user, router]);

    const signOut = async () => {
        try {
            axiosInstance.post('auth/logOut').then(() => {
                localStorage.removeItem('token');

                router.push('/');
            })
        } catch (error) {
            // console.error('Error signing out: ', error.message);
        }
    };

    /*
    if (!user)
        return <p className='text-center black-color mt-10 mb-10'>Memuat profile anda, tunggu sebentar yaa</p>;
    */
    
    return (
        <div className=''>
            <MinimalNavigation linkName="/dashboard" navName="Dashboard" />

            <div className='bg-[#373737] w-full dashboard-container h-auto'>
                <main className='flex flex-col container md:order-2 ml-9 pl-5 pt-10' id='about'>
                    <div className='mt-10 flex flex-col justify-center items-center'>
                        <div className='flex mb-5 flex-col justify-center items-center'>
                            <Image className="rounded-full z-0 shadow-lg border-4 border-[#5B71C8] user-profile-image" alt="" src={user?.userProfileImage || "/images/DefaultProfile.svg"} height={0} width={0} />
                        </div>

                        <h1 className="font-bold mt-1 text-white text-4xl">
                            {user?.name} <Link href="/profile/edit"><LuPencil className='text-white text-2xl inline-block' /></Link>
                        </h1>

                        <h1 className="font-medium mt-1 text-white text-2xl">{user?.headline}</h1>

                        <div className='mt-5 flex flex-col justify-center items-center overflow-hidden w-[40rem]'>
                            <h1 className="font-bold main-font mt-1 text-white text-3xl">About Me</h1>
                            <p className="font-medium main-font mt-1 text-white text-1xl text-center">
                                {user?.about}
                            </p>
                        </div>

                        <div className='mt-5 flex flex-col justify-center items-center'>
                            <h1 className="font-bold main-font mt-1 text-white text-3xl">Personal Info</h1>

                            <h1 className="font-bold mt-1 text-white text-2xl">Email</h1>
                            <p className="font-medium main-font mt-1 text-white text-1xl">{user?.email}</p>

                            <h1 className="font-bold mt-1 text-white text-2xl">Nomor Telepon</h1>
                            <p className="font-medium main-font mt-1 text-white text-1xl">{user?.phoneNumber}</p>

                            <h1 className="font-bold mt-1 text-white text-2xl">Domisili</h1>
                            <p className="font-medium main-font mt-1 text-white text-1xl">{user?.location}</p>
                        </div>
                    </div>

                    <div className='mb-5 flex gap-4 justify-end items-end'>
                        <Link href="/" className='btn-style w-auto h-auto light-font px-4 py-2 joobify-main-color hover:bg-[#373737] rounded-lg text-white hover:text-white shadow-md'>Kembali</Link>

                        <Button type='submit' onClick={signOut} className='btn-style w-auto h-auto light-font' color="failure">Sign out</Button>
                    </div>
                </main>
            </div>
        </div>
    );
};

/*
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
        <div className=''>
            <MinimalNavigation linkName="/dashboard" navName="Dashboard" />

            <div className='bg-[#373737] w-full dashboard-container h-auto'>
                <main className='flex flex-col container md:order-2 ml-9 pl-5 pt-10' id='about'>
                    <div className='mt-10 flex flex-col justify-center items-center'>
                        <div className='flex mb-5 flex-col justify-center items-center'>
                            <Image className="rounded-full z-0 shadow-lg border-4 border-[#5B71C8] user-profile-image" alt={user ? user.displayName : ''} src={user?.photoURL || '/images/DefaultProfile.svg'} height={0} width={0} />
                        </div>

                        <h1 className="font-bold mt-1 text-white text-4xl">
                            {user ? user.displayName : ''} <Link href="/profile/edit"><LuPencil className='text-white text-2xl inline-block' /></Link>
                        </h1>

                        <h1 className="font-medium mt-1 text-white text-2xl">Software Developer</h1>

                        <div className='mt-5 flex flex-col justify-center items-center overflow-hidden w-[40rem]'>
                            <h1 className="font-bold main-font mt-1 text-white text-3xl">About Me</h1>
                            <p className="font-medium main-font mt-1 text-white text-1xl text-center">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
                                Lorem Ipsum is simply dummy text of the printing standard dummy text ever since the 1500s, when an
                                unknown printer took a galley of type and scrambled it to make a type specimen book and scrambled it to make.
                            </p>
                        </div>

                        <div className='mt-5 flex flex-col justify-center items-center'>
                            <h1 className="font-bold main-font mt-1 text-white text-3xl">Personal Info</h1>

                            <h1 className="font-bold mt-1 text-white text-2xl">Email</h1>
                            <p className="font-medium main-font mt-1 text-white text-1xl">{user?.email}</p>

                            <h1 className="font-bold mt-1 text-white text-2xl">Nomor Telepon</h1>
                            <p className="font-medium main-font mt-1 text-white text-1xl">+621311225477</p>

                            <h1 className="font-bold mt-1 text-white text-2xl">Domisili</h1>
                            <p className="font-medium main-font mt-1 text-white text-1xl">Ambon, Maluku</p>
                        </div>
                    </div>

                    <div className='mb-5 flex gap-4 justify-end items-end'>
                        <Link href="/" className='btn-style w-auto h-auto light-font px-4 py-2 joobify-main-color hover:bg-[#373737] rounded-lg text-white hover:text-white shadow-md'>Kembali</Link>

                        <Button type='submit' onClick={signOutUser} className='btn-style w-auto h-auto light-font' color="failure">Sign out</Button>
                    </div>
                </main>
            </div>
        </div>
    );
};
*/

export default Profile;