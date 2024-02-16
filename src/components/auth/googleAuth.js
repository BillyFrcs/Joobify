'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import { FcGoogle } from "react-icons/fc";

import { firestoreDatabase } from '@/config/firebaseApp';
import { collection, addDoc } from 'firebase/firestore';

import Profile from '@/app/profile/page';

import { firebaseApp } from '@/config/firebaseApp';

const GoogleAuth = () => {
    const [user, setUser] = useState(null);

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [headline, setHeadline] = useState("");
    const [location, setLocation] = useState("");
    const [userProfileImage, setUserProfileImage] = useState("");
    const [about, setAbout] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(firebaseApp);

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);

                // console.log(user.uid);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const AddUserData = async (id, name, email, phoneNumber, headline, location, userProfileImage, about, createdAt, updatedAt) => {
        try {
            const docs = ({
                id: id,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                headline: headline,
                location: location,
                userProfileImage: userProfileImage,
                about: about,
                createdAt: createdAt,
                updatedAt: updatedAt
            });

            const userData = await addDoc(collection(firestoreDatabase, "users"), docs);

            console.log("Created a new user with ID: " + userData.id);

            return true;
        } catch (error) {
            console.log("Error adding document: " + error.message);

            return false;
        }
    };

    const saveUserData = async ({ id, name, email, phoneNumber, headline, location, userProfileImage, about, createdAt, updatedAt }) => {
        const userData = await AddUserData(
            id,
            name,
            email,
            phoneNumber,
            headline,
            location,
            userProfileImage,
            about,
            createdAt,
            updatedAt
        );

        if (userData) {
            setID(userData.id);
            setName(userData.name);
            setEmail(userData.email);
            setPhoneNumber(userData.phoneNumber);
            setHeadline(userData.headline);
            setLocation(userData.location);
            setUserProfileImage(userData.userProfileImage);
            setAbout(userData.about);
            setCreatedAt(userData.createdAt);
            setUpdatedAt(userData.updatedAt);
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        const auth = getAuth(firebaseApp);
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider).then((result) => {
                const date = new Date();
                const getDateAndTime = date.toLocaleDateString() + ' | ' + date.toLocaleTimeString();

                const EMPTY = '-';

                const id = result.user.uid;
                const name = result.user.displayName;
                const email = result.user.email;
                const phoneNumber = EMPTY;
                const headline = EMPTY;
                const location = EMPTY;
                const userProfileImage = result.user.photoURL;
                const about = EMPTY;
                const createdAt = getDateAndTime;
                const updatedAt = getDateAndTime;

                /*
                saveUserData({
                    id: id,
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    headline: headline,
                    location: location,
                    userProfileImage: userProfileImage,
                    about: about,
                    createdAt: createdAt,
                    updatedAt: updatedAt
                });
                */

                // console.log(user.uid);

                router.push('/');
            })
        } catch (error) {
            // throw new Error(`Error signin with Google: ${error.message}`);
        }
    };

    return (
        <Button disabled type='button' onClick={signInWithGoogle} className="mt-2 btn-style light-font" color="light" pill>
            <FcGoogle className='mr-2' /> Continue with Google
        </Button>
    )
};

export default GoogleAuth;