import Link from "next/link"
import React from "react"


const NavLink = ({href, title}: {href: string, title: string}) =>{
    return (<Link href={href} className="block py-2 pl-3 pr-4 text-gray-200 hover:text-orange-300">{title}</Link>)
}
export default NavLink;