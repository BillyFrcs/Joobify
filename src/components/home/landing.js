import Image from 'next/image';

import { Button } from 'flowbite-react';

const LandingPage = () => {
    return (
        <main className='flex flex-col md:order-2 ml-9 pl-5 pt-20' id='home'>
            <div className='mt-20'>
                <div>
                    <h1 className="font-bold mt-1 black-color text-4xl">Dapatkan pekerjaan yang anda</h1>
                    <h1 className="font-bold mt-1 black-color text-4xl">butuhkan di <span className="main-color">JOOBIFY</span></h1>
                </div>

                <div className='mt-10 '>
                    <div className='flex flex-row sticky'>
                        <Button className='joobify-main-color btn-style light-font landing-btn' color="light" pill>Web Developer</Button>
                        <Button className='joobify-main-color btn-style light-font ml-5 landing-btn' color="light" pill>Data Analyst</Button>
                        <Button className='joobify-main-color btn-style light-font ml-5 landing-btn' color="light" pill>Cloud Engineer</Button>
                    </div>

                    <div className=' flex flex-row mt-5'>
                        <Button className='joobify-main-color btn-style light-font ml-5 landing-btn' color="light" pill>UI/UX Designer</Button>
                        <Button className='joobify-main-color btn-style light-font ml-5 landing-btn' color="light" pill>Accountant</Button>
                        <Button className='joobify-main-color btn-style light-font ml-5 landing-btn' color="light" pill>Marketing Specialist</Button>
                    </div>
                </div>

                <div className='mt-10'>
                    <h2 className="font-md black-color text-2xl">Cari dan temukan informasi pekerjaan</h2>
                    <h2 className="font-md black-color text-2xl">yang relevan dengan anda</h2>
                </div>
            </div>

            <div className="flex justify-end image-container landing-image-container max-w-full h-auto">
                <Image className="mt-10 landing-image" src="/images/landing.svg" width={0} height={0} priority={true} alt="Landing image" />
            </div>
        </main>
    );
}

export default LandingPage;