"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import "../projects.css"
import LottiePlayer from "react-lottie-player";

const SafetyInGoogleMaps = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/icons/github.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.log('Error loading animation data:', error));
  }, []);

  const projectData = {
    title: "Safety in Google Maps",
    summary: "Safety in Google Maps is a project that aims to provide a platform for users to report and view safety incidents in their area. The project is built using Next.js and Google Maps API.",
    imageUrl: "/images/GCP.svg",
    githubUrl: "https://github.com/yourusername/yourproject"
  };

  const imageCount = 15;
  const images = Array.from({ length: imageCount }, (_, i) => (
    <div key={i} className="my-1 image-container">
      <Image src={`/images/gmaps/${i + 1}.png`} alt={`img`} layout="fill" objectFit="contain" />
    </div>
  ));

  return (
    <div className="py-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">{projectData.title}</h1>
      </header>
      <section className="my-4">
        <p>{projectData.summary}</p>
      </section>
      <section className='flex flex-col gap-y-2'>
        {images}
      </section>
    </div>
  );
};

export default SafetyInGoogleMaps;
