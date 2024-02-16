import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const IncExp = () => {

    const [activeTab, setActiveTab] = useState("income");

    const [selectedDate, setSelectedDate] = useState(null);

    const { register, handleSubmit, reset, setValue  } = useForm();
    // const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();


    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };



   
   
   // Onsubmit of Income accounting
    const onSubmitIncome = async(data) =>{
        console.log(data);

        const incomeList = {
            email: user.email,
            incomeSource: data.incomesource,
            amount: parseInt(data.amount),
            date: data.date,
            description: data.description,
        }

        const menuRes = await axiosPublic.post('/incomes', incomeList);
        console.log(menuRes.data);
        if(menuRes.data.insertedId){
            // Show Success Message
            reset();
            toast.success("Your Income history addedd", {
                position: "top-center",
                autoClose: 1000, // এক সেকেন্ডের মধ্যে বন্ধ হবে
                 // টোস্ট বন্ধ হওয়ার পরে নেভিগেট করুন
                onClose: () => navigate('/dashboard/incomes')
            });
        }
    }

    // Onsubmit of Income accounting
    const onSubmitExpense = async(data) =>{
        console.log(data);

        
        const expenseList = {
            email: user.email,
            expenseCategory: data.expensecategory,
            expnseAmount: parseInt(data.expnseamount),
            date: data.date,
            paymentMethod: data.paymentmethod,
            description: data.Description,
        }

        const menuRes = await axiosPublic.post('/expenses', expenseList);
        console.log(menuRes.data);
        if(menuRes.data.insertedId){
            // Show Success Message
            reset();
            toast.success("Your Expense history addedd", {
                position: "top-center",
                autoClose: 1000, // এক সেকেন্ডের মধ্যে বন্ধ হবে
                 // টোস্ট বন্ধ হওয়ার পরে নেভিগেট করুন
                onClose: () => navigate('/dashboard/expenses')
            });
        }



        
    }




    return (
        <section className="px-3 lg:px-12 py-10 bg-[#f8f6f6]">
            <ToastContainer/>
           <div className="text-center mb-12">
                <span className='text-[#ff4321] font_nanum text-[19px]'>Manage Your Budget</span>
                <h2 className='text-[#122033] text-[34px] font_andika text-center font-bold leading-[66px]'> Track Your Financial Wellness</h2>
           </div>


           <div className="w-full lg:w-11/12 mx-auto p-3 lg:p-7 bg-[#fff] rounded-[5px]">
            {/* Tabs */}
                <div className="flex justify-normal text-center gap-3 lg:justify-between overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                    <button
                    onClick={() => handleTabClick("income")}
                    className={`inline-flex  items-center w-full h-[65px] font-bold px-4 text-sm text-center ${
                        activeTab === "income"
                        ? "text-[#fff] bg-[#F7A582] hover:text-[#fff] hover:bg-[#F7A582]"
                        : "text-[#3f3a3a] hover:text-[#fff] hover:bg-[#F7A582]"
                    } border-b-2 rounded-tl-[5px] sm:text-base whitespace-nowrap focus:outline-none`}
                    >
                    Income
                    </button>

                    {/* Add similar onClick handlers for other tabs */}
                    <button
                    onClick={() => handleTabClick("expense")}
                    className={`inline-flex items-center w-full h-[65px] font-bold px-4 text-sm text-center ${
                        activeTab === "expense"
                        ? "text-[#fff] bg-[#F7A582] hover:text-[#fff] hover:bg-[#F7A582]"
                        : "text-[#3f3a3a] hover:text-[#fff] hover:bg-[#F7A582]"
                    } border-b-2 rounded-tl-[5px] sm:text-base whitespace-nowrap focus:outline-none`}
                    >
                    Expense
                    </button>

                    
                </div>

            {/* Content based on active tab */}
            {activeTab === "income" && (
                <div className="mt-4">
                    <h2 className="text-[20px] text-center mb-8 text-[#3B3A3A] font-[700] ">Income Tracking</h2>
                    <form onSubmit={handleSubmit(onSubmitIncome)} className="w-full lg:w-9/12 mx-auto">

                        <div className="mb-6">
                            <select defaultValue="default" {...register('incomesource')} name="incomesource" id="" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary">
                                <option disabled value="default">Select Income Cateory</option>
                                <option name="Salary" id="">Salary</option>
                                <option name="Freelance Work" id="">Freelance Work</option>
                                <option name="Investments" id="">Investments</option>
                                <option name="Grants" id="">Grants</option>
                                <option name="Business" id="">Business</option>
                                <option name="Real Estate Sales" id="">Real Estate Sales</option>
                                <option name="E-commerce Sales" id="">E-commerce Sales</option>
                                <option name="Web Development/Design" id="">Grants</option>
                                <option name="Event Planning" id="">Event Planning</option>
                                <option name="Coaching/Training" id="">Coaching/Training</option>
                                <option name="Photography/Videography" id="">Photography/Videography</option>
                                <option name="Rental Property" id="">Rental Property</option>
                                <option name="Online Sales" id="">Online Sales</option>
                                <option name="Part-time Job" id="">Part-time Job</option>
                                <option name="Consulting Fees" id="">Consulting Fees</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <input type="number" placeholder="Amount"  {...register('amount')} name="amount" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                            />
                        </div>

                        <div className="mb-6">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                    handleDateChange(date);
                                    setValue('date', date); // assuming 'date' is the name of your input field
                                }}
                                filterDate={isWeekday}
                                minDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                                placeholderText='Pick a Date'
                                className="w-full md:w-[830px] lg:w-[830px] rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                            />

                        </div>



                        <div className="mb-6">
                            <textarea  {...register('description')} name="description" placeholder="Description" id="" cols="30" rows="10" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary resize-none" >
                            </textarea>

                        </div>

                        <div className="mb-10">
                            <input type="submit" value="Submit" className=" w-full rounded-md border bordder-primary py-3 px-5 bg-[#F7A582] text-base text-white cursor-pointer hover:bg-opacity-90 transition "
                            />
                        </div>

                    </form>

                    
                </div>
            )}

            {activeTab === "expense" && (
                <div className="mt-4">
                    <h2 className="text-[20px] text-center mb-8 text-[#3B3A3A] font-[700] ">Expense Tracking</h2>
                    <form onSubmit={handleSubmit(onSubmitExpense)} className="w-full lg:w-9/12 mx-auto">

                        <div className="mb-6">
                            <select defaultValue="default" {...register('expensecategory')} name="expensecategory" id="" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary">
                                <option disabled value="default">Select Expense Cateory</option>
                                <option name="Groceries" id="">Groceries</option>
                                <option name="Rent" id="">Rent</option>
                                <option name="Utilities" id="">Utilities</option>
                                <option name="Transportation" id="">Transportation</option>
                                <option name="Entertainment" id="">Entertainment</option>
                                <option name="Education" id="">Education</option>
                                <option name="Insurance" id="">Insurance</option>
                                <option name="Childcare" id="">Childcare</option>
                                <option name="Pet Care" id="">Pet Care</option>
                                <option name="Gifts" id="">Gifts</option>
                                <option name="Dining Out" id="">Dining Out</option>
                                <option name="Clothing/Personal Accessories" id="">Clothing/Personal Accessories</option>
                                <option name="Subscriptions/Memberships" id="">Subscriptions/Memberships</option>
                                <option name="Charitable Donations" id="">Charitable Donations</option>
                                <option name="Travel/Vacation" id="">Travel/Vacation</option>
                                <option name="Home Maintenance/Repairs" id="">Home Maintenance/Repairs</option>
                                <option name="Personal Care" id="">Personal Care</option>
                                <option name="Utilities" id="">Utilities</option>
                                <option name="Healthcare/Medical" id="">Healthcare/Medical</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <input type="number" placeholder="Amount" {...register('expnseamount')}  name="expnseamount" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                            />
                        </div>

                        <div className="mb-6">

                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                    handleDateChange(date);
                                    setValue('date', date); // assuming 'date' is the name of your input field
                                }}
                                filterDate={isWeekday}
                                minDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                                placeholderText='Pick a Date'
                                className="w-full md:w-[830px] lg:w-[830px] rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                            />



                        </div>

                        <div className="mb-6">
                            <select defaultValue="default" {...register('paymentmethod')} name="paymentmethod" id="" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary">
                                <option disabled value="default">Select Payment Method</option>
                                <option name="Cash" id="">Cash</option>
                                <option name="Bkash" id="">Bkash</option>
                                <option name="Nogod" id="">Nogod</option>
                                <option name="Credit Card" id="">Credit Card</option>
                                <option name=" Debit Card" id=""> Debit Card</option>
                            </select>
                        </div>


                        <div className="mb-6">
                            <textarea name="description" {...register('Description')} placeholder="Description" id="" cols="30" rows="10" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary resize-none" >
                            </textarea>

                        </div>

                        <div className="mb-10">
                            <input type="submit" value="Submit" className=" w-full rounded-md border bordder-primary py-3 px-5 bg-[#F7A582] text-base text-white cursor-pointer hover:bg-opacity-90 transition "
                            />
                        </div>
                    </form>


                </div>
            )}

            
            </div>

        </section>
    );
};

export default IncExp;