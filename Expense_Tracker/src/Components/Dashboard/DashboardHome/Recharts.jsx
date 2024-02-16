import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { PieChart, Pie, Legend } from "recharts";

const Recharts = () => {

    const [activeTab, setActiveTab] = useState("incomes");

    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);


    const { user } = useAuth();


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        // Fetch income data
        fetch(`https://expense-tracker-server-xi.vercel.app/incomes?email=${user?.email}`)
          .then((response) => response.json())
          .then((data) => {
            setIncomeData(data);
          })
          .catch((error) => console.error("Error fetching income data:", error));
    
        // Fetch expense data
        fetch(`https://expense-tracker-server-xi.vercel.app/expenses?email=${user?.email}`)
          .then((response) => response.json())
          .then((data) => {
            setExpenseData(data);
          })
          .catch((error) => console.error("Error fetching expense data:", error));
    }, []);

    // Format income data
    const formattedIncomeData = incomeData.map((income) => ({
        date: new Date(income.date).toLocaleDateString(),
        name: `${income.incomeSource} (${income.date})`,
        value: income.amount,
    }));

    // Format expense data
    const formattedExpenseData = expenseData.map((expense) => ({
        date: new Date(expense.date).toLocaleDateString(),
        name: `${expense.expenseCategory} (${expense.date})`,
        value: expense.expnseAmount,
    }));


    return (
        <div className="w-full px-3 lg:px-8 py-6 bg-[#fff]">
            <div className="flex justify-normal text-center gap-3 lg:justify-between overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                <button
                onClick={() => handleTabClick("incomes")}
                className={`inline-flex  items-center w-full h-[65px] font-bold px-4 -mb-px text-sm text-center ${
                    activeTab === "incomes"
                    ? "text-[#fff] bg-[#5AB9C1] hover:text-[#fff] hover:bg-[#8884D8]"
                    : "text-[#3f3a3a] hover:text-[#fff] hover:bg-[#8884D8]"
                } border-b-2 rounded-tl-[5px] sm:text-base whitespace-nowrap focus:outline-none`}
                >
                Incomes
                </button>

                {/* Add similar onClick handlers for other tabs */}
                <button
                onClick={() => handleTabClick("expenses")}
                className={`inline-flex items-center w-full h-[65px] font-bold px-4 -mb-px text-sm text-center ${
                    activeTab === "expenses"
                    ? "text-[#fff] bg-[#5AB9C1] hover:text-[#fff] hover:bg-[#82CA9D]"
                    : "text-[#3f3a3a] hover:text-[#fff] hover:bg-[#82CA9D]"
                } border-b-2 rounded-tl-[5px] sm:text-base whitespace-nowrap focus:outline-none`}
                >
                Expense
                </button>

                
            </div>

            {/* Content based on active tab */}
            {activeTab === "incomes" && (
                <div className="mt-4">
                    <h2 className="text-center text-[20px] text-[#666] font-[600]">Income Distribution</h2>
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <div>
                            <BarChart width={350} height={400} data={formattedIncomeData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </div>

                        <div>
                            <PieChart width={400} height={400}>
                                <Pie
                                data={ formattedIncomeData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                fill="#8884D8"
                                outerRadius={100}
                                label
                                />
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>

                    </div>
                </div>
            )}


            
            {/* Content based on active tab */}
            {activeTab === "expenses" && (
                <div className="mt-4">
                    <h2 className="text-center text-[20px] text-[#666] font-[600]">Expense Distribution</h2>
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <div>
                            <BarChart width={350} height={400} data={formattedExpenseData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#82CA9D" />
                            </BarChart>
                        </div>

                        <div>
                            <PieChart width={400} height={400}>
                                <Pie
                                data={ formattedExpenseData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                fill="#82CA9D"
                                outerRadius={100}
                                label
                                />
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>

                    </div>
                </div>
            )}



        </div>
    );
};

export default Recharts;
