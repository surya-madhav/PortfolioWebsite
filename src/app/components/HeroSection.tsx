import React from 'react'
import Image from "next/image";
import ContactMeDialog from './ContactDialog';
import DownloadButton from './DownloadButton';

const HeroSection = () => {
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-7 place-self-center flex flex-col">
                    <h1 className='text-white text-center lg:text-start'>Hello, I&apos;m
                        <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-600'>Sai Surya Rebbapragada</span>
                        <div className="text-center lg:text-start mb-1">
                            <span className="inline-block border border-orange-400 text-white px-3 py-1 rounded-full text-sm mr-2">Full Stack Web Developer</span>
                            <span className="inline-block border border-orange-400 text-white px-3 py-1 rounded-full text-sm mr-2">Front End Developer </span>
                            <span className="inline-block border border-orange-400 text-white px-3 py-1 rounded-full text-sm mr-2">Generative AI Engineer</span>
                            <span className="inline-block border border-orange-400 text-white px-3 py-1 rounded-full text-sm mr-2">Backend Systems Architect</span>
                            <span className="inline-block border border-orange-400 text-white px-3 py-1 rounded-full text-sm mr-2">DevOps Engineer</span>
                        </div>
                    </h1>
                    <p className="text-gray-200 text-center lg:text-left">
                        I&apos;m a full-stack developer with 3 years working experience at high velocity fintech startups. I specialize in building robust, scalable web applications and websites. I have a deep passion for product design and development, and I consistently use a user-centric approach to drive innovation and streamline user experiences. I am currently looking for new opportunities to work on exciting projects.
                    </p>
                    <div className='flex flex-col mt-4 w-full lg:text-left flex-1 sm:justify-center sm:flex-row lg:justify-start md:flex-row px-8 sm:px-0'>
                        <ContactMeDialog />
                        <DownloadButton />
                    </div>
                </div>
                <div className="col-span-5">
                    <div className="w-full h-full flex items-center justify-center place-self-center mt-4 lg:mt-0 mb-6">
                        <Image
                            className='rounded-2xl w-72 h-72 bg-gray-800 shadow-lg border border-orange-200'
                            src="/images/ProfileRedJacket.png"
                            alt="Hero Image"
                            width={350}
                            height={350}
                            priority
                            quality={90}
                            sizes="(max-width: 768px) 350px, 350px"
                            style={{ 
                                objectFit: "cover",
                                width: '350px',
                                height: '350px'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection