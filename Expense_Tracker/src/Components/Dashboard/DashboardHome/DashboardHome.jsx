import React from 'react';
import Recharts from './Recharts';

const DashboardHome = () => {



    return (
        <section className='px-12 py-10'>

            <div className="text-center mb-14">
                <span className='text-[#ff4321] text-[18px]'>Let's See</span>
                <h2 className='text-[#122033] text-[30px] font-bold font_andika'>Your Incomes & Expense History</h2>
            </div>

         

            <Recharts/>

        </section>
    );
};

export default DashboardHome;