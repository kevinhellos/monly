import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore"; 

export async function useGetAllExpenses(): Promise<any[]>{
    let allExpenses: any[] = [];
    const expensesCollection = collection(db, `Expenses/${auth?.currentUser?.uid}/Data`);
    try{
        const data = await getDocs(expensesCollection);
        allExpenses = data.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            amount: doc.data().amount,
            date: doc.data().date
        }));
    } 
    catch (error) {
        console.error(`Error: failed to get all expenses from the database\n${error}`);
    }
    return allExpenses;
}