import axios from "axios";
import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import "./EmployeeDashboard.css";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import GetAttendance from "../GetAttendance/GetAttendance";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Graph from "../../../components/Graphs/Graphs";
import SideNavBar from '../Sidebar/Sidebar';
import GetHours from "../GetHours/GetHours";
import CheckInCheckOut from "../CheckInCheckOut/CheckInCheckOut";
import MyLeaves from "../MyLeaves/MyLeaves";

function EmployeeDashboard() {
  function formatDate(date) {
    var date = new Date(date);
    var fullDate =
      date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    return fullDate;
  }
  function formatTime(time) {
    var time = new Date(time);
    var fullTime =
      time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    return fullTime;
  }

  const [employee, setEmployee] = useState([]);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState();
  const [checkOutTime, setCheckOutTime] = useState();
  const [todayDate, setTodayDate] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decodeToken(token);
    const userId = decoded.id;
    setUserId(userId);

    var today = new Date();
    var date = today.toString().split(' ')[1]+' '+today.getDate()+', '+today.getFullYear();
    setTodayDate(date);

    const getEmployeeDetail = async () => {
      await axios
        .get(`http://localhost:4000/employee/${userId}/`)
        .then((response) => {
          setEmployee(response.data);
        });
    };

    const getCheckInTime = async () => {
      const check_in = await axios.get(
        `http://localhost:4000/checkintime/${userId}/`
      );
      if (
        check_in &&
        formatDate(check_in.data.checkInDate) === formatDate(today)
      ) {
        setCheckInTime(formatTime(check_in.data.userCheckedInTime));
      } else {
        setCheckInTime("...");
      }
    };
    const getCheckOutTime = async () => {
      const check_out = await axios.get(
        `http://localhost:4000/checkouttime/${userId}/`
      );
      // console.log("Check Out", check_out);
      if (check_out.data.userCheckedOutTime && formatDate(check_out.data.checkOutDate) === formatDate(today)) {
        setCheckOutTime(formatTime(check_out.data.userCheckedOutTime));
      } else {
        setCheckOutTime("...");
      }
    };
    getEmployeeDetail();
    getCheckInTime();
    getCheckOutTime();
  }, [setCheckInTime, setCheckOutTime]);

  const setTime = async () => {
    var today = new Date();
    // var date = today.getDate()+'-'+(today.getMonth()+1)+ '-'+today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setCheckInTime(time);
    // setTodayDate(date);
    setCheckedIn(true);
    try {
      const CheckingInTime = await axios.post(
        `http://localhost:4000/addcheckin/${userId}/`,
        {
          date: today,
          checkInTime: today,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const setOutTime = async () => {
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setCheckOutTime(time);
    setCheckedIn(false);
    try {
      const CheckingOutTime = await axios.post(
        `http://localhost:4000/addcheckout/${userId}/`,
        {
          checkOutTime: today,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <h1>{employee.username} Dashboard</h1> */}
      <div className="dashboard">
        <div className="side-bar" style={{marginTop:'-5px', height: '91vh'}}>
        <SideNavBar  />
        </div>
        <Container>
          <Row style={{height:''}}>
            <Col>
            <CheckInCheckOut/>
            </Col>

            <Col >
              <GetAttendance />
            </Col>
            <Col>
            <Graph/>
            </Col>
          </Row>
          <Row>
            <Col>
                  <GetHours/>
            </Col>
            <Col>
              <MyLeaves/>
            </Col>
            <Col></Col>

          </Row>
        </Container>
      </div>
    </>
  );
}

export default EmployeeDashboard;
