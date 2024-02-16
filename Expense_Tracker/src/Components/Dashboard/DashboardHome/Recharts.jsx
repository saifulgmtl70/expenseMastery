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
        fetch(`https://expense-tracker-server-lyart.vercel.app/incomes?email=${user?.email}`)
          .then((response) => response.json())
          .then((data) => {
            setIncomeData(data);
          })
          .catch((error) => console.error("Error fetching income data:", error));
    
        // Fetch expense data
        fetch(`https://expense-tracker-server-lyart.vercel.app/expenses?email=${user?.email}`)
          .then((response) => response.json())
          .then((data) => {
            setExpenseData(data);
          })
          .catch((error) => console.error("Error fetching expense data:", error));
    }, [user]); // Include 'user' in the dependency array to trigger useEffect on user change

    // Format income data
    const formattedIncomeData = incomeData.map((income) => ({
        name: `${income.incomeSource} (${new Date(income.date).toLocaleDateString()})`,
        value: income.amount,
    }));

    // Format expense data
    const formattedExpenseData = expenseData.map((expense) => ({
        name: `${expense.expenseCategory} (${new Date(expense.date).toLocaleDateString()})`,
        value: expense.expnseAmount,
    }));

    // Generating colors for categories
    const generateColors = (data) => {
        const colors = {};
        data.forEach((entry, index) => {
            colors[entry.name] = `#${index * 123456}`;
        });
        return colors;
    };

    // Colors for income categories
    const incomeColors = generateColors(formattedIncomeData);

    // Colors for expense categories
    const expenseColors = generateColors(formattedExpenseData);

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
                                {formattedIncomeData.map((entry, index) => (
                                    <Bar key={index} dataKey="value" fill={incomeColors[entry.name]} />
                                ))}
                            </BarChart>
                        </div>

                        <div>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={formattedIncomeData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                    fill="#8884d8" // Set a default color for Pie Chart
                                />
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>

                    </div>
                </div>
            )}

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
                                {formattedExpenseData.map((entry, index) => (
                                    <Bar key={index} dataKey="value" fill={expenseColors[entry.name]} />
                                ))}
                            </BarChart>
                        </div>

                        <div>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={formattedExpenseData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                    fill="#8884d8" // Set a default color for Pie Chart
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
