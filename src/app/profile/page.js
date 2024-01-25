'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';

import firebaseApp from '@/config/firebase';

const Profile = () => {
    const auth = getAuth(firebaseApp);
    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth(firebaseApp);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/signin');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const signOutUser = async () => {
        try {
            await signOut(auth);

            router.push('/');
        } catch (error) {
            console.error('Error signing out with Google: ', error.message);
        }
    };

    return (
        <div>
            <h1>Welcome {user ? user.displayName : 'Guest'}</h1>

            <Button onClick={signOutUser} color='failure'>Sign Out</Button>
        </div>
    );
};

export default Profile;