import { Container, Table } from "reactstrap";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import Spinner from "../Components/spinner";

const ViewInvoice = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleDropChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const [invoice, setInvoice] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/invoice")
      .then((response) => {
        setInvoice(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  });

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
    {loading ? (
      <Spinner/>
    ) : (
      <table className="w-full border-separate border-spacing-2" >

        <thead>
          <tr>
            <th className="border-slate-600 rounded-md">PO</th>
            <th className="border-slate-600 rounded-md">Invoice Number</th>
            <th className="border-slate-600 rounded-md">Distributor</th>
          </tr>
        </thead>
        <tbody>
          {invoice.map((invoice, index) => {
            <tr key={invoice.id} className="h-8">
              
            </tr>
          })}
        </tbody>
      </table>
          
        
      
    )}
  );</Container>

    
};

function InputLabel({ value }) {
  return (
    <div>
      <label>Selected Value: {value}</label>
    </div>
  );
}

export default ViewInvoice;
