import { useState, useEffect } from "react";
import "./Form.css";

function Supplier() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ supp_name: "", contact: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8080/api/supplier")
      .then((res) => res.json())
      .then(setList);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/supplier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ supp_name: "", contact: "" });
      fetchData();
    });
  };

  return (
    <>
      <h2>Supplier</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="supp_name"
          placeholder="Supplier Name"
          value={form.supp_name}
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>

      <hr />

      {list.map((s) => (
        <div key={s.supp_id}>{s.supp_name}</div>
      ))}
    </>
  );
}

export default Supplier;
