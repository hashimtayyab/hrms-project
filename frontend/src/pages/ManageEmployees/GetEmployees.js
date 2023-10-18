import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GetEmployees.css';
import { Card } from'react-bootstrap';

function GetEmployees() {
    const [employees, setEmployees] = useState([]);
    const [managers, setManagers] = useState('Hashim Tayyab');
    useEffect (() => {
        const getUsers = async () =>{
        const employeeList =  await axios.get(`http://localhost:4000/getmyemployees/${managers}`).then((res) => {
            // console.log(res.data)
            setEmployees(res.data);
        });

    }
    getUsers();
},[]);
return(
    <div className='empList'>

    {employees.map(employee => 
        {
       return (
       <Card  style={{ width: '18rem' }} key={employee._id}>
        {/* <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-HAN6UFnIHXs29W0hyYpQHh-7TOAgxzjbQ&usqp=CAU" /> */}
        <Card.Img variant="top" src={employee.imageUrl} />
   
   <Card.Body>
      <Card.Title>{employee.username}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{employee.position}</Card.Subtitle>
      <Card.Text>Company Name:
            {employee.companyName}
      </Card.Text>
      {/* <Card.Link href="#">Card Link</Card.Link> */}
      {/* <Card.Link href="#">Another Link</Card.Link> */}
    </Card.Body>
    </Card>)
    })}


  </div>
)


}

export default GetEmployees;