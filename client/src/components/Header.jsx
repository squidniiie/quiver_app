import React from 'react'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, ChevronDoubleRightIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useHistory, Link } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-gray-50 shadow-md px-2 md:px-4">
            <div className="relative h-18 cursor-pointer flex w-28 py-5">
                <ChevronDoubleRightIcon className='h-9 font-Quicksand text-green-400 text-4xl' />
                <Link to="/" className="text-2xl font-Quicksand font-semibold text-green-400">quiver</Link>
                <ChevronRightIcon className='h-9 font-Quicksand text-green-400 text-4xl' />
            </div>
            <div className="flex items-center border-1 shadow-lg rounded-full mt-4 mb-4 pr-2">
                <input className="flex-grow pl-5 ml-2 bg-transparent outline-none text-sm md:text-left sm:text-center text-gray-600 placeholder-gray-400 font-Quicksand bg-gray-50" type="text" placeholder="Start your search" />
                <SearchIcon className="hidden md:inline-flex h-8 text-gray-50 bg-green-400 rounded-full p-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:shadow-xl" />
            </div>
            <div className="flex items-center justify-end space-x-3 text-gray-500">
                <button className="hidden md:inline-flex font-Quicksand cursor-pointer" onClick={(e) => history.push('/new_user')}>Join the Party Wave</button>
                <GlobeAltIcon className="h-6 cursor-pointer" />
                <div className="flex items-center border-2 p-2 rounded-full cursor-pointer">
                    <MenuIcon className="h-8" />
                    <UserCircleIcon className="h-8 cursor-pointer" />
                </div>

            </div>
            {/* <Image src="https://www.wapititravel.com/blog/wp-content/uploads/2020/11/Quinta-das-Camelias-Ponta-Delgada-Azores-1024x768.jpg.webp"
                    layout="fill"
                /> */}
        </header>
    )
}

export default Header