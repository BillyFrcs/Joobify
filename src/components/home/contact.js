'use client';

import { Button, FloatingLabel } from 'flowbite-react';
import { useEffect, useState } from 'react';

import axiosInstance from '@/utils/axios';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setName('');
        setEmail('');
        setMessage('');
    }, []);

    // Form data
    const [formData, setFormData] = useState({
        // Take from the input form
        name: name,
        email: email,
        message: message
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // create response using axios
            const response = await axiosInstance.post('/users/contact', formData).then((response) => {
                return response;
            })

            if (response) {
                // console.log(response.data.message);

                setSuccess(response.data.message);

                setIsVisible(true);

                // Set the timeout
                setTimeout(() => {
                    setIsVisible(false);
                }, 5000);
            } else if (response.status === 500) {
                console.log(response.error);
            }
        } catch (error) {
            console.error('Error occurred: ', error);
        }
    };

    return (
        <div>
            <form method='POST' className='mt-[-13rem] ml-[50rem]' onSubmit={handleSubmit}>
                <h5 className="font-medium mt-1 black-color text-2xl">Contact us</h5>

                <FloatingLabel id='name' name='name' type='text' onChange={handleChange} className='w-[28rem]' variant="standard" label="Name" required />
                <FloatingLabel id='email' name='email' type='email' onChange={handleChange} className='w-[28rem]' variant="standard" label="Email" required />
                <FloatingLabel id='message' name='message' type='text' onChange={handleChange} className='w-[28rem]' variant="standard" label="Message" required />

                {isVisible && <span className='text-sm text-green-500 mt-2'>{success}</span>}

                <Button type='submit' className='mt-8 btn-style main-font light-font joobify-main-color'>Submit</Button>
            </form>
        </div>
    );
};

export default ContactForm;