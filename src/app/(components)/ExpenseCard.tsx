export default function ExpenseCard({ name, amount, category, date, } : 
  { name: string, amount: number, category: string, date: string }) {
  return (
    <div className="w-full border border-gray-200 py-3 px-5 rounded-lg flex justify-between mb-5">
      <span>
        <span className="font-medium">{name}</span>
        <span className="block text-xs text-gray-400">{date}</span>
        <span className="badge mt-3 text-xs">
          {category ?  category : 'No Category'}
        </span>
      </span>
      <span className="font-medium mt-5">$ {amount}</span>
    </div>
  );
}
