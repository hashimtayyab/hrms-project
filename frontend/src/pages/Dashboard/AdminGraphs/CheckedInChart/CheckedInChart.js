import React, { useEffect, useState , useContext, useRef} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';





ChartJS.register(ArcElement, Tooltip, Legend);


function CheckedInChart() {
  const [checkedIn, setCheckedIn] = useState();
  const [total, setTotal] = useState();


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
    setTotal(_total);
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

  var absent = total-checkedIn;
  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Employees',
        data: [checkedIn, absent],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  


  return (
      <div style={{display: 'flex'}}>
          <Card className='adminCard' border="primary" style={{height:'50vh',width:'50vh', marginTop: '20px'}}>
            <Card.Body>
              <Card.Title>Today Attendance Chart</Card.Title>
              <Card.Subtitle>
                  <Pie style={{height: '12rem', width:'12rem'}} data={data} />
              </Card.Subtitle>
            </Card.Body>
          </Card>
      </div>
  );
}

export default CheckedInChart

