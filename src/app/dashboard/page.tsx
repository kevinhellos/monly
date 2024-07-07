"use client"

import { Plus } from "lucide-react";
import Link from "next/link";
import { useGetAllExpenses } from "../(hooks)/useGetAllExpenses";
import { useCallback, useEffect, useState } from "react";
import ExpenseCard from "../(components)/ExpenseCard";
import NoExpense from "../(components)/NoExpense";
import { useSearchParams, useRouter } from "next/navigation";

const Dashboard = () => {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const todaysDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const router = useRouter();
    const searchParams = useSearchParams();
 
    const filter = searchParams.get("filter");
    const [selectedFilter, setSelectedFilter] = useState<string|null>(filter || "all");

    const getAllExpenses = useGetAllExpenses;

    const [expenses, setExpenses] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noExpenses, setNoExpenses] = useState<boolean>(false);

    const getAllExpensesData = useCallback(async () => {
        setIsLoading(true);
        const allExpenses = await getAllExpenses();
    
        if (allExpenses.length < 1) {
          setIsLoading(false);
          setNoExpenses(true);
          return;
        }
    
        if (selectedFilter === "today") {
          const filteredExpenses = allExpenses.filter(checkIsTodaysExpense);
          setExpenses(filteredExpenses);
        } else {
          setExpenses(allExpenses);
        }
    
        setIsLoading(false);
      }, [selectedFilter, getAllExpenses]);
    
      const checkIsTodaysExpense = (expense: any) => {
        return expense.date === todaysDate;
      };
    
      useEffect(() => {
        getAllExpensesData();
      }, [selectedFilter, getAllExpensesData]);

    return (
        <>
            <h1 className="text-2xl font-sans mt-10 mb-5 text-center">My expenses</h1>

            <div className="filter-container">
                <div 
                    className={`text-md mb-5 badge p-3 px-5 ${selectedFilter == "all" ? "bg-black text-white active:bg-black focus:bg-black hover:bg-black " : "hover:bg-gray-100"} py-4 cursor-pointer me-3 border border-gray-200  shadow-sm font-sans`}
                    onClick={() => {
                        setSelectedFilter("all");
                        router.push("/dashboard?filter=all");
                    }}
                >
                    All expenses
                </div>
                <div 
                    className={`text-md mb-5 badge p-3 px-5 ${selectedFilter == "today" ? "bg-black text-white  active:bg-black focus:bg-black hover:bg-black " : "hover:bg-gray-100"} py-4 cursor-pointer me-3 border border-gray-200 shadow-sm font-sans`}
                    onClick={() => {
                        setSelectedFilter("today");
                        router.push("/dashboard?filter=today");
                    }}
                >
                    Today
                </div>
            </div>

            {expenses.map((expense => (
                <ExpenseCard
                    key={expense.id}
                    name={expense.name}
                    amount={expense.amount}
                    category={expense.category}
                    date={expense.date}
                />
            )))}

            {isLoading ? (
                <>
                    <div className="skeleton h-24 w-full rounded-lg mb-5"></div>
                </>
            ) : (
                noExpenses && <NoExpense/>
            )}

            <div className="text-center">
                <Link 
                    href="/dashboard/add"
                    className="mt-0 btn bg-[#5AE4A6] hover:bg-[#28704F] hover:text-white border-none font-sans font-medium rounded-full px-10 shadow-lg w-full">
                    <Plus size={20}/>
                    Add expense
                </Link>
            </div>
        </>
    );
}
 
export default Dashboard;