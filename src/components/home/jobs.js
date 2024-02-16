'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Card } from 'flowbite-react';
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { axiosInstance } from "@/utils/axios";
import { joobifyEndpoint } from '@/utils/api';

import JobSearching from './searching';

const JobsList = () => {
    // const [jobs, setJobs] = useState([]);

    const [jobs, setJobs] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const router = useRouter();

    /*
    useEffect(() => {
        axiosInstance.get('/jobs/allJobs').then((response) => {
            setJobs(response.data);
        });
    }, []);
    */

    useEffect(() => {
        const fetchData = async () => {
            try {
                axiosInstance.get(`/jobs/allJobs?page=${page}&limit=${limit}`).then((response) => {
                    setJobs(response.data);

                    setTotalPages(response.data.totalItem);

                    // console.log(response.data);
                });

                /*
                const response = await fetch(`${joobifyEndpoint}/jobs/allJobs?page=${page}&limit=${limit}`);

                const results = await response.json();

                console.log(results.data);

                setJobs(results.data);
                */
            } catch (error) {
                console.log('Failed to fetch data: ' + error.message);
            }
        }

        fetchData();

    }, [page, limit]);

    const handleSearch = async () => {
        try {
            if (!query.trim()) {
                setIsVisible(true);

                // Set the timeout
                setTimeout(() => {
                    setIsVisible(false);
                }, 5000);

                setError('Mohon input pekerjaan yang ingin dicari!');

                return;
            }

            axiosInstance.get(`/jobs/search?job=${query}`).then((response) => {
                if (response.data.data.length != 0) {
                    setSearchResults(response.data); // Adjust this based on your API response structure
                    setIsSearching(true);

                    router.push(`/?search?job=${query}`);

                    // console.log(response.data);
                } else {
                    // console.log(response.data.message);

                    setSearchResults([]);
                }
            }).catch((error) => {
                if (error.response && error.response.status === 404) {
                    // console.log(error.response.data.message);
                }

                setError(true);

                // console.error('Error fetching data: ', error.message);
            });

            /*
            const response = await fetch(`${joobifyEndpoint}/jobs/search?job=${query}`);
            const results = await response.json();

            setSearchResults(results.data); // Adjust this based on your API response structure
            setIsSearching(true);
            */
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    if (!jobs)
        return <p className='text-center mt-10 mb-10'>Memuat daftar lowongan pekerjaan, mohon tunggu...</p>;

    /*
    jobs.data.map((job, id) => {
        console.log(job.id);
    });
    */

    // console.log(jobs.data);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);

            router.push(`/?page=${page - 1}`);

            // router.push(`/?page=${page - 1}&limit=${limit}`);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);

        router.push(`/?page=${page + 1}`);

        // router.push(`/?page=${page - 1}&limit=${limit}`);
    };

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);

        router.push(`/?page=${pageNumber}`);
    };

    const renderPagination = () => {
        const MAX_PAGES = 5; // Maximum number of page buttons to display
        const pages = [];

        let startPage = Math.max(1, page - Math.floor(MAX_PAGES / 2));
        let endPage = Math.min(totalPages, startPage + MAX_PAGES - 1);

        if (totalPages > MAX_PAGES) {
            if (endPage === totalPages) {
                startPage = totalPages - MAX_PAGES + 1;
            } else if (startPage === 1) {
                endPage = MAX_PAGES;
            }
        }

        const TRIPLE_DOT = '...'

        if (startPage > 1) {
            pages.push(
                <Button key="first" className='flex font-extrabold btn-style min-w-max h-auto shadow-md light-font joobify-main-color' type='button' onClick={() => handlePageChange(1)}>
                    1
                </Button>
            );

            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis-first">{TRIPLE_DOT}</span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button className='flex font-extrabold btn-style min-w-max h-auto shadow-md light-font joobify-main-color' type='button' key={i} onClick={() => handlePageChange(i)} disabled={i === page}>
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="ellipsis-last">{TRIPLE_DOT}</span>
                );
            }

            pages.push(
                <Button key="last" className='flex font-extrabold btn-style min-w-max h-auto shadow-md light-font joobify-main-color' type='button' onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </Button>
            );
        }

        return pages;

        /*
        if (startPage > 1) {
            pages.unshift(
                <button key="prev" onClick={() => handlePageChange(startPage - 1)}>
                    {TRIPLE_DOT}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <button key="next" onClick={() => handlePageChange(endPage + 1)}>
                    {TRIPLE_DOT}
                </button>
            );
        }
        */

        /*
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <Button className='flex font-extrabold btn-style min-w-max h-auto shadow-md light-font joobify-main-color' type='button' key={i} onClick={() => handlePageChange(i)} disabled={i === page}>
                    {i}
                </Button>
            );
        }
        */
    };

    return (
        <main className='flex flex-col md:order-2 ml-9 pl-5 pt-10 h-auto' id='jobs'>
            <div className='flex flex-col items-center justify-center'>
                <div className='mt-20'>
                    <h6 className="black-color ml-24 text-1xl">Lihat daftar pekerjaan hari ini</h6>
                    <h2 className="font-bold mt-1 black-color text-2xl">CARI PEKERJAAN YANG TERSEDIA</h2>
                </div>

                <div className='mt-5'>
                    <div className="flex items-center justify-center">
                        {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div> */}

                        <input type="text" id="job-search" onChange={(event) => setQuery(event.target.value)} value={query} className="w-auto search-input block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pekerjaan apa yang ingin anda cari ?" required />

                        <Button type='button' onClick={handleSearch} className="joobify-black-color main-btn h-auto w-[8rem] ml-[-8.5rem] bottom-[0rem] focus:ring-4 focus:outline-none rounded-lg font-medium text-sm">Cari</Button>

                        {/* <Button type='submit' className="joobify-black-color main-btn absolute end-2.5 bottom-1.5 focus:ring-4 focus:outline-none rounded-lg font-medium text-sm">Search</Button> */}
                    </div>

                    {isVisible && <span className='text-sm text-red-500 mt-2 flex justify-center items-center'>{error}</span>}

                    <div className='container mt-[5rem] mb-10 grid grid-cols-2 gap-4 justify-center items-center'>
                        {!isSearching ? (
                            jobs.data.map((job, id) => (
                                <Link key={id} href={{ pathname: `/jobs/${job.id}` }}>
                                    <Card className="w-full h-auto object-cover max-w-full rounded-lg shadow-md relative overflow-hidden" imgSrc={job.companyProfileImage} horizontal="true">
                                        <h5 className="text-2xl main-color font-bold tracking-tight text-gray-900 dark:text-white">{job.title}</h5>

                                        <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaBuilding className='inline-block' /> {job.companyName} <span className='text-md main-color font-bold'>({job.jobType})</span></p>
                                        <p className="font-normal text-gray-700 dark:text-gray-400 whitespace-normal"><FaLocationDot className='inline-block' /> {job.location}</p>
                                        <p className="font-light text-gray-700 dark:text-gray-400 text-[10px] whitespace-normal text-end">Dibuat pada {job.postedOn}</p>
                                    </Card>
                                </Link>
                            ))
                        ) : (
                            <JobSearching query={query} searchResults={searchResults} />
                        )}
                    </div>

                    <div className='flex gap-4 mb-10 mt-10 justify-center items-center'>
                        <Button onClick={handlePreviousPage} disabled={page === 1} type='button' className='flex font-extrabold btn-style min-w-max h-auto shadow-md light-font joobify-main-color'>&#x3C;</Button>
                        {renderPagination()}
                        <Button onClick={handleNextPage} disabled={jobs.data.length < limit} type='button' className='flex font-extrabold btn-style min-w-max h-auto shadow-md light-font joobify-main-color'>&#x3e;</Button>
                    </div>
                </div>
            </div>
        </main >
    );
}

export default JobsList;