'use client'

import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation'
import { Project } from '@/types/project' // Ensure that you have the Project interface defined

const Card = ({ project }: { project: Project }) => {
  const router = useRouter();

  return (
    <div
      className='flex group flex-col rounded-xl border bg-gray-800 hover:border-orange-500 cursor-pointer group-hover:shadow-lg'
      onClick={() => {
        router.push("/projects/" + project.slug);
      }}
    >
      <div className='w-full bg-gray-800 flex items-center justify-center'>
        {/* Uncomment the below line if using next/image for optimized images */}
        {/* <Image src={project.image} alt={project.alt} className='w-full h-full object-cover' width={250} height={250} /> */}
      </div>
      <div className='p-4'>
        <h1 className='text-xl group-hover:text-orange-400 font-bold mb-2'>{project.title}</h1>
        <div className='categories flex flex-row flex-wrap mb-2'>
          {project.categories.map((category, index) => (
            <span
              key={index}
              className='text-orange-200 text-sm bg-gray-700 px-2 py-1 rounded-md mr-2 mt-2'
            >
              {category}
            </span>
          ))}
        </div>
        <p className='text-gray-400 group-hover:text-white mt-2'>{project.description}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string,
    image: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    techStack: PropTypes.arrayOf(PropTypes.string),
    show: PropTypes.bool,
    description: PropTypes.string,
    href: PropTypes.string,
    markdownContent: PropTypes.string
  })
};

export default Card;
