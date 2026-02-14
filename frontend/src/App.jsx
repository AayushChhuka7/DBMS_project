import { useState } from "react";
import Medicine from "./components/Medicine";
import Supplier from "./components/Supplier";
import Staff from "./components/Staff";
import Customer from "./components/Customer";
import Batch from "./components/Batch";
import Transaction from "./components/Transaction";
import TransactionItems from "./components/TransactionItems";
import "./App.css";

function App() {
  const [page, setPage] = useState("medicine");

  return (
    <div>
      <nav style={{ background: "#333", padding: "10px" }}>
        {[
          "medicine",
          "supplier",
          "staff",
          "customer",
          "batch",
          "transaction",
          "items",
        ].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{ margin: "5px", color: "white" }}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </nav>

      <main style={{ padding: "20px" }}>
        {page === "medicine" && <Medicine />}
        {page === "supplier" && <Supplier />}
        {page === "staff" && <Staff />}
        {page === "customer" && <Customer />}
        {page === "batch" && <Batch />}
        {page === "transaction" && <Transaction />}
        {page === "items" && <TransactionItems />}
      </main>
    </div>
  );
}

export default App;
