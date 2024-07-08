import { getTodaysDateFormatted } from "../(utils)/utils";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore"; 

export async function useAddExpense(name: string, amount: number, category: string){

    const formattedDate = getTodaysDateFormatted();
    
    const newExpense = await addDoc(collection(db, `/Expenses/${auth?.currentUser?.uid}/Data`), {
        timestamp: String(Date.now()),
        name,
        amount,
        category,
        date: formattedDate,
    });
    return newExpense.id;
}