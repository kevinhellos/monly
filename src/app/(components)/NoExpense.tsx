export default function NoExpense() {
  return (
    <div className="mt-[10vh] text-center">
      <img
        src="/assets/imgs/no-expense.png"
        width={175}
        alt="No expenses yet"
        className="mx-auto"
      />
      <div className="mt-5 text-gray-400 mb-5">
        You have no expenses yet
      </div>
    </div>
  );
}
