"use client"
import React from 'react'
import Image from "next/image";
import ContactMeDialog from './ContactDialog';
import { Button } from '@/components/ui/button';
// import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-7 place-self-center flex flex-col">
                    <h1 className='text-4xl lg:text-5xl mb-4 text-white font-extrabold text-center lg:text-start'>Hello, I&apos;m
                        <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-600'>Sai Surya Rebbapragada</span>
                        <div className="text-center lg:text-start mb-1">
                            <span className="inline-block border border-orange-400 text-white px-3 py-1 rounded-full text-sm mr-2">Full Stack Web Developer</span>
                            <span className="inline-block border border-orange-400 text-white px-3 py-1 rounded-full text-sm mr-2">Product Design Advocate</span>
                            <span className="inline-block border border-orange-400 text-white px-3 py-1 rounded-full text-sm mr-2">Backend Systems Architect</span>
                            <span className="inline-block border border-orange-400 text-white px-3 py-1 rounded-full text-sm mr-2">DevOps Engineer</span>
                        </div>
                        {/* <TypeAnimation 
                            sequence={[                            
                                'Surya',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'A Web Developer',
                                1000,
                                'A UI/UX Designer',
                                1000,
                                'An Indie Hacker',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        /> */}
                    </h1>
                    <p className="text-gray-200 text-lg lg:text-xl text-center lg:text-left">
                        I&apos;m a full-stack developer with 3 years working experience at high velocity fintech startups. I specialize in building robust, scalable web applications and websites. I have a deep passion for product design and development, and I consistently use a user-centric approach to drive innovation and streamline user experiences. I am currently looking for new opportunities to work on exciting projects.
                    </p>
                    <div className='flex flex-col mt-4 w-full lg:text-left flex-1 sm:justify-center sm:flex-row lg:justify-start md:flex-row px-8 sm:px-0'>
                        
                        <ContactMeDialog />
                        <Button className="sm:w-fit px-6 py-3 rounded-md border border-orange-400 hover:text-orange-400 mt-4 sm:mt-0 md:ml-4">Download Resume</Button>                        
                    </div>
                </div>
                <div className="col-span-5">

                    <div className="w-full h-full flex items-center justify-center place-self-center mt-4 lg:mt-0 mb-6">
                        <Image
                            className='rounded-full w-72 h-72 bg-gray-800 shadow-lg border border-orange-200' src="/images/ProfileRedJacket.png" style={{ objectFit: "contain" }} width={500} alt="Hero Image" height={500} />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection