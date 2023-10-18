import React, { useEffect, useState } from 'react';
import {Routes, Route} from "react-router";
import {  useLocation } from 'react-router-dom';
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from './components/Login/LoginForm';
import HomePage from './pages/Home/HomePage';
import PaymentPage from './pages/Payment/PaymentPage';
import MyNavbar from './components/Navbar/Navbar';
import GetEmployees from './pages/ManageEmployees/GetEmployees';
import Dashboard from './pages/Dashboard/Dashboard';

import { UserContext } from './components/Context/userContext';
import { StatusContext } from './components/Context/statusContext';

import AddEmployees from './pages/ManageEmployees/AddEmployee';
import Protected from './components/Protected/Protected';
import EmployeeLogin from './components/Login/EmployeeLogin'
import EmployeeDashboard from './pages/EmployeeDashboard/EmpDashboard/EmployeeDashboard';
import LeaveApply from './pages/EmployeeDashboard/LeaveApply/LeaveApply';
import VerificationWait from './components/Signup/VerificationWait/VerificationWait';
import ViewFellowEmployees from './pages/EmployeeDashboard/ViewFellowEmployees/ViewFellowEmployees';
import Messenger from './pages/EmployeeDashboard/Messenger/Messenger';
import LeaveRequests from './pages/Dashboard/LeaveRequests/LeaveRequests';
import {decodeToken } from 'react-jwt';
import axios from 'axios';
import VideoCall from './pages/EmployeeDashboard/Messenger/VideoCall/VideoCall';

import AdminSidebar from './pages/Dashboard/AdminSidebar/AdminSideBar'

// import SideNavBar from './pages/EmployeeDashboard/Sidebar/Sidebar';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [adminStatus, setAdminStatus] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isAdminDashboard = location.pathname === '/dashboard';


  useEffect(() =>{
      const token = localStorage.getItem('token');
      if(token !== null){
        const myDecodedToken = decodeToken(token);
      setDecodedToken(myDecodedToken.id);
      setAdminStatus(myDecodedToken.isAdmin);
      setIsLoggedIn(true);
      const getDetails = async () => {
        if(isLoggedIn === true){
          if(adminStatus === true){
            try{
              const response = await axios.get(`http://localhost:4000/getuser/${decodedToken}`);
              setCurrentUser(response.data);
            } catch(err){
              console.log("Cannot get details", err);
            }
          }
          else if(adminStatus === false){
            try{
              const response = await axios.get(`http://localhost:4000/employee/${decodedToken}`);
              setCurrentUser(response.data);
            } catch(err){
              console.log("Cannot get details", err);
            }
          }
        }
      }
      getDetails()
    }
      else{
        return;
      };
      }, [isLoggedIn, adminStatus, setIsLoggedIn, setAdminStatus]);

    return (
      <div className="App">
          <UserContext.Provider value={{currentUser, setCurrentUser}}>
            <StatusContext.Provider value={{adminStatus, setAdminStatus}}>
              {/* <div style={{display:'flex'}}> */}
            {/* {isAdminDashboard? <AdminSidebar/>:null} */}
              {isLoginPage ? null : <MyNavbar /> }
              {/* </div> */}
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/signup' element={<SignupForm/>} />
                <Route path='/verify-user' element={<VerificationWait/>}/>
                <Route path='/login' element={<LoginForm/>}/>
                
                
                <Route path='/payment' element={<Protected isLoggedIn={false}><PaymentPage/></Protected>}/>  
                <Route path='/payment' element={<Protected isLoggedIn={false}><PaymentPage/></Protected>}/>  
                <Route path='/addemployee' element={<Protected isLoggedIn={false}><AddEmployees/></Protected>}/>  
                <Route path='/getemployees' element={<Protected isLoggedIn={false}><GetEmployees/></Protected>}/>  
                <Route path='/dashboard' element={<Protected isLoggedIn={false}><Dashboard/></Protected>}/>
                <Route path='/leaverequests' element={<Protected isLoggedIn={false}><LeaveRequests/></Protected>}/>



                {/* <Route path='/loginemployee' element={<EmployeeLogin/>}/> */}
                <Route path='/employeedashboard' element={<EmployeeDashboard/>}/>
                <Route path='/applyleave' element={<LeaveApply/>}/>
                <Route path='/fellowemployees' element={<ViewFellowEmployees/>}/>
                <Route path='/messenger' element={<Messenger/>}/>
                <Route path='/call' element={<VideoCall/>}/>

             </Routes>     
          </StatusContext.Provider>
          </UserContext.Provider>   
      </div>
    );
}

export default App;
