import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../components/Context/userContext';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import './LeaveRequests.css';
import Button from 'react-bootstrap/esm/Button';

function LeaveRequests() {

  const {currentUser} = useContext(UserContext);
  const [leaves, setLeaves] = useState([]);
  // const [empData, setEmpData] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState();
  
  useEffect(() => {
    const getLeaves = async () => {
    const leaveList = await axios.get(`http://localhost:4000/viewleave/${currentUser?._id}`).then((response) =>{
      setLeaves(response.data);
    },[]);

  }

    getLeaves();
  },[currentUser]);

  // const getEmployeeData = async (empId) => {
  //     try {
  //       const response = await axios.get(`http://localhost:4000/employee/${empId}`)
  //       return response.data;      
  //     }catch (error) {
  //       console.log(error);
  //     }
  //   ;
  // }

  // useEffect(() => {
  //   const fetchData =  () => {
  //       leaves.map( async (leave) => {
  //         try {
  //           var result = await getEmployeeData(leave.employee);
  //           setEmpData((prevData) => [...prevData, result]);
  //           console.log(empData);
  //           const uniqueEmpData = [...new Set(empData)];
  //           console.log(uniqueEmpData)
  //           setEmpData(uniqueEmpData);
  //           // setEmpData([result]);
  //         } catch (error) {
  //           console.error(`Error fetching data for employee ${leave.employee}:`, error);
  //         }
  //       })
  //   }
  //   fetchData();
  // }, [leaves]);


  const updateLeaveStatus = async (empId, _status) => {
    try {
      setLeaveStatus(_status);
      await axios.post(`http://localhost:4000/updaterequest/${empId}`, {
        status: _status,
      })
    } catch (error) {
      
    }
  }


  function formatDate(date){
    var date = new Date(date);
    var fullDate = date.toString().split(' ')[1]+' '+date.getDate() +',' + date.getFullYear();
    return fullDate;
  }


  return (
    <div style={{display: 'flex',}}>
    <h3>Leave Requests</h3>
      {leaves ? (
        <>
          {leaves.map((leave) => (
            <Card className='leavecards' style={{height: 'fit-content', width:'20vw',  alignItems:'stretch'}} key={leave._id}>
              <Card.Subtitle style={{fontSize: '21px', paddingTop:'10px'}}><div>Name:</div> <div>{leave.employee.username}</div></Card.Subtitle>
              <Card.Subtitle style={{fontSize: '21px', paddingTop:'10px'}}>
                <div>From:</div><div>{formatDate(leave.appliedFrom)}</div></Card.Subtitle>

                <Card.Subtitle style={{fontSize: '21px', paddingTop:'10px'}}>
                <div>To:</div><div>{formatDate(leave.appliedTill)}</div></Card.Subtitle>

              <Card.Subtitle><div>Status: </div>
              <Dropdown  style={{ paddingTop:'10px'}}>
                <div>
                <Dropdown.Toggle  variant='outline-secondary'  style={{}}>
                  {leave.reqStatus}
                  <Dropdown.Menu>
                    {" "}
                    <Dropdown.Item onClick={(e) => setLeaveStatus(e.target.innerHTML + "ed")
                      }>
                      Accept
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => setLeaveStatus(e.target.innerHTML + "ed")
                      }>
                      Reject
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
                </div>
              </Dropdown>
              </Card.Subtitle>
              <Button style={{width:'fit-content', marginTop: '20px'}} 
              onClick={() =>updateLeaveStatus(leave.employee._id, leaveStatus)}>Save and Close</Button>
            </Card>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );


}

export default LeaveRequests