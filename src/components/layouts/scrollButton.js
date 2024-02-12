'use client';

import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { FaAngleUp } from "react-icons/fa";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show the button when the user scrolls down 400px from the top
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        // Clean up event listener
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    };

    return (
        <>
            {isVisible && (
                <Button
                    className="fixed bottom-3 right-8 joobify-main-color hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md focus:outline-none"
                    onClick={scrollToTop}
                    type='button' 
                    pill
                >
                    <FaAngleUp />
                </Button>
            )}
        </>
    );
};

export default ScrollToTopButton;