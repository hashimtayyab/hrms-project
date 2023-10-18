import { Bar } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/userContext';
import {StatusContext} from '../Context/statusContext';
import axios from 'axios';
import { Card } from "react-bootstrap";
import './Graph.css';

ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);


const option = {

    maintainAspectRatio: false,
    scales: {
        y: {
          ticks: {
            min: 0,
            max: 10,
            stepSize: 1,
            // suggestedMin: 0.5,
            // suggestedMax: 5.5,
            callback: function(label, index, labels) {
                switch (label) {
                    case 0:
                        return '00:00';
                    case 1:
                        return '01:00';
                    case 2:
                        return '02:00';
                    case 3:
                        return '03:00';
                    case 4:
                        return '04:00';
                    case 5:
                        return '05:00';
                    case 6:
                        return '06:00';
                    case 7:
                        return '07:00';
                    case 8:
                        return '08:00';
                    case 9:
                        return '09:00';
                    case 10:
                        return '10:00'
                }
            }
        },
          gridLines: {display: false}
        }
       },


    responsive: true,
    plugins: {
    //   legend: { position: "chartArea" },
      title: {
        display: true,
        text: "Attendances Chart",
      },
    },
  };
  

  
  export default function Graph() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {adminStatus, setAdminStatus} = useContext(StatusContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [attendance, setAttendance] = useState([]);
    const [durationData, setDurationData] = useState([]);
    const [labels, setLabels] = useState([]);
  
  
    function formatDate(date){
      var date = new Date(date);
      // var fullDate = date.toString().split(' ')[1]+''+date.getDate() +',' + date.getFullYear();
      var fullDate = date.toLocaleString(
        'default', {weekday: 'short'}
      );
      return fullDate;
    }
  
    function timeSpent(outTime, inTime){
        var inT = new Date(inTime);
        var outT = new Date(outTime);
        var time =  new Date(outT - inT);
        if(outTime !== null){  
          return time.getTime();
        }
        else{
          return '...';
        }
    }

    function convertToHours(arr){
        const newArr = arr.map((a) => a/3600000);
        return newArr;
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
        if (attendance && isLoaded){
           const getDates =  attendance.map((att) => formatDate(att.date));
          // attendance.today.toString().split(' ')[1]
          // const getDates = attendance.map((att) => att.date.toString().split(' ')[1]);
            const getDurations = attendance.map((att) =>timeSpent(att.check_out_time, att.check_in_time));
        
            setLabels(getDates);
            setDurationData(getDurations);
            
        }
}, [currentUser, isLoaded]);



const data = {
    labels: labels,
    datasets: [
      {
        label: "Time Duration",
        data: convertToHours(durationData),
        
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
        // backgroundColor: "green",
      },  
    ],
  
  };

    return (
      <div className="bar-graph" style={{display:'flex'}}>
        <Card style={{backgroundColor: "white", height:'35vh', width:'50vh', borderRadius:'20px',
            boxShadow:'0 10px 20px #0000000a, 0 2px 6px #0000000a, 0 0 1px #0000000a' }}>
        <Bar options={option} data={data} />
        </Card>
      </div>
    );
  }