import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../../../../components/Context/userContext';
import Card from 'react-bootstrap/Card'
import { people } from '../../../../assets/assets';

function NumOfEmployees() {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [employeesNum, setEmployeesNum] = useState(0);

  useEffect(() => {
    const getEmployees = async () => {
      const nums = await axios.get('http://localhost:4000/getemployees');
      setEmployeesNum(nums.data.length);
    }
getEmployees();
  },[currentUser])

  return (
    <div>

      {employeesNum?
      
      <>     
       <Card className='adminCard' border="primary" style={{ background:'linear-gradient(to left, #abdcff, #0396ff)'}}>
      <Card.Body>
        <Card.Title>Total Employees</Card.Title>
        <Card.Subtitle className='adminCardSub' >        
          {people}
        {employeesNum}</Card.Subtitle>
      </Card.Body>
    </Card>
      </>
      :
      <></>

      }
    </div>
  )
}

export default NumOfEmployees