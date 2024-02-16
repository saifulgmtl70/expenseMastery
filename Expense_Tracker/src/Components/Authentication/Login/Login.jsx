import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Google from "../GoogleLogin/Google";


const Login = () => {

    const { googleSin, login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (event) =>{
        event.preventDefault();

        const form = event.target;
        // console.log(form);
        const email = form.email.value;
        const password = form.password.value;

        console.log( email, password)

        login(email, password)
        .then((res) =>{
            toast.success("Logged in Successfully", {
                position: "top-center",
                autoClose: 1000, // এক সেকেন্ডের মধ্যে বন্ধ হবে
                onClose: () => navigate(from, { replace: true }) // টোস্ট বন্ধ হওয়ার পরে নেভিগেট করুন
            });
        })
        .catch(() =>{
            toast.error("Please provide valid email and password", {
                position: "top-center"
            });
        })

        form.reset();

    }



 


    

  

  return (
        <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
            <ToastContainer/>
            <div className="container">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                    
                        <div className="max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px] "
                        >

                            <h2 className="text-[30px] text-[#333] font-bold mb-10">Login Here</h2>
                        
                            <form onSubmit={handleLogin}>

                                <div className="mb-6">
                                    <input type="email" placeholder="Enter Your Email Address" name="email" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                                    />
                                </div>

                                <div className="mb-6">
                                    <input type="password" placeholder="Enter a Password" name="password" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                                    />
                                </div>
                            
                                <div className="mb-10">
                                    <input type="submit" value="Sign Up" className=" w-full rounded-md border bordder-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90 transition "
                                    />
                                </div>
                            </form>

                            <Google/>
                        

                            <p className="text-base text-[#adadad]">
                                New here?
                                <Link
                                    to="/signup"
                                    className="text-primary hover:underline"
                                    >
                                Sign Up
                                </Link>
                            </p>

                            <div>
                            
                                <span className="absolute top-1 right-1">
                                    <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <circle
                                        cx="1.39737"
                                        cy="38.6026"
                                        r="1.39737"
                                        transform="rotate(-90 1.39737 38.6026)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="1.39737"
                                        cy="1.99122"
                                        r="1.39737"
                                        transform="rotate(-90 1.39737 1.99122)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="13.6943"
                                        cy="38.6026"
                                        r="1.39737"
                                        transform="rotate(-90 13.6943 38.6026)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="13.6943"
                                        cy="1.99122"
                                        r="1.39737"
                                        transform="rotate(-90 13.6943 1.99122)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="25.9911"
                                        cy="38.6026"
                                        r="1.39737"
                                        transform="rotate(-90 25.9911 38.6026)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="25.9911"
                                        cy="1.99122"
                                        r="1.39737"
                                        transform="rotate(-90 25.9911 1.99122)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="38.288"
                                        cy="38.6026"
                                        r="1.39737"
                                        transform="rotate(-90 38.288 38.6026)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="38.288"
                                        cy="1.99122"
                                        r="1.39737"
                                        transform="rotate(-90 38.288 1.99122)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="1.39737"
                                        cy="26.3057"
                                        r="1.39737"
                                        transform="rotate(-90 1.39737 26.3057)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="13.6943"
                                        cy="26.3057"
                                        r="1.39737"
                                        transform="rotate(-90 13.6943 26.3057)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="25.9911"
                                        cy="26.3057"
                                        r="1.39737"
                                        transform="rotate(-90 25.9911 26.3057)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="38.288"
                                        cy="26.3057"
                                        r="1.39737"
                                        transform="rotate(-90 38.288 26.3057)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="1.39737"
                                        cy="14.0086"
                                        r="1.39737"
                                        transform="rotate(-90 1.39737 14.0086)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="13.6943"
                                        cy="14.0086"
                                        r="1.39737"
                                        transform="rotate(-90 13.6943 14.0086)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="25.9911"
                                        cy="14.0086"
                                        r="1.39737"
                                        transform="rotate(-90 25.9911 14.0086)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="38.288"
                                        cy="14.0086"
                                        r="1.39737"
                                        transform="rotate(-90 38.288 14.0086)"
                                        fill="#3056D3"
                                        />
                                    </svg>
                                </span>

                                <span className="absolute left-1 bottom-1">
                                    <svg
                                    width="29"
                                    height="40"
                                    viewBox="0 0 29 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <circle
                                        cx="2.288"
                                        cy="25.9912"
                                        r="1.39737"
                                        transform="rotate(-90 2.288 25.9912)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="14.5849"
                                        cy="25.9911"
                                        r="1.39737"
                                        transform="rotate(-90 14.5849 25.9911)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="26.7216"
                                        cy="25.9911"
                                        r="1.39737"
                                        transform="rotate(-90 26.7216 25.9911)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="2.288"
                                        cy="13.6944"
                                        r="1.39737"
                                        transform="rotate(-90 2.288 13.6944)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="14.5849"
                                        cy="13.6943"
                                        r="1.39737"
                                        transform="rotate(-90 14.5849 13.6943)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="26.7216"
                                        cy="13.6943"
                                        r="1.39737"
                                        transform="rotate(-90 26.7216 13.6943)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="2.288"
                                        cy="38.0087"
                                        r="1.39737"
                                        transform="rotate(-90 2.288 38.0087)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="2.288"
                                        cy="1.39739"
                                        r="1.39737"
                                        transform="rotate(-90 2.288 1.39739)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="14.5849"
                                        cy="38.0089"
                                        r="1.39737"
                                        transform="rotate(-90 14.5849 38.0089)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="26.7216"
                                        cy="38.0089"
                                        r="1.39737"
                                        transform="rotate(-90 26.7216 38.0089)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="14.5849"
                                        cy="1.39761"
                                        r="1.39737"
                                        transform="rotate(-90 14.5849 1.39761)"
                                        fill="#3056D3"
                                        />
                                    <circle
                                        cx="26.7216"
                                        cy="1.39761"
                                        r="1.39737"
                                        transform="rotate(-90 26.7216 1.39761)"
                                        fill="#3056D3"
                                        />
                                    </svg>
                                </span>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
};

export default Login;
