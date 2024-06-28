import { Container } from "reactstrap";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";

const ViewInvoice = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleDropChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <Container>
      <h1>View Invoices</h1>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="warranty-label">Search By:</InputLabel>
        <Select
          labelId="warranty-label"
          name="warranty"
          label="Warranty"
          onChange={handleDropChange}
        >
          <MenuItem id="PONum">PO Number</MenuItem>
          <MenuItem id="InvNum">Invoice Number</MenuItem>
        </Select>
      </FormControl>
      <InputLabel value={selectedValue}></InputLabel>
    </Container>
  );
};

function InputLabel({ value }) {
  return (
    <div>
      <label>Selected Value: {value}</label>
    </div>
  );
}

export default ViewInvoice;
