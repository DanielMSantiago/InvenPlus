import { Row, Container } from "reactstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "../Components/Header";
import Spinner from "../Components/Spinner";
import axios from "axios";

const HomePage = () => {
  return (
    <Container>
      <Header />
      <Row
        className="button-row"
        style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
      >
        <Link to="/EnterInvoice" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" className="home-button">
            Enter Invoice
          </Button>
        </Link>
        <Link to="/ViewInventory" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" className="home-button">
            View Inventory
          </Button>
        </Link>
        <Link to="/ViewInvoice" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" className="home-button">
            View Invoice
          </Button>
        </Link>
      </Row>
    </Container>
  );
};

export default HomePage;
