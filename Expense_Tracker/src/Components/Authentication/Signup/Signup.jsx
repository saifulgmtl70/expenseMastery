import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Google from "../GoogleLogin/Google";
import { useForm } from "react-hook-form";



const SignUp = () => {

    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    // const [showPass, setShowPass] = useState(null);
    const { createUser, updateUserProfile } = useContext(AuthContext);
    // const location = useLocation();
    const navigate = useNavigate();


    const onSubmit = data => {
        console.log(data);
        
        createUser(data.email, data.password)
        .then(result => {
            if (result && result.user) {
                const loggedUser = result.user;
                console.log(loggedUser);
                return updateUserProfile(data.name, data.photoURL);
            } 
            else {
                throw new Error('User creation failed or returned invalid data');
            }
        })

        .then(() => {
            // console.log('user profile info updated')
            // Create user entry in the database
            const userInfo = {
                name: data.name,
                email: data.email,
            };

            axiosPublic.post('/users', userInfo)
            .then(res => {
                if(res.data.insertedId){
                    console.log("User Added to databse");
                    reset();
                    toast.success("Account Created Successfully", {
                        position: "top-center",
                        autoClose: 1000, // এক সেকেন্ডের মধ্যে বন্ধ হবে
                         // টোস্ট বন্ধ হওয়ার পরে নেভিগেট করুন
                        onClose: () => navigate('/')
                    });
                   
                }
            })
            
            
        })
        .catch(error => {
            console.error('Error during user creation or profile update:', error);
        });


    };


    

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <ToastContainer />
        <div className="container">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4">
                
                    <div className="max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px] "
                    >

                        <h2 className="text-[30px] text-[#333] font-bold mb-10">Sign Up Here</h2>
                    
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <input type="text" {...register("name", { required: true })}  placeholder="Enter Your Name" name="name"  className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="mb-6">
                                <input type="email" {...register("email", { required: true })} placeholder="Enter Your Email Address" name="email" className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            
                            <div className="mb-6">
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}  placeholder="Enter a Password" name="password"  className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>
                                            }
                            </div>
                            
                            <div className="mb-10">
                                <input type="submit" value="Sign Up" className="w-full rounded-md border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90 transition" />
                            </div>
                        </form>
                        
                        <Google/>

                        <p className="text-base text-[#adadad]">
                            ALready Registered?
                            <Link
                                to="/login"
                                className="text-primary hover:underline"
                                >
                            Login
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

export default SignUp;
