"use client"
import { Button } from '@/components/ui/button';
import React from 'react';

const DownloadButton = () => {
    const handleDownloadResume = () => {
        const googleDriveLink = 'https://drive.google.com/uc?export=download&id=1cSTrv4pRKz422xSHxzgzRgvBfjXldQME';
        window.location.href = googleDriveLink;
    };

    return (
        <Button 
            className="sm:w-fit px-6 py-3 rounded-md border border-orange-400 hover:text-orange-400 mt-4 sm:mt-0 md:ml-4" 
            onClick={handleDownloadResume}
        >
            Download Resume
        </Button>
    );
};

export default DownloadButton;