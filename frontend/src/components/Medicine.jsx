import { useState, useEffect } from "react";
import "./Form.css";

function Medicine() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    strength: "",
    category: "",
    brandname: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8080/api/medicine")
      .then((res) => res.json())
      .then(setList);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/medicine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ name: "", strength: "", category: "", brandname: "" });
      fetchData();
    });
  };

  return (
    <>
      <h2>Medicine</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="strength"
          placeholder="Strength"
          value={form.strength}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="brandname"
          placeholder="Brand Name"
          value={form.brandname}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>

      <hr />

      {list.map((m) => (
        <div key={m.med_id}>
          {m.name} - {m.brandname}
        </div>
      ))}
    </>
  );
}

export default Medicine;
