'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';

import axiosInstance from '@/utils/axios';

const getData = async ({ id }) => {
    const response = await axiosInstance.get(`/jobs/jobDetail/${id}`);

    return response.data;

    /*
    const res = await fetch(`${joobifyEndpoint}/jobs/jobDetail/${id}`);

    return res.json();
    */
};

const JobDetail = ({ params }) => {

    const [job, setJob] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const { id } = params;

        getData({ id }).then((data) => {
            setJob(data);
        });
    }, [params]);

    if (!job)
        return (
            <div>
                <p className='text-center mt-10 mb-10'>Memuat data pekerjaan, harap tunggu...</p>
            </div>
        );
    
    // console.log(job);

    return (
        <div>
            <h1>{job.data.title}</h1>
            <h1>Test</h1>
        </div>
    );
};

export default JobDetail;