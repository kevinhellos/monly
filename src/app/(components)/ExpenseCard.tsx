export default function ExpenseCard({ name, amount, date } : { name: string, amount: number, date: string }) {
  return (
    <div className="w-full bg-gray-50 py-3 px-5 rounded-lg flex justify-between mb-5 shadow-sm">
        <span>
          <span className="font-medium">{name}</span>
          <span className="block text-xs text-gray-400">{date}</span>
        </span>
        <span className="font-medium mt-2">$ {amount}</span>
    </div>
  );
}
