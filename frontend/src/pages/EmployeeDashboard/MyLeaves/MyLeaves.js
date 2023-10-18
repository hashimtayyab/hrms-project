import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../../components/Context/userContext';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './MyLeaves.css';

function MyLeaves() {

  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [numOfUsers, setNumberOfUsers] = useState(0);

  useEffect(() => {
    const getNumOfLeaves = async () =>{
      try {
        if (currentUser) {
          const getLeaveApplied = await axios.get(
            `http://localhost:4000/viewemployeeleaves/${currentUser._id}`
          );
          // console.log(getLeaveApplied.data.length);
          setNumberOfUsers(getLeaveApplied.data.length);
 
        }

      } catch (error) {
        console.log(error);
      }
    }
    getNumOfLeaves();
  }, [currentUser]);



  return (
    <div style={{display:'flex'}}>
    <Card className='leaves-card' style={{ backgroundColor: "white", height:'35vh', width:'50vh', borderRadius:'20px',
    boxShadow:'0 10px 20px #0000000a, 0 2px 6px #0000000a, 0 0 1px #0000000a',
    }}>
      <Card.Subtitle>
        <img src='https://www.pngkey.com/png/detail/793-7939240_png-file-svg-absent-icon-png.png' 
           height='70'
          width='70'/>
      </Card.Subtitle>
      <Card.Subtitle >Total Leaves Applied</Card.Subtitle>
      <Card.Body style={{    fontSize: '30px',
    fontWeight: '500'}}>{numOfUsers}</Card.Body>
    
    </Card>
    </div>
  )
}

export default MyLeaves;