import DashboardLayout from "../../components/DashboardLayout";

export default function AddExpense() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold">Add Expense</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="amount" className="block">
            Amount
          </label>
          <input id="amount" type="number" className="border p-2 w-full" />
        </div>
        <div>
          <label htmlFor="description" className="block">
            Description
          </label>
          <input id="description" type="text" className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </DashboardLayout>
  );
}
