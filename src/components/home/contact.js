'use client';

import { Button, FloatingLabel } from 'flowbite-react';

const ContactForm = () => {
    return (
        <div>
            <form method='POST' className='mt-[-13rem] ml-[50rem]'>
                <h5 className="font-medium mt-1 black-color text-2xl">Contact us</h5>

                <FloatingLabel type='text' className='w-[28rem]' variant="standard" label="Name" required />
                <FloatingLabel type='email' className='w-[28rem]' variant="standard" label="Email" required />
                <FloatingLabel type='text' className='w-[28rem]' variant="standard" label="Description" required />

                <Button type='submit' className='mt-8 btn-style main-font light-font joobify-main-color'>Submit</Button>
            </form>
        </div>
    );
};

export default ContactForm;