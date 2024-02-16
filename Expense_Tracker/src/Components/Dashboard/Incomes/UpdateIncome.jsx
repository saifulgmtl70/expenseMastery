import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";

const UpdateIncome = () => {

    

    const incomes = useLoaderData();
    // console.log(incomes);
    const { _id, incomeSource, amount, date, description } = incomes;
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


    const onSubmitIncomeUpdate = async(data) =>{
        console.log(data);
    
        const incomeList = {
            incomeSource: data.incomeSource, // Change 'incomesource' to 'incomeSource'
            amount: parseInt(data.amount),
            date: data.date,
            description: data.description,
        }
    
        const menuRes = await axiosSecure.patch(`/incomes/${_id}`, incomeList);
        console.log(menuRes.data);
        if(menuRes.data.modifiedCount > 0){
            // Show Success Message
            reset();
            toast.success("Your Income history Updated", {
                position: "top-center",
                autoClose: 1000,
                onClose: () => navigate('/dashboard/incomes')
            });
        }
    }
    



    return (
        <section>
            <ToastContainer/>
            <div className="text-center mt-8 mb-14">
                <span className='text-[#ff4321] text-[18px]'>Let's Update</span>
                <h2 className='text-[#122033] text-[30px] font-bold font_andika'>Your Incomes History</h2>
            </div>


            <form onSubmit={handleSubmit(onSubmitIncomeUpdate)} className="w-full lg:w-9/12 mx-auto">

                <div className="mb-6">
                    <select defaultValue={incomeSource} {...register('incomeSource', { required: true })} className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary">
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
                    <input type="number"  {...register('amount', { required: true })} defaultValue={amount} placeholder="Amount"  name="amount" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
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
                    <textarea {...register('description', { required: true })} defaultValue={description} name="description" placeholder="Description" id="" cols="30" rows="10" className="w-full rounded-md border bordder- [#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary resize-none" >
                    </textarea>

                </div>

                <div className="mb-10">
                    <input type="submit" value="Update Inczome" className=" w-full rounded-md border bordder-primary py-3 px-5 bg-[#F7A582] text-base text-white cursor-pointer hover:bg-opacity-90 transition "
                    />
                </div>

            </form>


        </section>
    );
};

export default UpdateIncome;