import { Row, Container } from "reactstrap";
import Button from "@mui/material/Button";
import Header from "../Components/Header";

const HomePage = () => {
  return (
    <Container>
      <Header />
      <Row className="button-row">
        <Button className="home-button">Enter Invoice</Button>
        <Button className="home-button">View Inventory</Button>
      </Row>
    </Container>
  );
};

export default HomePage;
