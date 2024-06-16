import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
} from "@mui/material";
import { Form } from "reactstrap";

const EnterInvoice = () => {
  return (
    <div>
      <h1>Enter Order Information</h1>
      <Form>
        <TextField label="PO Number" variant="outlined"></TextField>
        <TextField
          label="Distributor Invoice Number"
          variant="outlined"
        ></TextField>
        <TextField label="Distributor" variant="outlined"></TextField>
        <TextField label="Distributor Branch" variant="outlined"></TextField>
        <TextField label="Customer Name"></TextField>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="warranty-label">Warranty</InputLabel>
          <Select labelId="warranty-label">
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </Form>
      <Form>
        <TextField label="Amount Order" variant="outlined"></TextField>
        <TextField label="Item Name" variant="outlined"></TextField>
        <TextField label="Item Model" variant="outlined"></TextField>
        <TextField label="Item Serial" variant="outlined"></TextField>
        <TextField label="Item Price" variant="outlined"></TextField>
        <InputLabel label="Received"></InputLabel>
        <Checkbox labelId="Received"></Checkbox>
      </Form>
    </div>
  );
};

export default EnterInvoice;
