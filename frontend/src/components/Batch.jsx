import { useState, useEffect } from "react";
import "./Form.css";

function Batch() {
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [staff, setStaff] = useState([]);

  const [form, setForm] = useState({
    batch_no: "",
    manuf_date: "",
    expiry_date: "",
    quantity: "",
    price: "",
    med_id: "",
    supp_id: "",
    staff_id: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/medicine")
      .then((r) => r.json())
      .then(setMedicines);
    fetch("http://localhost:8080/api/supplier")
      .then((r) => r.json())
      .then(setSuppliers);
    fetch("http://localhost:8080/api/staff")
      .then((r) => r.json())
      .then(setStaff);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <>
      <h2>Batch</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="batch_no"
          placeholder="Batch No"
          onChange={handleChange}
          required
        />
        <input type="date" name="manuf_date" onChange={handleChange} />
        <input type="date" name="expiry_date" onChange={handleChange} />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <select name="med_id" onChange={handleChange} required>
          <option value="">Select Medicine</option>
          {medicines.map((m) => (
            <option key={m.med_id} value={m.med_id}>
              {m.name}
            </option>
          ))}
        </select>

        <select name="supp_id" onChange={handleChange} required>
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s.supp_id} value={s.supp_id}>
              {s.supp_name}
            </option>
          ))}
        </select>

        <select name="staff_id" onChange={handleChange} required>
          <option value="">Select Staff</option>
          {staff.map((st) => (
            <option key={st.staff_id} value={st.staff_id}>
              {st.staff_name}
            </option>
          ))}
        </select>

        <button>Add</button>
      </form>
    </>
  );
}

export default Batch;
