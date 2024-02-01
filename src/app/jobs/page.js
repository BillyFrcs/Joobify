'use client';

import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';

const ViewJob = () => {
    return (
        <div>
            <h1>Welcome to view job page</h1>
        </div>
    );
};

export default ViewJob;