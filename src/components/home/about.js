import Image from 'next/image';

const AboutPage = () => {
    return (
        <div className='bg-[#373737] w-full h-auto'>
            <main className='flex flex-col md:order-2 ml-9 pl-5 pt-20' id='about'>
                <div className='mt-20'>
                    <div>
                        <h1 className="font-bold mt-1 text-white text-4xl">Buka Potensi Karier</h1>
                        <h1 className="font-bold mt-1 text-white text-4xl">Anda dengan <span className="main-color">JOOBIFY</span>:</h1>
                        <h1 className="font-medium mt-1 text-white text-4xl">Saat Peluang Bertemu</h1>
                        <h1 className="font-medium mt-1 text-white text-4xl">dengan Aspirasi</h1>
                    </div>
                </div>

                <div className="flex justify-end image-container landing-image-container max-w-full h-auto">
                    <Image className="mt-[5rem] career-image" src="/images/Career.svg" width={0} height={0} priority={true} alt="Career image" />
                </div>
            </main>
        </div>
    );
}

export default AboutPage;