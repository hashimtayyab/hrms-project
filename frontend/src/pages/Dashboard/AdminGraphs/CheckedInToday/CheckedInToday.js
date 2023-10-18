import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import { empPresent } from '../../../../assets/assets';

function CheckedInToday() {
  const [checkedIn, setCheckedIn] = useState();


  const checkIfToday = (params) => {
    let c = 0;
    let _total = 0;
    const now = new Date().getDate();
    params.map((p) => {
        _total++;
        var checkInDay = new Date(p.checkInDate).getDate()
        if(now === checkInDay) {
            c++;
        }
    })
    setCheckedIn(c);
    // setTotal(_total);
  }

  useEffect(() => {
    const getEmployees = async () => {
        const employees = await axios.get('http://localhost:4000/getemployees');
        var em = employees.data;

       await axios.post(`http://localhost:4000/totalcheckins`, {
            em,
        }).then((response) => {
            checkIfToday(response.data);
        });
    }
getEmployees();
  },[])

  return (
    <div>
      <div style={{display: 'flex'}}>
          <Card className='adminCard' border="primary" style={{background:'linear-gradient(to left, #cf91ff, #5782f5)'}}>
            <Card.Body>
              <Card.Title>Employees Present Today</Card.Title>
              <Card.Subtitle className='adminCardSub'>{empPresent}{checkedIn}</Card.Subtitle>
            </Card.Body>
          </Card>
      </div>
    </div>
  );
}

export default CheckedInToday

