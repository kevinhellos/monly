"use client"

import { useAddExpense } from "@/app/(hooks)/useAddExpense";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function AddExpense() {

  const router = useRouter();

  const expenseCategoryData = [
    { id: 1, name: "Food" },
    { id: 2, name: "Transport" },
    { id: 3, name: "Groceries" },
    { id: 4, name: "Entertainment" },
    { id: 5, name: "Travel" },
    { id: 6, name: "Shopping" },
    { id: 7, name: "Others" },
  ];

  const expenseNameInput = useRef<HTMLInputElement>(null);
  const [expenseName, setExpenseName] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number|null>();
  const [expenseCategory, setExpenseCategory] = useState<string>("Food");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addNewExpense = useAddExpense;

  async function addNewExpenseData() {
    if (expenseName.trim() !== "" && expenseAmount! > 0) {
        setIsLoading(true);
        try {
            const newExpense = await addNewExpense(expenseName, expenseAmount!, expenseCategory);
            if (newExpense) {
                setIsLoading(false);
                // toast.success("Expense added successfully");
                router.push("/dashboard");
                // setTimeout(function(){
                //     router.push("/dashboard");
                // }, 1500);
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.error(`Error: ${error}`);
            console.error(error);
        }
    }
    else {
        toast.error("There is an error in data entered");
    }
  }

  useEffect(() => {
    expenseNameInput?.current?.focus();
  }, []);

  return (
    <>
        <Toaster/>

        <div className="px-10 py-5 mt-5 rounded-2xl">
            <Link
                href="/dashboard"
                className="btn btn-sm btn-ghost font-sans hover:bg-gray-100 ms-[-25px]"
            >
                <ArrowLeft size={20}/>
            </Link>
            <h1 className="text-2xl font-sans text-center mt-[-30px] mb-10">Add expense</h1>
            
            <label htmlFor="name" className="text-gray-400 text-sm">Name</label>
            <input
                type="text"
                name="name"
                placeholder="E.g. groceries"
                className="input w-full bg-gray-50 placeholder:text-gray-300 focus:outline-[#28704F] rounded-md mb-5"
                onChange={(e) => setExpenseName(e.target.value)}
                value={expenseName}
                ref={expenseNameInput}
            />

            <label htmlFor="amount" className="text-gray-400 text-sm">Amount</label>
            <input
                type="number"
                name="amount"
                placeholder="E.g. $3"
                className="input w-full bg-gray-50 placeholder:text-gray-300 focus:outline-[#28704F] rounded-md mb-5"
                onChange={(e) => {
                    const amount = parseInt(e.target.value);
                    if (!isNaN(amount)) {
                        setExpenseAmount(amount);
                    }
                }}
                min={0}
                max={9999}
            />
            
            <label htmlFor="category" className="text-gray-400 text-sm">Category</label>
            <select name="category" className="select w-full  bg-gray-50 placeholder:text-gray-300 focus:outline-[#28704F]"
                onChange={(e) => setExpenseCategory(e.target.value)}
                value={expenseCategory}
            >
                {expenseCategoryData.map((category) => (
                    <option 
                        key={category.id}
                        value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            <div className="text-center">
                <button 
                    type="button"
                    className="mt-5 btn bg-[#5AE4A6] hover:bg-[#28704F] hover:text-white border-none font-sans font-medium rounded-full px-10 shadow-lg w-full max-auto mb-5"
                    onClick={addNewExpenseData}
                    disabled={isLoading}
                    >
                    Add expense
                </button>
            </div>
        </div>
    </>
  )
}

export default AddExpense;
