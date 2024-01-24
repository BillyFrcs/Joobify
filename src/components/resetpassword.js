import Image from 'next/image';
import Link from 'next/link';

import { Button } from 'flowbite-react';

const ResetPasswordForm = () => {
    return (
        <main className='flex flex-col md:order-2 ml-9 pl-5 pt-10'>
            <div className="flex justify-start top-14 image-container max-w-full h-auto">
                <Image className="forgot-password-image" src="/images/forgot-password.svg" width={0} height={0} priority={true} alt="Forgot Password image" />
            </div>

            <div className='grid absolute ml-80 pl-80 justify-end pt-32'>
                <div>
                    <h1 className="font-bold black-color text-4xl">FORGOT YOUR</h1>
                    <h1 className="font-bold black-color text-4xl">PASSWORD?</h1>
                </div>

                <div className='mt-5'>
                    <p className='black-color'>Enter your email address that associated with your account</p>
                    <p className='black-color'>and we will send a link to reset your password.</p>
                </div>

                <form method='post' className="mt-6 grid grid-flow-row justify-start">
                    <div className="mb-4">
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required={true} />
                    </div>

                    {/* <span className='text-red-500'>Please enter your email!</span> */}

                    <div className='flex justify-start mt-2'>
                        <Button type='submit' className='ml-0 joobify-main-color light-font'>Submit</Button>
                        <Button type='submit' className='ml-3 light-font' color="failure">
                            <Link href="/signin">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ResetPasswordForm;