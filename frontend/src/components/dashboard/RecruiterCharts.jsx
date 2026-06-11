import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";


const pipelineData = [
  { month:"Jan", Candidates:120, Hired:35 },
  { month:"Feb", Candidates:180, Hired:50 },
  { month:"Mar", Candidates:240, Hired:70 },
  { month:"Apr", Candidates:200, Hired:60 },
];


const statusData = [
  { name:"Applied", value:40 },
  { name:"Shortlisted", value:25 },
  { name:"Interview", value:20 },
  { name:"Selected", value:15 }
];


const colors=[
  "#7C3AED",
  "#A78BFA",
  "#C4B5FD",
  "#DDD6FE"
];


export default function RecruiterCharts(){

return(

<div style={{
  display:'grid',
  gridTemplateColumns:'repeat(2, 1fr)',
  gap:'24px',
  marginTop:'24px'
}}>


  {/* Hiring Pipeline Card */}

  <div style={{
    background:'#fff',
    borderRadius:'16px',
    padding:'24px',
    border:'1px solid #E5E7EB',
    boxShadow:'0 2px 8px rgba(0,0,0,0.05)'
  }}>


      <h2 style={{
        fontSize:'18px',
        fontWeight:700,
        color:'#111827'
      }}>
        Hiring Pipeline Overview
      </h2>


      <p style={{
        color:'#6B7280',
        fontSize:'14px',
        marginBottom:'16px'
      }}>
        Candidate hiring progress
      </p>



      <ResponsiveContainer width="100%" height={260}>


        <BarChart data={pipelineData}>


          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />


          <XAxis dataKey="month"/>


          <YAxis />


          <Tooltip />


          <Bar
            dataKey="Candidates"
            fill="#7C3AED"
            radius={[5,5,0,0]}
          />


          <Bar
            dataKey="Hired"
            fill="#C4B5FD"
            radius={[5,5,0,0]}
          />


        </BarChart>


      </ResponsiveContainer>


  </div>





  {/* Candidate Status Card */}

  <div style={{
    background:'#fff',
    borderRadius:'16px',
    padding:'24px',
    border:'1px solid #E5E7EB',
    boxShadow:'0 2px 8px rgba(0,0,0,0.05)'
  }}>


      <h2 style={{
        fontSize:'18px',
        fontWeight:700
      }}>
        Candidate Status
      </h2>


      <p style={{
        color:'#6B7280',
        fontSize:'14px',
        marginBottom:'16px'
      }}>
        Candidate distribution
      </p>



      <ResponsiveContainer width="100%" height={260}>


        <PieChart>


          <Pie
            data={statusData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
          >


          {
            statusData.map((item,index)=>(

              <Cell
                key={item.name}
                fill={colors[index]}
              />

            ))
          }


          </Pie>


          <Tooltip />


        </PieChart>


      </ResponsiveContainer>


  </div>



</div>


)

}