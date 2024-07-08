import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore"; 

export async function useDeleteExpense(id: string){
    try{
        const expense = doc(db, `Expenses/${String(auth?.currentUser?.uid)}/Data`, id);
        await deleteDoc(expense);
    }
    catch (error) {
        console.error(error);
    }
}