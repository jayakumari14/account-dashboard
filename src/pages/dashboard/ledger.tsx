import { useEffect, useState } from "react";

type Expense = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string; // or `Date` if you handle it as a Date object
};

const ViewLedger = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/expenses");
      const data = await response.json();

      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        throw new Error("API did not return an array");
      }
    } catch (err) {
      setError((err as Error).message);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ledger</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="border p-2">{expense.name}</td>
              <td className="border p-2">{expense.category}</td>
              <td className="border p-2">{expense.amount}</td>
              <td className="border p-2">
                {new Date(expense.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLedger;
