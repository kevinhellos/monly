import { EllipsisVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExpenseCard(
  { id, name, amount, category, date, deleteExpense, getAllExpensesData } : 
  { id: string, name: string, amount: number, category: string, date: string, deleteExpense: (id: string) => void, getAllExpensesData: () => Promise<void> }
) {

  const router = useRouter();

  return (
    <div className="w-full border border-gray-200 hover:bg-gray-50 hover:cursor-pointer shadow-sm py-3 px-5 rounded-lg flex justify-between mb-5">
      <span>
        <span className="font-medium">{name}</span>
        <span className="block text-xs text-gray-400">{date}</span>
        <span className="badge mt-3 text-xs">
          {category ?  category : 'No Category'}
        </span>
      </span>
      <span className="mt-5 flex">
        <span className="font-medium text-xl me-5">$ {amount}</span>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle btn-sm btn-ghost rounded-full mt-[-1px]">
            <EllipsisVertical size={20}/>
          </div>
          <ul tabIndex={0} className="dropdown-content mt-5 menu bg-base-100 rounded-md border z-[1] w-52 p-1 shadow">
            <li>
              <a 
                className="rounded-[0.235rem] text-sm hover:text-red-600 hover:bg-gray-100"
                onClick={ () => {
                  deleteExpense(id);
                  // getAllExpensesData();
                  router.refresh();
                }}
              >
                <Trash2 size={15} className="me-1"/>
                Delete
              </a>
            </li>
          </ul>
        </div>

      </span>
    </div>
  );
}
