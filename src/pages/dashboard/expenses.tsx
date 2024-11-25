import { useState } from "react";
import axios from "axios";

const AddExpense = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Payload being sent:", form); // Debugging
      const response = await axios.post("/api/expenses", form, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        alert("Expense added successfully!");
        setForm({ name: "", category: "", amount: "", date: "" });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Axios error specific handling
        console.error("Server error:", error.response?.data);
        alert(`Error: ${error.response?.data.error || "Unknown server error"}`);
      } else if (error instanceof Error) {
        // General error handling
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Expense Name"
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
