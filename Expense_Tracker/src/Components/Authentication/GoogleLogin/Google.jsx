
import { FaGoogle, FaGithub } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Google = () => {

    const { googleSin } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSin()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                toast.success("Account Created Successfully", {
                    position: "top-center",
                    autoClose: 1000, // এক সেকেন্ডের মধ্যে বন্ধ হবে
                     // টোস্ট বন্ধ হওয়ার পরে নেভিগেট করুন
                    onClose: () => navigate('/')
                });
            })
        })
    }



    return (
        <div className="mb-10 flex items-center gap-3 justify-center">
            <ToastContainer/>
            <button  className="bg-[#ff4321] text-[#fff] p-4 rounded-full">
                <FaGoogle onClick={handleGoogleSignIn}/>
            </button>
            <button className="bg-[#384c59] text-[#fff] p-4 rounded-full">
                <FaGithub />
            </button>
            <button className="bg-[#4c77ce] text-[#fff] p-4 rounded-full">
                <FaFacebookF />
            </button>
        </div>
    );
};

export default Google;