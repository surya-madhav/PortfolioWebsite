/* eslint-disable react-hooks/rules-of-hooks */
// app/project-detail/page.tsx
"use client";
// Importing GitHub icon from lucide-react
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import "../projects.css"
import LottiePlayer from "react-lottie-player";
import Link from 'next/link';
const safetyInGoogleMaps = () => {
  // Filler data for the project

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the animation JSON from the public folder
    fetch('/icons/github.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      })
      .catch(error => console.log('Error loading animation data:', error));
  }, []);


  const projectData = {


    title: "Safety in Google Maps",
    summary: "",
    imageUrl: "/images/GCP.svg",
    githubUrl: "https://github.com/yourusername/yourproject"
  };

  return (
    <div className="py-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">{projectData.title}</h1>
      </header>

      <section className="my-4">        
        <p className="">
          Safety in Google Maps is a project that aims to provide a platform for users to report and view safety incidents in their area. The project is built using Next.js and Google Maps API.
        </p>
      </section>
      <section className='flex flex-col gap-y-2'>
      <div className="my-6 image-container">
          <Image src="/images/gmaps/1.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className="my-6 image-container">
          <Image src="/images/gmaps/2.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className="my-6 image-container">
          <Image src="/images/gmaps/3.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className="my-6 image-container">
          <Image src="/images/gmaps/4.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        {/* Write the same until 15.png */}
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/5.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/6.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/7.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/8.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/9.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/10.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/11.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/12.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/13.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/14.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
        <div className='my-6 image-container'>
          <Image src="/images/gmaps/15.png" alt={`img`} layout="fill" objectFit="contain" />
        </div>
      </section>
    </div>
  );
};
export default safetyInGoogleMaps;