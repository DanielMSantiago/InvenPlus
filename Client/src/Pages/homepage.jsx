import { Row, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "../Components/Header";

const HomePage = () => {
  return (
    <Container>
      <Header />
      <Row className="button-row">
        <Link to="/EnterInvoice">
          <Button className="home-button">Enter Invoice</Button>
        </Link>
        <Link to="/ViewInventory">
          <Button className="home-button">View Inventory</Button>
        </Link>
      </Row>
    </Container>
  );
};

export default HomePage;
