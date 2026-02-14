import { useState, useEffect } from "react";
import "./Form.css";

function TransactionItems() {
  const [transactions, setTransactions] = useState([]);
  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    tran_id: "",
    batch_no: "",
    quantity_sold: "",
    item_price: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/transaction")
      .then((r) => r.json())
      .then(setTransactions);
    fetch("http://localhost:8080/api/batch")
      .then((r) => r.json())
      .then(setBatches);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/transaction-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <>
      <h2>Transaction Items</h2>

      <form onSubmit={handleSubmit}>
        <select name="tran_id" onChange={handleChange} required>
          <option value="">Select Transaction</option>
          {transactions.map((t) => (
            <option key={t.tran_id} value={t.tran_id}>
              {t.tran_id}
            </option>
          ))}
        </select>

        <select name="batch_no" onChange={handleChange} required>
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.batch_no} value={b.batch_no}>
              {b.batch_no}
            </option>
          ))}
        </select>

        <input
          name="quantity_sold"
          type="number"
          placeholder="Quantity"
          onChange={handleChange}
          required
        />
        <input
          name="item_price"
          type="number"
          placeholder="Item Price"
          onChange={handleChange}
          required
        />

        <button>Add Item</button>
      </form>
    </>
  );
}

export default TransactionItems;
