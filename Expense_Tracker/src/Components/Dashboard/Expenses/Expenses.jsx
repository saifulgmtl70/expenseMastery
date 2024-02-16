import { useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Expenses = () => {

    const {user} = useAuth();
    const [ expenses, setExpenses ] = useState([]);
    const axiosPublic = useAxiosPublic();
    // const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() =>{
        axiosPublic.get(`/expenses/?email=${user?.email}`)
        .then(res => {
            setExpenses(res.data);
        })
    },[])



    const handleDeleteIncom = id => {
        axiosPublic.delete(`/expenses/${id}`)
        .then(res => {
            if (res.data.deletedCount > 0) {
                // Filter out the deleted income item from the state
                const updatedIncomes = expenses.filter(item => item._id !== id);
                setExpenses(updatedIncomes);
                toast.success(`Income history of has been deleted`, {
                    position: "top-center",
                    autoClose: 1000,
                    onClose: () => navigate('/dashboard/expenses')
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
                                    <th className="px-4 py-3">Expense Category</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Payment Method</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {
                                    expenses.map((expense) =>(
                                        <tr key={expense._id} className="text-gray-700">
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    
                                                    <div>
                                                        <p className="font-semibold text-black">{user.displayName}</p>
                                                        
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-ms font-semibold border"> {user.email} </td>
                                            <td className="px-4 py-3 text-xs border">
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {expense.expenseCategory} </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm border">{expense.expnseAmount}</td>
                                            <td className="px-4 py-3 text-sm border">{expense.paymentMethod}</td>
                                            <td className="px-4 py-3 text-sm border">{expense.date}</td>
                                            <td className="px-4 py-2 text-sm border">
                                                <div className="flex gap-2">
                                                    <Link to={`/dashboard/updateexpense/${expense._id}`} >
                                                        <FaEdit className="text-[18px] text-green-600"/>
                                                    </Link>
                                                    <button  onClick={() => handleDeleteIncom(expense._id)}>
                                                        <FaTrashCan className="text-[18px] text-red-500"/>
                                                    </button>
                                                </div>
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

export default Expenses;