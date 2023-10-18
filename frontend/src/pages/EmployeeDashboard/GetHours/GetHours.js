import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../components/Context/userContext';
import {Card} from 'react-bootstrap';
import {StatusContext} from '../../../components/Context/statusContext';
import axios from 'axios';
import './GetHours.css'

function GetHours() {

  const {currentUser, setCurrentUser} = useContext(UserContext);
  const {adminStatus, setAdminStatus} = useContext(StatusContext);
//   const [isLoaded, setIsLoaded] = useState(false);
  const [totalHours, setTotalHours] = useState();
  // const totalHoursRef = useRef(0);
  const [attendance, setAttendance] = useState([]);


    useEffect(() => {
      const getAttendance = async () => {
        if(currentUser && !adminStatus){
          const r = await axios.get(`http://localhost:4000/attendance/${currentUser._id}`);
          if(r.data !== null && r.data !== ""){
            setAttendance(r.data.prevAttendance);
            // setIsLoaded(true);
          }
        }
      }
      getAttendance();
    }, [currentUser]);



    function convertDecimalToHoursMinutes(decimalValue) {
      const hours = Math.floor(decimalValue);
      const minutesDecimal = (decimalValue - hours) * 60;
      const minutes = Math.round(minutesDecimal);      

      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedHours = hours.toString().padStart(2, '0');

      return `${formattedHours} : ${formattedMinutes}`;
    }

    useEffect(() => {

    const func = () => {
      const totalDifference = attendance.reduce((accumulator, item) => {
        if(item.check_out_time !== null) {
          const checkInTime = new Date(item.check_in_time);
          const checkOutTime = new Date(item.check_out_time);
          const timeDifferenceMillis = checkOutTime - checkInTime;
          const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60);

          return accumulator + hoursDifference;
        }
        return accumulator;
      
      }, 0);
      const res = convertDecimalToHoursMinutes(totalDifference);
      setTotalHours(res);
    }
    func();
  }, [attendance]);

  return (
    <div style={{display:'flex'}}>
          <Card className='hourCard' style={{backgroundColor: "white", height:'35vh', width:'50vh', borderRadius:'20px',
            boxShadow:'0 10px 20px #0000000a, 0 2px 6px #0000000a, 0 0 1px #0000000a' }}>
                <Card.Subtitle>
                    <img src='https://icons.iconarchive.com/icons/flat-icons.com/flat/256/Clock-icon.png'
                    height='70'
                    width='70'
                    />
                </Card.Subtitle>               
                 <Card.Subtitle>Weekly Hours</Card.Subtitle>
                <Card.Body style={{fontSize:'30px', fontWeight:'500'}}>
                  {totalHours}
                </Card.Body>
          </Card>
    </div>
  )
}

export default GetHours