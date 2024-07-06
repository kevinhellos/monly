import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore"; 

export async function useAddExpense(name: string, amount: number){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: getMonth() returns zero-based index (0 for January)
    const day = currentDate.getDate();
    
    // Formatted current date as string (e.g., "2024-07-07")
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    const newExpense = await addDoc(collection(db, `/Expenses/${auth?.currentUser?.uid}/Data`), {
        name,
        amount,
        date: formattedDate,
    });
    return newExpense.id;
}