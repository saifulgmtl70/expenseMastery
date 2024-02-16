import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { SiExpertsexchange } from "react-icons/si";

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const [hasShadow, setHasShadow] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    

    const navigate = useNavigate();

    const handleLogout = () =>{
        logOut()
        .then(() =>{
            toast.success("Logged Out Successfully", {
                position: "top-center",
                autoClose: 1000, // এক সেকেন্ডের মধ্যে বন্ধ হবে
                 // টোস্ট বন্ধ হওয়ার পরে নেভিগেট করুন
                onClose: () => navigate('/login')
            });
            
        })

        
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          const shouldHaveShadow = scrollTop > 0;
          setHasShadow(shouldHaveShadow);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

  return (
        <div className={`font_source px-3 lg:px-14 py-4 fixed w-full z-50 flex items-center justify-between${hasShadow ? 'shadow-lg z-50 bg-opacity-90 bg-[#122033] text-[#333]' : 'text-[#E2E8F0]'}`}>
            <ToastContainer/>
            <div className="flex-1">
                <Link className="text-white font-bolder text-[25px] flex items-center gap-2"> <SiExpertsexchange /> <span>ExpenseTracker</span></Link>
            </div>
            <div className="">

                <div className="flex items-center mt-[14px] gap-4">
                  {user ? (
                    <div className="relative">
                      <button onClick={toggleDropdown} className="focus:outline-none flex -mt-5 items-center gap-2">
                        <h2 className='text-[#F7A582] hidden lg:inline-block text-[18px] font-[700]'>{user.displayName}</h2>
                        <img src={user.photoURL} className="w-[40px] h-[40px] rounded-full" alt="" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-auto  lg:w-96 bg-white border rounded shadow-lg">
                          <h2 className='text-[#F7A582] px-4 py-2 block lg:hidden text-[18px] font-[700]'>{user.displayName}</h2>
                          <h2 className='text-[#F7A582] px-4 py-2 text-[18px] font-[700]'>{user.email}</h2>
                          <Link to="/dashboard/dashboardhome" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</Link>
                          <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" >Logout</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="sm:flex sm:gap-4">
                      <Link className="rounded-[3px] bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow" to="/login"> Login</Link>
                    </div>
                  )}

              
                </div>

            </div>
        </div>
  );
};

export default Header;
