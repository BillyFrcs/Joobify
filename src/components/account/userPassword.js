'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { axiosInstance } from "@/utils/axios";
import { Button, Card, FileInput, Label, Textarea, Select, Tabs } from 'flowbite-react';

const ChangePasswordForm = ({ user }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isVisibleSuccess, setIsVisibleSuccess] = useState(false);
    const [isVisibleError, setIsVisibleError] = useState(false);

    useEffect(() => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }, []);

    // Form data
    const [formData, setFormData] = useState({
        // Take from the input form
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const contents = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            axiosInstance.put('/auth/changePassword', formData, { 'headers': contents }).then(response => {
                setSuccess(response.data?.message);

                setIsVisibleSuccess(true);

                // Set the timeout
                setTimeout(() => {
                    setIsVisibleSuccess(false);
                }, 5000);

                // console.log(response);
            }).catch(error => {
                setError(error.response.data?.message);

                setIsVisibleError(true);

                // Set the timeout
                setTimeout(() => {
                    setIsVisibleError(false);
                }, 5000);

                // console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form method='PUT' onSubmit={handleSubmit} className='mt-5'>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="max-w-md justify-center items-center ml-10 mb-[15.5rem]">
                        <h1 className="font-bold main-font text-[#373737] text-3xl">Change Password</h1>

                        <div className='mt-5'>
                            <div className="mb-5">
                                <Label htmlFor="currentPassword" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Current Password</Label>
                                <input type="password" id="currentPassword" name="currentPassword" value={formData.currentPassword} onChange={handleChange} disabled={false} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password saat ini" required={true} />
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="newPassword" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">New Password</Label>
                                <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} disabled={false} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password baru" required={true} />
                            </div>

                            <div className="mb-5">
                                <Label htmlFor="confirmPassword" className="black-color w-80 block mb-2 text-sm font-bold text-gray-900 dark:text-white light-font">Confirm New Password</Label>
                                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} disabled={false} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Konfirmasi password baru" required={true} />
                            </div>
                        </div>

                        <div className='mt-2'>
                            {isVisibleSuccess && <span className='text-sm text-green-500 mt-2'>{success}</span>}

                            {isVisibleError && <span className='text-sm text-red-500'>{error}</span>}
                        </div>

                        <div className='flex mt-8 gap-4'>
                            <Button type='submit' className='btn-style main-font light-font joobify-main-color'>Update</Button>

                            <Link href="/profile" className='btn-style w-auto h-auto light-font px-4 py-2 bg-[red] hover:bg-[#373737] rounded-lg text-white hover:text-white shadow-md'>Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ChangePasswordForm;