import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/homepage";
import EnterInvoice from "./Pages/EnterInvoice";
import ViewInventory from "./Pages/ViewInventory";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="EnterInvoice" element={<EnterInvoice />} />
        <Route path="ViewInventory" element={<ViewInventory />} />
      </Routes>
    </div>
  );
}

export default App;
