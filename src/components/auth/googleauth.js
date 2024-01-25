'use client';

import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import { FcGoogle } from "react-icons/fc";

import Profile from '@/app/profile/page';
import firebaseApp from '@/config/firebase';

const GoogleAuth = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(firebaseApp);

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Sign in with Google
    const signInWithGoogle = async () => {
        const auth = getAuth(firebaseApp);
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);

            router.push('/profile');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className=''>
            {user ? (
                <Profile />
            ) : (
                <Button type='button' onClick={signInWithGoogle} className="w-80 mt-2 btn-style light-font" color="light" pill>
                    <FcGoogle className='mr-2' /> Continue with Google
                </Button>
            )}
        </div >
    )
};

export default GoogleAuth;