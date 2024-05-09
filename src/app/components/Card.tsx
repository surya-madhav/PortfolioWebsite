'use client'
import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Card = ({ props }: { props: { image: string, alt: string, title: string, categories: string[], description: string, href: string } }) => {
  const router = useRouter();
  return (
  <div className='flex group flex-col border bg-gray-800 hover:border-orange-500 cursor-pointer' onClick={()=>{router.push(props.href)}}>
    <div className='w-fulls bg-gray-800 flex items-center justify-center'>
      {/* <Image src={props.image} alt={props.alt} className='w-full h-full object-cover' width={250} height={250} /> */}
    </div>
    <div className='p-4'>
      <h1 className='text-xl group-hover:text-orange-400 font-bold mb-2'>{props.title}</h1>
      <div className="categories flex flex-row flex-wrap  mb-2 ">
        {props.categories.map((category, index) => (
          <span key={index} className='text-orange-200 text-sm bg-gray-700 px-2 py-1 rounded-md mr-2 mt-2'>{category}</span>
        ))}
      </div>
      <p className='text-gray-400 group-hover:text-whites mt-2'>{props.description}</p>
    </div>
  </div>

  )
}
Card.propTypes = {
  props: PropTypes.shape({
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired
  })
}
export default Card