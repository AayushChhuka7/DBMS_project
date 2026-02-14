import { useState, useEffect } from "react";
import "./Form.css";

function Staff() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    staff_name: "",
    salary: "",
    address: "",
    contact: "",
    gender: "Male",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8080/api/staff")
      .then((res) => res.json())
      .then(setList);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      fetchData();
    });
  };

  return (
    <>
      <h2>Staff</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="staff_name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="salary"
          placeholder="Salary"
          type="number"
          onChange={handleChange}
        />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="contact" placeholder="Contact" onChange={handleChange} />
        <select name="gender" onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <button>Add</button>
      </form>

      <hr />

      {list.map((s) => (
        <div key={s.staff_id}>{s.staff_name}</div>
      ))}
    </>
  );
}

export default Staff;
