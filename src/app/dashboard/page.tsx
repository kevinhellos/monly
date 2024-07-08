"use client"

import { Plus } from "lucide-react";
import Link from "next/link";
import { useGetAllExpenses } from "../(hooks)/useGetAllExpenses";
import { useCallback, useEffect, useState } from "react";
import ExpenseCard from "../(components)/ExpenseCard";
import NoExpense from "../(components)/NoExpense";
import { useSearchParams, useRouter } from "next/navigation";
import { getTodaysDateFormatted } from "../(utils)/utils";
import { useDeleteExpense } from "../(hooks)/useDeleteExpense";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {

    const todaysDate = getTodaysDateFormatted();

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
    
        let expensesToSet = allExpenses;
    
        if (selectedFilter === "today") {
            expensesToSet = allExpenses.filter(checkIsTodaysExpense);
        }
    
        // Sort expenses by timestamp, latest on top
        expensesToSet.sort((a, b) => b.timestamp - a.timestamp);
    
        setExpenses(expensesToSet);
        setIsLoading(false);
    }, [selectedFilter, getAllExpenses]);
    
    
    const checkIsTodaysExpense = (expense: any) => {
        return expense.date === todaysDate;
    };
    
    useEffect(() => {
        getAllExpensesData();
    }, [selectedFilter, getAllExpensesData]);

    const deleteExpense = useDeleteExpense;
    const deleteExpenseData = useCallback(async (id: string) => {
        setIsLoading(true);

        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
    
        try {
            await deleteExpense(id);
            toast.success("Deleted");
            await getAllExpensesData();
        } catch (error) {
            console.error("Failed to delete expense", error);
        }
    
        setIsLoading(false);
    
        if (expenses.length === 1) {
            router.refresh();
        }
    }, [deleteExpense, getAllExpensesData, expenses.length]);
    
    
    return (
        <>
            <Toaster/>
            <h1 className="text-2xl font-sans mt-10 mb-5 text-center">My expenses</h1>

            <div className="filter-container">
                <div 
                    className={`text-md mb-5 badge ${selectedFilter == "all" ? "black-badge " : "hover:bg-gray-100"} filter-badge`}
                    onClick={() => {
                        setSelectedFilter("all");
                        router.push("/dashboard?filter=all");
                    }}
                >
                    All expenses
                </div>
                <div 
                    className={`text-md mb-5 badge ${selectedFilter == "today" ? "black-badge" : "hover:bg-gray-100"} filter-badge`}
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
                    id={expense.id}
                    name={expense.name}
                    amount={expense.amount}
                    category={expense.category}
                    date={expense.date}
                    deleteExpense={deleteExpenseData}
                    getAllExpensesData={getAllExpensesData}
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
                    className="mt-0 btn btn-green">
                    <Plus size={20}/>
                    Add expense
                </Link>
            </div>
        </>
    );
}
 
export default Dashboard;