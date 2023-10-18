import React from 'react';
import {Link} from 'react-router-dom'
import './AdminSideBar.css'
import { calanderMinus, addPerson, people } from '../../../assets/assets';


function AdminSideBar() {
  return (
    <div className="sidebar">
    <ul>
      <Link to="/getemployees" relative="path">      
        <li style={{fontSize:'20px', fontWeight:'bold'}}>{people}&nbsp;&nbsp;View Employees</li>
      </Link>

      <Link to="/addemployee" relative="path">
        <li style={{fontSize:'20px', fontWeight:'bold'}}>{addPerson}&nbsp;&nbsp;Add Employee</li>
      </Link>

      <Link to="/leaverequests" relative="path">
        <li style={{fontSize:'20px', fontWeight:'bold'}}>{calanderMinus}&nbsp;&nbsp;Leave Requests</li>
      </Link>
    </ul>
  </div>
  )
}

export default AdminSideBar