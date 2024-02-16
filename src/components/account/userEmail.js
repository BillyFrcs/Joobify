'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { axiosInstance } from "@/utils/axios";
import { Button, Card, FileInput, Label, Textarea, Select, Tabs } from 'flowbite-react';

const ChangeEmailForm = ({ user }) => {
    return (
        <>
            <form method='PUT' className='mt-5'>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className="max-w-md justify-center items-center ml-10 mb-[15.5rem]">
                        <h1 className="font-bold main-font text-[#373737] text-3xl">Change Email</h1>

                        <p className="font-light main-font mt-5 mb-5 text-[#5B71C8] text-0.5xl text-center">Email anda saat ini adalah <span className='font-bold'>{user?.email}</span></p>

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
        </>
    );
};

export default ChangeEmailForm;