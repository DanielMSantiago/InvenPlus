import React, { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const EnterInvoice = () => {
  const [formRows, setFormRows] = useState([
    {
      id: 1,
      amount: "",
      itemName: "",
      modelNum: "",
      serialNum: "",
      price: "",
      received: false,
    },
  ]);

  const [formData, setFormData] = useState({
    poNum: "",
    invoiceNum: "",
    distributor: "",
    branch: "",
    customerName: "",
    warrant: "",
    amount: "",
    itemName: "",
    modelNum: "",
    serialNum: "",
    price: "",
  });

  const handleRowChange = (id, event) => {
    const { name, value, type, checked } = event.target;
    setFormRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? { ...row, [name]: type === "checkbox" ? checked : value }
          : row
      )
    );
  };

  const addRow = () => {
    setFormRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        amount: "",
        itemName: "",
        modelNum: "",
        serialNum: "",
        price: "",
        received: false,
      },
    ]);
  };
  const handleFormChange = (e) => {
    setFormData((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    const dataToSend = {
      poNum: formData.poNum,
      invoiceNum: formData.invoiceNum,
      distributor: formData.distributor,
      branch: formData.branch,
      customerName: formData.customerName,
      orderItems: formRows.map((row) => ({
        AmountOrd: row.amount,
        ItemName: row.itemName,
        ItemModel: row.modelNum, // ✅ Ensure key matches backend
        ItemSerial: row.serialNum,
        ItemPrice: row.price,
        Received: row.received,
      })),
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };
    fetch("http://localhost:5555/api/InvoiceEnter", fetchOptions)
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>Enter Order Information</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="PO Number"
          name="poNum"
          value={formData.poNum}
          onChange={handleFormChange}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Distributor Invoice Number"
          name="invoiceNum"
          value={formData.invoiceNum}
          onChange={handleFormChange}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Distributor"
          name="distributor"
          value={formData.distributor}
          onChange={handleFormChange}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Distributor Branch"
          name="branch"
          value={formData.branch}
          onChange={handleFormChange}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Customer Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleFormChange}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <div>
          <h2>Order Items</h2>
          {formRows.map((row) => (
            <div
              key={row.id}
              style={{
                marginTop: "16px",
                border: "1px solid #ccc",
                padding: "16px",
              }}
            >
              <TextField
                label="Amount Ordered"
                name="amount"
                value={row.amount}
                onChange={(event) => handleRowChange(row.id, event)}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Item Name"
                name="itemName"
                value={row.itemName}
                onChange={(event) => handleRowChange(row.id, event)}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Item Model"
                name="modelNum"
                value={row.modelNum}
                onChange={(event) => handleRowChange(row.id, event)}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Item Serial"
                name="serialNum"
                value={row.serialNum}
                onChange={(event) => handleRowChange(row.id, event)}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Item Price"
                name="price"
                value={row.price}
                onChange={(event) => handleRowChange(row.id, event)}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={row.received}
                      onChange={(event) => handleRowChange(row.id, event)}
                      name="received"
                    />
                  }
                  label="Received"
                />
              </FormGroup>
            </div>
          ))}
          <Button variant="contained" onClick={addRow} sx={{ marginTop: 2 }}>
            Add Item
          </Button>
          <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
            Submit Invoice
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnterInvoice;
