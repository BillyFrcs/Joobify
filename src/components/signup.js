import Image from 'next/image';
import Link from 'next/link';

import { Button } from 'flowbite-react';
import { FcGoogle } from "react-icons/fc";

const SignUpForm = () => {
    return (
        <main className='flex flex-col md:order-2 ml-9 pl-5 pt-10'>
            <h1 className="font-bold black-color text-4xl">JOIN TO</h1>
            <h1 className="font-bold black-color text-4xl"><span className="main-color">JOOBIFY</span> NOW</h1>

            <form method='' className="mt-6 grid grid-flow-row justify-start">
                <div className="mb-4">
                    <label htmlFor="name" className="black-color w-80 block mb-2 text-sm font-medium text-gray-900 dark:text-white light-font">Full name</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required={true} />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="black-color w-80 block mb-2 text-sm font-medium text-gray-900 dark:text-white light-font">Email address</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required={true} />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="black-color w-80 block mb-2 text-sm font-medium text-gray-900 dark:text-white light-font">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required={true} />
                </div>

                {/* <span className='text-red-500 mb-2'>Invalid email or password, please try again!</span> */}

                <Button type="submit" className="joobify-main-color mt-3 btn-style light-font" pill>
                    Sign up
                </Button>

                <span className='mt-2 text-center black-color new-to-joobify light-font'>or</span>

                <Button type='button' className="mt-2 btn-style light-font" color="light" pill>
                    <FcGoogle className='mr-2' /> Continue with Google
                </Button>

                <span className='mt-5 text-center black-color new-to-joobify pb-5 mb-5'>Already on Joobify? <Link href="/signin" className="main-color join-now font-bold">Sign in</Link></span>
            </form>

            <div className="flex justify-center absolute top-14 image-container max-w-full h-auto">
                <Image className="mt-10" src="/images/signup.svg" width={600} height={600} alt="Sign In Button" />
            </div>
        </main>
    );
}

export default SignUpForm;