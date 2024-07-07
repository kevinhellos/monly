"use client"

import { Plus } from "lucide-react";
import Link from "next/link";
import { useGetAllExpenses } from "../(hooks)/useGetAllExpenses";
import { useEffect, useState } from "react";
import ExpenseCard from "../(components)/ExpenseCard";
import NoExpense from "../(components)/NoExpense";

const Dashboard = () => {

    const getAllExpenses = useGetAllExpenses;

    const [expenses, setExpenses] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noExpenses, setNoExpenses] = useState<boolean>(false);

    async function getAllExpensesData() {
        setIsLoading(true);
        const expenses = await getAllExpenses();
        if (expenses.length < 1) {
            setIsLoading(false);
            setNoExpenses(true);
        }
        else {
            setIsLoading(false);
        }
        setExpenses(expenses);
    }

    useEffect(() => {
        getAllExpensesData();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-sans mt-10 mb-10 text-center">My expenses</h1>

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
                    <div className="skeleton h-16 w-full rounded-lg mb-5"></div>
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