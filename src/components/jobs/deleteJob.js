import React, { useState } from 'react';

import { axiosInstance } from "@/utils/axios";
import { Button, Card, Modal } from 'flowbite-react';
import { FaBuilding, FaRegTrashAlt } from "react-icons/fa";
import { BsFillSendCheckFill } from "react-icons/bs";
import { getToken } from '@/middleware/auth';

const DeleteJob = ({ jobID }) => {
    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => {
        setOpenModal(false);
    };

    const handleDelete = async () => {
        try {
            const token = getToken();

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // console.log(jobID);

            await axiosInstance.delete(`/jobs/deleteUserJob/${jobID}`).then(() => {
                // console.log('Success deleted job');

                window.location.reload();
            }).catch((error) => {
                // console.log(error);
            });
        } catch (error) {
            // console.log(error);
        }
    };

    return (
        <>
            <Button type="submit" onClick={() => setOpenModal(true)} className='bg-red-600 hover:bg-[#373737] text-white shadow-md rounded-lg'><FaRegTrashAlt className='text-[1rem] inline-block' /></Button>

            <Modal show={openModal} size="md" onClose={() => closeModal()} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <FaRegTrashAlt className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 main-font">
                            Apakah anda yakin ingin menghapus lowongan pekerjaan ini?
                        </h3>

                        <div className="flex justify-center gap-4">
                            <Button className='btn-style light-font' color="success" onClick={() => handleDelete() & closeModal()}>
                                {"Ya"}
                            </Button>

                            <Button className='btn-style light-font' color="failure" onClick={() => closeModal()}>
                                {"Tidak"}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteJob;