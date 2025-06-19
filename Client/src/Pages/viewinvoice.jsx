import {
  Container,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";

const ViewInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/api")
      .then((response) => {
        setInvoices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async (invoiceId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5555/api/invoice/${invoiceId}`
      );
      console.log(response.data);

      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice._id !== invoiceId)
      );
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleEdit = async (invoiceId, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:5555/api/invoice/${invoiceId}`,
        updatedData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error editing invoice:", error);
    }
  };

  return (
    <Container>
      <Container
        style={{ display: "inline-flex", justifyContent: "left", gap: "1rem" }}
      >
        <Link to={"/"}>
          <Button variant="contained" color="primary">
            Home Page
          </Button>
        </Link>
        <Link to={"/enterinvoice"}>
          <Button variant="contained" color="primary">
            Enter Invoice
          </Button>
        </Link>
      </Container>

      <div>
        <h1>View Invoices</h1>
      </div>
      <Container>
        <TextField label="Search PO" size="small" />
        <Button variant="contained" sx={{ marginLeft: 2 }}>
          Search
        </Button>
      </Container>
      <FormControl sx={{ m: 1, minWidTableHead: 150 }}></FormControl>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Table sx={{ minWidth: 650 }} className="table-fixed w-full">
            <TableHead>
              <TableRow>
                <TableCell>PO</TableCell>
                <TableCell>Invoice number</TableCell>
                <TableCell>Distributor</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell className="w-1/12 text-center">Amount</TableCell>
                <TableCell className="w-1/6 text-center">Item Name</TableCell>
                <TableCell className="w-1/6 text-center">Item Model</TableCell>
                <TableCell className="w-1/6 text-center">Item Serial</TableCell>
                <TableCell className="w-1/6 text-center">Item Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) =>
                invoice.OrderItems?.map((item, itemIndex) => (
                  <TableRow key={`${invoice._id}-${itemIndex}`} className="h-8">
                    {itemIndex === 0 ? (
                      <>
                        <TableCell rowSpan={invoice.OrderItems.length}>
                          {invoice.PoNumber}
                        </TableCell>
                        <TableCell rowSpan={invoice.OrderItems.length}>
                          {invoice.DistroInvoiceNum}
                        </TableCell>
                        <TableCell rowSpan={invoice.OrderItems.length}>
                          {invoice.Distro}
                        </TableCell>
                        <TableCell rowSpan={invoice.OrderItems.length}>
                          {invoice.CustName}
                        </TableCell>
                      </>
                    ) : null}

                    <TableCell className="w-1/12 text-center">
                      {item.AmountOrd}
                    </TableCell>
                    <TableCell>{item.ItemName}</TableCell>
                    <TableCell>{item.ItemModel}</TableCell>
                    <TableCell>{item.ItemSerial}</TableCell>
                    <TableCell>{item.ItemPrice}</TableCell>
                    {itemIndex === 0 && (
                      <TableCell
                        rowSpan={invoice.OrderItems.length}
                        className="w-1/6 text-center"
                      >
                        <Link to={() => handleEdit(invoice._id)}>
                          <IconButton className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          onClick={() => handleDelete(invoice._id)} //
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Container>
      )}
    </Container>
  );
};

export default ViewInvoice;
