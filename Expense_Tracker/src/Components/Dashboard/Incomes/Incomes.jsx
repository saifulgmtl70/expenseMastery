import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";


const Incomes = () => {

    const {user} = useAuth();
    const [ income, setIncomes ] = useState([]);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() =>{
        axiosPublic.get(`/incomes/?email=${user?.email}`)
        .then(res => {
            setIncomes(res.data);
        })
    },[])



    const handleDeleteIncom = id => {
        axiosSecure.delete(`/incomes/${id}`)
        .then(res => {
            if (res.data.deletedCount > 0) {
                // Filter out the deleted income item from the state
                const updatedIncomes = income.filter(item => item._id !== id);
                setIncomes(updatedIncomes);
                toast.success(`Income history of ${income.incomeSource} has been deleted`, {
                    position: "top-center",
                    autoClose: 1000,
                    onClose: () => navigate('/dashboard/incomes')
                });
            }
        })
        .catch(error => {
            console.error('Error deleting income:', error);
            // Handle error if necessary
        });
    }
    
    


    return (
        <section>
            <ToastContainer/>
            <div className="text-center mt-8 mb-14">
                <span className='text-[#ff4321] text-[18px]'>Let's See</span>
                <h2 className='text-[#122033] text-[30px] font-bold font_andika'>Your Incomes History</h2>
            </div>



            <div className="container mx-auto p-6 font-mono">
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">

                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Income Source</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {
                                    income.map((income) =>(
                                        <tr key={income._id} className="text-gray-700">
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    
                                                    <div>
                                                        <p className="font-semibold text-black">{user.displayName}</p>
                                                        
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-ms font-semibold border"> {user.email} </td>
                                            <td className="px-4 py-3 text-xs border">
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {income.incomeSource} </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm border">{income.amount}</td>
                                            <td className="px-4 py-3 text-sm border">{income.date}</td>
                                            <td className="px-4 py-2 text-sm  flex my-1 gap-2">
                                                <Link to={`/dashboard/updateincome/${income._id}`}>
                                                        <FaEdit className="text-[18px] text-green-600"/>
                                                </Link>
                                                <button onClick={() => handleDeleteIncom(income._id)}>
                                                    <FaTrashCan className="text-[18px] text-red-500"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>






        </section>
    );
};

export default Incomes;