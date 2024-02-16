'use client';

import Image from 'next/image';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import { getAuth } from 'firebase/auth';

import GoogleAuth from './googleAuth';
import WarningMessage from '../layouts/warning';

import { axiosInstance } from "@/utils/axios";
import { firebaseApp } from '@/config/firebaseApp';
import { joobifyEndpoint } from '@/utils/api';
import { auth } from '@/config/firebaseApp';

const SignUpForm = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
    }, []);

    // Form data
    const [formData, setFormData] = useState({
        // Take from the input form
        name: name,
        email: email,
        password: password
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post('/auth/signup', formData);

            if (response) {
                const token = response.data.accessToken;

                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', token);
                }

                // console.log(token);

                // Signup successful, redirect or show success message
                router.push('/');
            }

            /*
            const response = await fetch(`${joobifyEndpoint}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Get the specific user data
            const result = await response.json();

            if (response.ok) {
                // console.log(result.data.user.stsTokenManager.accessToken);

                // Signup successful, redirect or show success message
                router.push('/');
            } else if (response.status === 500) {
                setError(result.error);

                setIsVisible(true);

                // Set the timeout
                setTimeout(() => {
                    setIsVisible(false);
                }, 5000);

                console.log(result.error);
            }
            */
        } catch (error) {
            setError(error.response.data.error);

            setIsVisible(true);

            // Set the timeout
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            // console.error('Error occurred: ', error.response.data.error);
        }
    };

    return (
        <main className='flex flex-col md:order-2 ml-9 pl-5 pt-20'>
            <h1 className="font-bold black-color text-4xl">JOIN TO</h1>
            <h1 className="font-bold black-color text-4xl"><span className="main-color">JOOBIFY</span> NOW</h1>

            <form method='POST' onSubmit={handleSubmit} className="mt-6 grid grid-flow-row justify-start">
                <div className="mb-4">
                    <label htmlFor="name" className="black-color w-80 block mb-2 text-sm font-medium text-gray-900 dark:text-white light-font">Full name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required={true} />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="black-color w-80 block mb-2 text-sm font-medium text-gray-900 dark:text-white light-font">Email address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required={true} />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="black-color w-80 block mb-2 text-sm font-medium text-gray-900 dark:text-white light-font">Your password</label>
                    <input type="password" autoComplete="on" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required={true} />
                </div>

                {/* <WarningMessage message="Sign Up" /> */}

                {isVisible && <span className='text-sm text-red-500 mt-2'>{error}</span>}

                <Button type="submit" className="joobify-main-color mt-3 btn-style light-font" pill>
                    Sign up
                </Button>

                <span className='mt-2 text-center black-color new-to-joobify light-font'>or</span>

                <GoogleAuth />

                <span className='mt-5 text-center black-color new-to-joobify pb-5 mb-5'>Already on Joobify? <Link href="/signin" className="main-color join-now font-bold">Sign in</Link></span>
            </form>

            <div className="flex justify-center absolute top-14 image-container max-w-full h-auto">
                <Image className="mt-10 auth-image" src="/images/signup.svg" width={0} height={0} priority={true} alt="Sign up image" />
            </div>
        </main>
    );
}

export default SignUpForm;