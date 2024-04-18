import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                <div className="text-lg font-bold">
                    <Link href="/" className='hover:text-gray-300'>Surya Madhav</Link>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/#profile" className="hover:text-gray-300">Profile</Link>
                        </li>
                        <li>
                            <Link className="hover:text-gray-300" href="/#skills">Skills</Link>
                        </li>
                        <li>
                            <Link className="hover:text-gray-300" href="/#projects">Projects</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
