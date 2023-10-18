import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../../../components/Context/userContext';
import {Card, Table} from 'react-bootstrap';
import {StatusContext} from '../../../components/Context/statusContext';
import axios from 'axios';
import './GetAttendance.css'

function GetAttendance() {

  const {currentUser, setCurrentUser} = useContext(UserContext);
  const {adminStatus, setAdminStatus} = useContext(StatusContext);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [totalHours, setTotalHours] = useState();
  // const totalHoursRef = useRef(0);
  const [attendance, setAttendance] = useState([]);


  function formatDate(date){
    var date = new Date(date);
    var fullDate = date.toString().split(' ')[1]+' '+date.getDate() +',' + date.getFullYear();
    return fullDate;
  }

  function formatTime(time){
    if(time !==null){
        var time = new Date(time);
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    else return '...'
  }


  function timeSpent(outTime, inTime){
    var inT = new Date(inTime);
    var outT = new Date(outTime);
    var time =  new Date(outT - inT);

    if(outTime !== null){  
      var hours = time.getHours()-5;
      var minutes = time.getMinutes();
      hours = hours < 10 ? '0'+hours : hours;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes;
      return strTime;
    }
    else{
      return '...';
    }
  }


    useEffect(() => {
      const getAttendance = async () => {
        if(currentUser && !adminStatus){
          const r = await axios.get(`http://localhost:4000/attendance/${currentUser._id}`);
          if(r.data !== null && r.data !== ""){
            setAttendance(r.data.prevAttendance);
            setIsLoaded(true);
          }
        }
      }
      getAttendance();
    }, [currentUser]);



    // function convertDecimalToHoursMinutes(decimalValue) {
    //   const hours = Math.floor(decimalValue);
    //   const minutesDecimal = (decimalValue - hours) * 60;
    //   const minutes = Math.round(minutesDecimal);      
    //   return `${hours} : ${minutes}`;
    // }

  //   useEffect(() => {

  //   const func = () => {
  //     const totalDifference = attendance.reduce((accumulator, item) => {
  //       const checkInTime = new Date(item.check_in_time);
  //       const checkOutTime = new Date(item.check_out_time);
  //       const timeDifferenceMillis = checkOutTime - checkInTime;
  //       const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60);
  //       return accumulator + hoursDifference;
  //     }, 0);
  //     const res = convertDecimalToHoursMinutes(totalDifference);
  //     setTotalHours(res);
  //   }
  //   func();
  // }, [attendance]);

  return (
    <div style={{display:'flex'}}>
       
        <Card className='attCard' style={{backgroundColor: "white", height:'35vh', width:'50vh', borderRadius:'20px',
            boxShadow:'0 10px 20px #0000000a, 0 2px 6px #0000000a, 0 0 1px #0000000a' }}>
              <Card.Subtitle> 
                <div><img 
                src='https://cdn-icons-png.flaticon.com/512/3589/3589030.png?ga=GA1.1.510061324.1694864595'
                height='70px'
                /></div>     
                <div>          
                Attendance
                </div>
                </Card.Subtitle>
            <Card.Body style={{paddingTop:'0px'}}>
              <Table className='tb' style={{padding: '0.2rem'}}>
                <thead >
                  <tr style={{ border: 'solid 1px gainsboro', color:'gainsboro'}}>
                    <th style={{padding:'2px',backgroundColor: 'gainsboro'}}>DATE</th>
                    <th style={{padding:'2px',paddingLeft:'5px', backgroundColor: 'gainsboro'}}>IN</th>
                    <th style={{padding:'2px',backgroundColor: 'gainsboro'}}>OUT</th>
                    <th style={{padding:'2px',backgroundColor: 'gainsboro'}}>DURATION</th>
                  </tr>
                </thead>
                {isLoaded?(
                  <tbody style={{fontFamily: 'Montserrat,sans-serif',
                    fontStyle: 'normal',
                    fontSize: '13px'}}>
                {attendance.map((att) => 
                  <tr key={att._id}>
                    <td style={{width:'90px', padding:'0px'}}>{formatDate(att.date)}</td>
                    <td style={{width:'90px', padding:'0px'}}>{formatTime(att.check_in_time)}</td>
                    <td style={{width:'90px', padding:'0px'}}>{formatTime(att.check_out_time)}</td>
                    <td style={{width:'90px', padding:'0px'}}>{timeSpent(att.check_out_time, att.check_in_time)}</td>
                  </tr>
                  )}
                </tbody>  
                ):(
                  <tbody>
                    <tr>
                    <td style={{width:'90px'}}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                )  
                }        
              </Table>
            </Card.Body>
          </Card>
          {/* <Card className='attCard' style={{backgroundColor: "white", height:'35vh', width:'50vh', borderRadius:'20px',
            boxShadow:'0 10px 20px #0000000a, 0 2px 6px #0000000a, 0 0 1px #0000000a' }}>
                <Card.Subtitle>
                  {totalHours}
                </Card.Subtitle>
          </Card> */}
    </div>
  )
}

export default GetAttendance