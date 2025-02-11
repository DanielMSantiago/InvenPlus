import Container from "@mui/material/Container";
import { FormControl } from "@mui/material";
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
      <FormControl sx={{ m: 1, minWidth: 150 }}></FormControl>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border-slate-600 rounded-md">Index</th>
              <th className="border-slate-600 rounded-md">PO</th>
              <th className="border-slate-600 rounded-md">Invoice number</th>
              <th className="border-slate-600 rounded-md">Distributor</th>
              <th className="border-slate-600 rounded-md">Customer Name</th>
              <th className="border-slate-600 rounded-md">Amount Ordered</th>
              <th className="border-slate-600 rounded-md">Item Name</th>
              <th className="border-slate-600 rounded-md">Item Model</th>
              <th className="border-slate-600 rounded-md">Item Serial</th>
              <th className="border-slate-600 rounded-md">Item Price</th>
            </tr>
          </thead>
          <tbody>
            {invoice.map((invoice, index) => (
              <tr key={invoice._id} className="h-8">
                <td className="border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {invoice.PoNumber}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {invoice.DistroInvoiceNum}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {invoice.Distro}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {invoice.CustName}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {invoice.AmountOrd}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {invoice.ItemName}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {invoice.ItemModel}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {invoice.ItemSerial}
                </td>
                <td className="border-slate-700 rounded-md text-center">
                  {invoice.ItemPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};

export default ViewInvoice;
