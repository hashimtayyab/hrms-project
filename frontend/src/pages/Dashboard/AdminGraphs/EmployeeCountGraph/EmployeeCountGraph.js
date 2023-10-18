import { Bar } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
import React from 'react';
import { Card } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);

const option = {
    maintainAspectRatio: false,
    scales: {
        y: {
          ticks: {
            min: 0,
            max: 10,
            stepSize: 1,
        },
          gridLines: {display: false}
        }
       },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Onboarding",
      },
    },
  };
  

  
  export default function EmployeeCountGrap() {
const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Employees",
        data: [1, 3, 4, 2, 1, 0, 7, 3, 6],
        
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
      },  
    ],
  
  };

    return (
      <div className="bar-graph" style={{marginTop: '20px'}}>
        <Card style={{backgroundColor: "white", height:'50vh', width:'80vh', borderRadius:'20px',
            boxShadow:'0 10px 20px #0000000a, 0 2px 6px #0000000a, 0 0 1px #0000000a' }}>
        <Bar options={option} data={data} />
        </Card>
      </div>
    );
  }