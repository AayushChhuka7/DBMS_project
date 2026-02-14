import { useState, useEffect } from "react";
import "./Form.css";

function Transaction() {
  const [staff, setStaff] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    staff_id: "",
    cust_id: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/staff")
      .then((r) => r.json())
      .then(setStaff);
    fetch("http://localhost:8080/api/customer")
      .then((r) => r.json())
      .then(setCustomers);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <>
      <h2>Transaction</h2>

      <form onSubmit={handleSubmit}>
        <select name="staff_id" onChange={handleChange} required>
          <option value="">Select Staff</option>
          {staff.map((s) => (
            <option key={s.staff_id} value={s.staff_id}>
              {s.staff_name}
            </option>
          ))}
        </select>

        <select name="cust_id" onChange={handleChange} required>
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.cust_id} value={c.cust_id}>
              {c.cust_name}
            </option>
          ))}
        </select>

        <button>Create Transaction</button>
      </form>
    </>
  );
}

export default Transaction;
