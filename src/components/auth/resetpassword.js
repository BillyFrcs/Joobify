'use client';

import Image from 'next/image';
import Link from 'next/link';

import react, { useState } from 'react';

import { Button, Modal } from 'flowbite-react';
import { BsFillSendCheckFill } from "react-icons/bs";

const ResetPasswordForm = () => {
    // const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState(null)

    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => {
        setOpenModal(false);
    };

    const SubmitResetPassword = async (event) => {
        event.preventDefault()

        // setIsLoading(true)

        setError(null) // Clear previous errors when a new request starts

        try {
            // const formData = new FormData(event.currentTarget)

            const formData = {
                email: event.target.email.value
            };

            const response = await fetch(process.env.joobifyEndpoint + '/auth/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)

                // body: JSON.stringify({ email: event.target.email.value })
            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again, ' + error.message);
            }

            // Handle response if necessary
            const data = await response.json();

            // Display a modal
            if (data !== null) {
                setOpenModal(true);

                // console.log(data);
            }
        } catch (error) {
            // Capture the error message to display to the user
            setError(error.message);

            // console.error(error);
        } finally {
            // setIsLoading(false)
        }
    }

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
                    <p className='black-color'>and we will send a link to reset your password</p>
                </div>

                <form method='post' onSubmit={SubmitResetPassword} className="mt-6 grid grid-flow-row justify-start">
                    <div className="mb-4">
                        <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required={true} />
                    </div>

                    {/* <span className='text-red-500'>Please enter your email!</span> */}

                    <div className='flex justify-start mt-2'>
                        <Button type='submit' className='ml-0 joobify-main-color light-font'>Submit</Button>
                        <Button type='submit' className='ml-3 light-font' color="failure">
                            <Link href="/signin">Cancel</Link>
                        </Button>
                    </div>
                </form>

                <Modal show={openModal} size="md" onClose={() => closeModal()} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <BsFillSendCheckFill className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 main-font">
                                Please check your email to reset your password
                            </h3>

                            <div className="flex justify-center gap-4">
                                <Button color="success" onClick={() => closeModal()}>
                                    {"Okay"}
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </main>
    );
}

export default ResetPasswordForm;