import { Outlet } from "react-router-dom";
import { CgClose, CgMenuRight, CgProfile  } from 'react-icons/cg';
import { Link, NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaHandHoldingDollar  } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { SiExpensify, SiExpertsexchange } from "react-icons/si";

import {  useState } from "react";
import useAuth from "../Hooks/useAuth";

import './Dashboard.css'


const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { user } = useAuth();

    if (!user) {
        return <img src="https://i.ibb.co/LP19z9c/04de2e31234507-564a1d23645bf.gif" className='mx-auto mt-32' alt="" />;
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
    };


    
    

    return (
        <main className="flex">
            <section className={` lg:block basis-[18%] ${isSidebarOpen ? 'block' : 'hidden'}`}>
                <div className="bg-[#5AB9C1] sidemenu h-full sticky top-0 px-6 font_andika list-none ">
                    <div className="py-3 mb-6 flex ">
                        <Link to="/" className="text-white font-extrabold text-[25px] flex items-center gap-2"> <SiExpertsexchange /> <span className="leading-7">Expense <span className="text-red-500">Mastery</span> </span></Link>
                    </div>

                    <li>
                        <NavLink to="dashboardhome" className="flex items-center gap-[7px] py-[13px] text-[#eee] hover:text-[#122033] transition-all delay-100 font-[600]">
                            <IoMdHome className="text-[23px]" />
                            <p className="text-[16px]"> Home</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="incomes" className="flex items-center gap-[7px] py-[13px] text-[#eee] hover:text-[#122033] transition-all delay-100 font-[600]">
                            <FaHandHoldingDollar  className="text-[23px]" />
                            <p className="text-[16px]"> Incomes</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="expenses" className="flex items-center gap-[7px] py-[13px] text-[#eee] hover:text-[#122033] transition-all delay-100 font-[600]" >
                            <SiExpensify  className="text-[23px]" />
                            <p className="text-[16px]"> Expense</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="profile" className="flex items-center gap-[7px] py-[13px] text-[#eee] hover:text-[#122033] transition-all delay-100 font-[600]">
                            <CgProfile  className="text-[23px]" />
                            <p className="text-[16px]"> Profile</p>
                        </NavLink>
                    </li>

                </div>
            </section>

            <section className="basis-[100%] lg:basis-[82%] h-[100vh] bg-[#F6F6F6] overflow-y-scroll">
                <div className="flex items-center sticky top-0 z-50 bg-opacity-100 bg-[#67c5cd] justify-between h-[70px] shadow-sm px-[10px] lg:px-[25px]">
                    <div className="flex items-center rounded-[5px]">
                    

                        <input
                            type="search"
                            className="bg-[#z] hidden lg:block h-[40px] outline-none pl-[13px] w-auto lg:w-[340px] rounded-[5px] rounded-r-none placeholder:text-[16px]"
                            placeholder="Search here"
                        />

                        <div className="bg-[#ff4321] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
                            <IoMdSearch className="text-[23px] text-white" />
                        </div>
                    </div>

                    <div className="flex items-center gap-[15px] relative">

                        <div className="relative text-left flex items-center">
                            <div className="flex items-center gap-[15px] relative">
                                <div className="py-2" role="menuitem" tabIndex="0">
                                    <h3 href="#" className="hidden lg:block px-4 py-2 text-lg text-center text-gray-700">
                                        {user.displayName}
                                    </h3>
                                </div>
                                <button type="button" onClick={toggleDropdown}>
                                    <img src={user.photoURL} className='w-[45px] h-[45px] rounded-full ' alt="" />
                                </button>
                            </div>

                            {isOpen && (
                                <div
                                    className="origin-top-right absolute right-0 mt-56 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                    tabIndex="-1"
                                >
                                    <div className="py-2 border-b" role="menuitem" tabIndex="0">
                                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700 ">
                                            Profile
                                        </Link>
                                    </div>
                                    <div className="py-2 border-b" role="menuitem" tabIndex="0">
                                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700 ">
                                            Settings
                                        </Link>
                                    </div>
                                    <div className="py-2" role="menuitem" tabIndex="0">
                                        <button href="#" className="block px-4 py-2 text-sm text-gray-700 ">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="block md:hidden">
                            <button onClick={toggleSidebar} className="rounded p-2 text-[#1E293B] dark:text-[#fcfcfc]">
                                {isSidebarOpen ? <CgClose className='w-[20px] text-[#fff] h-[23px] rounded-[3px]'/> : <CgMenuRight className='w-[20px] text-[#fff] h-[23px] rounded-[3px]'/>} {/* Toggle between menu and close icons */}
                            </button>
                        </div>

                    </div>
                </div>

                <div>
                    <Outlet></Outlet>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;