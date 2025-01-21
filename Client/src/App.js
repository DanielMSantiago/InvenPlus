import { Routes, Route } from "react-router-dom";
import "./App.css";
import EnterInvoice from "./Pages/enterinvoice.jsx";
import HomePage from "./Pages/homepage.jsx";
import ViewInventory from "./Pages/viewinventory.jsx";
import ViewInvoice from "./Pages/viewinvoice.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/EnterInvoice" element={<EnterInvoice />} />
      <Route path="/ViewInventory:id" element={<ViewInventory />} />
      <Route path="/ViewInvoice" element={<ViewInvoice />} />
    </Routes>
  );
}

export default App;
