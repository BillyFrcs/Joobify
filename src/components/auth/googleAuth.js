'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import { FcGoogle } from "react-icons/fc";

import Profile from '@/app/profile/page';
import firebaseApp from '@/config/firebaseApp';

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
            await signInWithPopup(auth, provider).then((result) => {
                const name = result.user.displayName;
                const email = result.user.email;
                const photoURL = result.user.photoURL;

                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                localStorage.setItem('photoURL', photoURL);

                router.push('/');
            })
        } catch (error) {
            // throw new Error(`Error signin with Google: ${error.message}`);
        }
    };

    return (
        <Button type='button' onClick={signInWithGoogle} className="mt-2 btn-style light-font" color="light" pill>
            <FcGoogle className='mr-2' /> Continue with Google
        </Button>
    )
};

export default GoogleAuth;