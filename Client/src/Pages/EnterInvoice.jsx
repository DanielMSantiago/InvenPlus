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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const serializedBody = JSON.stringify(formData);
    const fetchOptions = {
      method: "POST",
      body: serializedBody,
    };
    fetch("/enterinvoice", fetchOptions);
  };

  return (
    <div>
      <h1>Enter Order Information</h1>
      <form onSubmit={handleSubmit} method="POST" action="/api/InvoiceEnter">
        <TextField
          label="PO Number"
          name="poNum"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          // value={formData.poNum}
        />
        <TextField
          label="Distributor Invoice Number"
          name="invoiceNum"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          value={formData.invoiceNum}
        />
        <TextField
          label="Distributor"
          name="distributor"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          value={formData.distributor}
        />
        <TextField
          label="Distributor Branch"
          name="branch"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          value={formData.branch}
        />
        <TextField
          label="Customer Name"
          name="customerName"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          value={formData.customerName}
        />
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="warranty-label">Warranty</InputLabel>
          <Select labelId="warranty-label" name="warranty" label="Warranty">
            <MenuItem value={true} name="yes">
              Yes
            </MenuItem>
            <MenuItem value={false} name="false">
              No
            </MenuItem>
          </Select>
        </FormControl>
      </form>
      <div>
        <h2>Order Items</h2>
        {formRows.map((row, index) => (
          <form
            key={row.id}
            style={{
              marginTop: "16px",
              border: "1px solid #ccc",
              padding: "16px",
            }}
          >
            <TextField
              label="Amount Order"
              name="amount"
              variant="outlined"
              value={row.amount}
              onChange={(event) => handleRowChange(row.id, event)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Item Name"
              name="itemName"
              variant="outlined"
              value={row.itemName}
              onChange={(event) => handleRowChange(row.id, event)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Item Model"
              name="modelNum"
              variant="outlined"
              value={row.modelNum}
              onChange={(event) => handleRowChange(row.id, event)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Item Serial"
              name="serialNum"
              variant="outlined"
              value={row.serialNum}
              onChange={(event) => handleRowChange(row.id, event)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Item Price"
              name="price"
              variant="outlined"
              value={row.price}
              onChange={(event) => handleRowChange(row.id, event)}
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
          </form>
        ))}
        <Button variant="contained" onClick={addRow} sx={{ marginTop: 2 }}>
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default EnterInvoice;
