import {
  Container,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";

const ViewInvoice = () => {
  const [invoice, setInvoice] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/invoice")
      .then((response) => {
        setInvoice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Container>
      <h1>View Invoices</h1>
      <FormControl sx={{ m: 1, minWidTableHead: 150 }}></FormControl>
      {loading ? (
        <Spinner />
      ) : (
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell className="border-slate-600 rounded-md">PO</TableCell>
              <TableCell className="border-slate-600 rounded-md">
                Invoice number
              </TableCell>
              <TableCell className="border-slate-600 rounded-md">
                Distributor
              </TableCell>
              <TableCell className="border-slate-600 rounded-md">
                Customer Name
              </TableCell>
              <TableCell className=" border-slate-600 rounded-md">
                Amount
              </TableCell>
              <TableCell className="border-slate-600 rounded-md">
                Item Name
              </TableCell>
              <TableCell className="border-slate-600 rounded-md">
                Item Model
              </TableCell>
              <TableCell className="border-slate-600 rounded-md">
                Item Serial
              </TableCell>
              <TableCell className="border-slate-600 rounded-md">
                Item Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.map((invoice) => (
              <TableRow key={invoice._id} className="h-8">
                <TableCell className="border-slate-700 rounded-md text-center">
                  {invoice.PoNumber}
                </TableCell>
                <TableCell className="border-slate-700 rounded-md text-center">
                  {invoice.DistroInvoiceNum}
                </TableCell>
                <TableCell className="border-slate-700 rounded-md text-center">
                  {invoice.Distro}
                </TableCell>
                <TableCell className="border-slate-700 rounded-md text-center">
                  {invoice.CustName}
                </TableCell>
                {invoice.OrderItems?.map((item, itemIndex) => (
                  <TableRow key={itemIndex}>
                    <TableCell className="border-slate-700 rounded-md text-center">
                      {item.AmountOrd}
                    </TableCell>
                    <TableCell className="border-slate-700 rounded-md text-center">
                      {item.ItemName}
                    </TableCell>
                    <TableCell className="border-slate-700 rounded-md text-center">
                      {item.ItemModel}
                    </TableCell>
                    <TableCell className="border-slate-700 rounded-md text-center">
                      {item.ItemSerial}
                    </TableCell>
                    <TableCell className="border-slate-700 rounded-md text-center">
                      {item.ItemPrice}
                    </TableCell>
                  </TableRow>
                ))}
                {/*} <TableCell className="border-slate-700 rounded-md text-center">
                  {invoice.AmountOrd}
                </TableCell>
                <TableCell className="border-slate-700 rounded-md text-center">
                  {invoice.ItemName}
                </TableCell>
                <TableCell className="border-slate-700 rounded-md text-center">
                  {invoice.ItemModel}
                </TableCell>
                <TableCell className="border-slate-700 rounded-md text-center">
                  {invoice.ItemSerial}
                </TableCell>
                <TableCell className="border-slate-700 rounded-md text-center">
                  {invoice.ItemPrice}
                </TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default ViewInvoice;
