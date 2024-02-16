import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";

const UpdateExpense = () => {

    const expenses = useLoaderData();
    // console.log(incomes);
    const { _id, expenseCategory, expnseAmount, date, paymentMethod, description } = expenses;
    console.log(_id);

    const [selectedDate, setSelectedDate] = useState(null);

    const { register, handleSubmit, reset, setValue  } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const onSubmitExpenseUpdate = async(data) =>{
        console.log(data);
    
        const expenseList = {
            expenseCategory: data.expenseCategory, // Change 'incomesource' to 'incomeSource'
            expnseAmount: parseInt(data.expnseAmount),
            date: data.date,
            paymentMethod: data.paymentMethod,
            description: data.description,
        }
    
        const menuRes = await axiosSecure.patch(`/expenses/${_id}`, expenseList);
        console.log(menuRes.data);
        if(menuRes.data.modifiedCount > 0){
            // Show Success Message
            reset();
            toast.success("Your Expense history has been Updated", {
                position: "top-center",
                autoClose: 1000,
                onClose: () => navigate('/dashboard/expenses')
            });
        }
    }
    


    return (
        <section>
            <ToastContainer/>

            <div className="text-center mt-8 mb-14">
                <span className='text-[#ff4321] text-[18px]'>Let's Update</span>
                <h2 className='text-[#122033] text-[30px] font-bold font_andika'>Your Expense History</h2>
            </div>


            <form onSubmit={handleSubmit(onSubmitExpenseUpdate)}  className="w-full lg:w-9/12 mx-auto">

                <div className="mb-6">
                    <select defaultValue={expenseCategory} {...register('expenseCategory', { required: true })}  name="expenseCategory" id="" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary">
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
                    <input type="number" placeholder="Amount" defaultValue={expnseAmount} {...register('expnseAmount', { required: true })}  name="expnseAmount" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                    />
                </div>

                <div className="mb-6">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                            handleDateChange(date);
                            setValue('date', date); // assuming 'date' is the name of your input field
                        }}
                        defaultValue={date}
                        filterDate={isWeekday}
                        minDate={new Date()}
                        dateFormat="MMMM d, yyyy"
                        placeholderText='Pick a Date'
                        className="w-full md:w-[830px] lg:w-[830px] rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                    />



                </div>

                <div className="mb-6">
                    <select defaultValue={paymentMethod} {...register('paymentMethod', { required: true })}  name="paymentMethod" id="" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary">
                        <option disabled value="default">Select Payment Method</option>
                        <option name="Cash" id="">Cash</option>
                        <option name="Bkash" id="">Bkash</option>
                        <option name="Nogod" id="">Nogod</option>
                        <option name="Credit Card" id="">Credit Card</option>
                        <option name=" Debit Card" id=""> Debit Card</option>
                    </select>
                </div>


                <div className="mb-6">
                    <textarea name="description" defaultValue={description} {...register('description', { required: true })}  placeholder="Description" id="" cols="30" rows="10" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary resize-none" >
                    </textarea>

                </div>

                <div className="mb-10">
                    <input type="submit" value="Submit" className=" w-full rounded-md border bordder-primary py-3 px-5 bg-[#F7A582] text-base text-white cursor-pointer hover:bg-opacity-90 transition "
                    />
                </div>

            </form>

        </section>
    );
};

export default UpdateExpense;