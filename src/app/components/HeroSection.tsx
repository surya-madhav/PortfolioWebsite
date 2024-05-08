"use client"
import React from 'react'
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-7 place-self-center flex flex-col">
                    <h1 className='text-4xl lg:text-5xl mb-4 text-white font-extrabold text-center lg:text-start'>Hello, I&apos;m
                        <br />
                        <TypeAnimation className='text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-600'
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
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
                        />
                        </h1>
                    <p className="text-gray-200 text-lg lg:text-xl text-center lg:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quisquam rem autem sint nostrum dolorum eos quam quidem est aliquid voluptatibus distinctio mollitia soluta iste error, nihil ex qui reprehenderit?</p>
                    <div className='flex flex-col mt-4 w-full lg:text-left flex-1 sm:justify-center sm:flex-row lg:justify-start md:flex-row px-8 sm:px-0'>
                        <button className='px-6 py-3 rounded-md bg-gradient-to-r from-orange-400 to-orange-600 hover:bg-orange-600 sm:w-fit hover:border hover:border-white'>Contact Me</button>
                        <button className='sm:w-fit px-6 py-3 rounded-md border border-orange-400 hover:text-orange-400 mt-4 sm:mt-0 md:ml-4'>
                            Download Resume
                        </button>
                    </div>
                </div>
                <div className="col-span-5">

                    <div className="w-full h-full flex items-center justify-center place-self-center mt-4 lg:mt-0 mb-6">
                        <Image
                        className='rounded-full w-72 h-72 bg-gray-800 shadow-lg border border-orange-200' src="/images/ProfileRedJacket.png" style={{objectFit: "contain"}} width={500} alt="Hero Image"  height={500} />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection