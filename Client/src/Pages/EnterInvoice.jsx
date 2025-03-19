import React, { useState } from "react";
import {
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
  });

  const [message, setMessage] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const dataToSend = {
      PoNumber: formData.poNum,
      DistroInvoiceNum: formData.invoiceNum,
      Distro: formData.distributor,
      DistroBranch: formData.branch,
      CustName: formData.customerName,
      OrderItems: formRows.map((row) => ({
        AmountOrd: row.amount,
        ItemName: row.itemName,
        ItemModel: row.modelNum,
        ItemSerial: row.serialNum,
        ItemPrice: row.price,
        Received: row.received,
      })),
    };

    console.log("Sending Data:", JSON.stringify(dataToSend, null, 2));

    try {
      const response = await fetch("http://localhost:5555/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Handle HTTP errors properly
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit invoice");
      }

      console.log("Success:", responseData);
      setMessage({ text: responseData.message, type: "success" }); // ✅ Show success message
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: error.message, type: "error" }); // ✅ Show error message
    }
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
          <Button
            variant="contained"
            onClick={addRow}
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            Add Item
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            Submit Invoice
          </Button>
          {message && (
            <p
              style={{
                color: message.type === "success" ? "green" : "red",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              {message.text}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnterInvoice;
