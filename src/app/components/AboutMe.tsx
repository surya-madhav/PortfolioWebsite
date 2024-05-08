import React from 'react'
import Image from 'next/image'

const Skills = {
    "Programming Languages": ["Java", "JavaScript", "TypeScript", "C", "C++", "Python"],
    "Database Technologies": ["MySQL", "MongoDB", "Database Design"],
    "Web Technologies": ["HTML", "CSS", "SCSS", "Angular", "Flask", "Spring Boot", "ReactJS", "NodeJS", "ExpressJS", "Microservices", "Kafka", "Django", "Webpack", "Mocha", "JUnit", "Tailwind CSS"],
    "Data Science and Analytics": ["NumPy", "SciPy", "Pandas", "scikit-learn", "Seaborn", "Matplotlib", "Machine Learning", "Time Series Analysis"],
    "DevOps": ["Azure", "Linux", "Docker", "Git", "CI/CD", "Jenkins", "Github Actions", "Terraform"],
    "Miscellaneous": ["Figma", "Jira", "Postman", "Firebase", "Agile", "Software Development Life Cycle (SLDC)", "Scrum", "Sharepoint"]
}


const AboutMe = () => {
    return (
        <section className='text-white mt-24'>
            <div className="w-full h-12 flex flex-row align-middle justify-center">
                <h2 className='text-4xl text-center self-center font-medium'>Skills</h2>
            </div>
            <div className='grid sm:grid-cols-3 grid-cols-1 gap-3 mt-4'>
                <div className='webTech border border-orange-100'>
                    <h3 className='text-2xl font-medium'>Web Technologies</h3>
                    <ul className='grid grid-cols-2'>
                        {Skills["Web Technologies"].map((skill, index) => (
                            <li key={index} className='text-lg'>{skill}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default AboutMe