import { useState, useEffect } from "react";
import "./Form.css";

function Customer() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ cust_name: "", contact: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8080/api/customer")
      .then((res) => res.json())
      .then(setList);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(fetchData);
  };

  return (
    <>
      <h2>Customer</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="cust_name"
          placeholder="Customer Name"
          onChange={handleChange}
          required
        />
        <input name="contact" placeholder="Contact" onChange={handleChange} />
        <button>Add</button>
      </form>

      <hr />

      {list.map((c) => (
        <div key={c.cust_id}>{c.cust_name}</div>
      ))}
    </>
  );
}

export default Customer;
