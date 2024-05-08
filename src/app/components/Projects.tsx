import React from 'react'
import Card from './Card'
import ProjectsListData from '../data/projects'
const Projects = () => {
  return (
    <section>
      <h1 className='text-4xl font-bold text-center lg:text-left mt-12 mb-12'>Projects</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6'>
        {
          ProjectsListData.map((project, index) => {
            // Return only if hidden is false
            if (project.show) {
              return (
                <Card key={index} props={project} />
              )
            } else {
              return null
            }

          })
        }
      </div>
    </section>
  )
}

export default Projects