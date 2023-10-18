import React from "react";
import NumOfEmployees from "./AdminGraphs/NumOfEmployees/NumOfEmployees";
import CheckedInToday from "./AdminGraphs/CheckedInToday/CheckedInToday";
import AdminSidebar from "../Dashboard/AdminSidebar/AdminSideBar";
import PendingLeaves from "./AdminGraphs/PendingLeaves/PendingLeaves";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CheckedInChart from "./AdminGraphs/CheckedInChart/CheckedInChart";
import EmployeeCountGrap from "./AdminGraphs/EmployeeCountGraph/EmployeeCountGraph";
import { house } from "../../assets/assets";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dBoard"  style={{backgroundColor:'gainsboro'}}>
      <Container className="dboard-container">
        <Row style={{ height: "100vh" }}>
          <Col>
          {/* <Col lg={2} style={{ backgroundColor: "RGB(240,240,240" }}> */}
            <AdminSidebar />
          </Col>

          <Col lg={9}>
            <h4 style={{fontSize: '20px'}}>Dashboard&nbsp;&nbsp;||&nbsp;&nbsp;{house}</h4>
            <Row style={{ justifyContent: "space-between" }}>
              <Col lg={true}>
                <NumOfEmployees />
              </Col>
              <Col lg={true}>
                <CheckedInToday />
              </Col>
              <Col lg={true}>
                <PendingLeaves/>
              </Col>
            </Row>
            <Row>
              <Col lg={true}>
                <CheckedInChart />
              </Col>
              <Col>
                <EmployeeCountGrap/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
