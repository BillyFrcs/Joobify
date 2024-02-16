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
import ChangeEmailForm from '@/components/account/userEmail';
import ChangePasswordForm from '@/components/account/userPassword';
import UserProfileForm from '@/components/account/userProfile';

import { axiosInstance } from "@/utils/axios";
import { axiosInstanceMultipart } from '@/utils/axios';
import { MinimalNavigation } from '@/components/layouts/navbar';
import { firebaseApp } from '@/config/firebaseApp';

const Profile = () => {
    const auth = getAuth(firebaseApp);
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [userProfileImage, setUserProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axiosInstance.get('/users/userProfile').then((response) => {
                setUser(response.data.data);

                // console.log(response.data.data);
            }).catch((error) => {
                router.push('/profile')

                // console.error('Error fetching protected data: ', error);
            });
        } catch (error) {
            console.error(error);
        }
    }, [router]); // Run once on component mount

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        setUserProfileImage(selectedImage);

        // Preview the selected image
        const reader = new FileReader();

        reader.onload = () => {
            setPreviewUrl(reader.result);
        };

        reader.readAsDataURL(selectedImage);
    };

    // Callback function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            formData.append('userProfileImage', userProfileImage);
            formData.append('name', user?.name);
            formData.append('headline', user?.headline);
            formData.append('location', user?.location);
            formData.append('phoneNumber', user?.phoneNumber);
            formData.append('about', user?.about);

            const contents = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            // Handle form submission logic, such as sending data to the server
            axiosInstanceMultipart.put('/users/updateUserAccountProfile', formData, { 'headers': contents }).then((response) => {
                // console.log('Updated user account profile: ', response.data.data);

                router.push('/profile');
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
            console.log(error.message);
        }

        // console.log('Updated user data: ', user);
    };

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
            <MinimalNavigation linkName="/dashboard" navName="Dashboard" />

            <main className='flex flex-col md:order-2 ml-auto pl-auto pt-auto mt-20 h-auto'>
                <div className='container'>
                    <Tabs aria-label="Tabs with underline" style="pills" className='w-full flex justify-center items-center'>
                        <Tabs.Item active title="Profile" icon={HiUserCircle}>
                            <UserProfileForm user={user} handleChange={handleChange} handleSubmit={handleSubmit} handleImageChange={handleImageChange} previewUrl={previewUrl} isVisible={isVisible} error={error} />
                        </Tabs.Item>

                        <Tabs.Item title="Email" icon={MdEmail}>
                            <ChangeEmailForm user={user} setUser={setUser} />
                        </Tabs.Item>

                        <Tabs.Item title="Password" icon={RiLockPasswordFill}>
                            <ChangePasswordForm />
                        </Tabs.Item>
                    </Tabs>
                </div>
            </main>
        </div>
    );
};

export default Profile;