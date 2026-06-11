import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  BarChart2,
  Settings,
  LogOut
} from "lucide-react";


const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Job Descriptions", icon: FileText, to: "/jobs" },
  { label: "Candidates", icon: Users, to: "/candidates" },
  { label: "Interviews", icon: Calendar, to: "/interviews" },
  { label: "Analytics", icon: BarChart2, to: "/analytics" },
  { label: "Settings", icon: Settings, to: "/settings" },
];


export default function RecruiterSidebar()  {

return (

<aside
style={{
  width:"200px",
  minHeight:"100vh",
  background:"#FFFFFF",
  borderRight:"1px solid #E5E7EB",
  display:"flex",
  flexDirection:"column",
  flexShrink:0
}}
>


{/* Logo */}

<div
style={{
  padding:"18px 18px 28px",
  display:"flex",
  alignItems:"center",
  gap:"10px"
}}
>


<div
style={{
  width:"32px",
  height:"32px",
  borderRadius:"8px",
  background:"#7C3AED",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  fontSize:"18px"
}}
>

🤖

</div>



<div>

<div
style={{
  fontSize:"15px",
  fontWeight:700,
  color:"#111827",
  lineHeight:"18px"
}}
>

HireAI

</div>


<div
style={{
  fontSize:"11px",
  color:"#9CA3AF"
}}
>

Recruiter

</div>


</div>


</div>





{/* Menu */}

<nav
style={{
 flex:1,
 display:"flex",
 flexDirection:"column",
 gap:"4px",
 padding:"0 12px"
}}
>


{
navItems.map(({label,icon:Icon,to})=>(


<NavLink

key={to}

to={to}

end

style={({isActive})=>({

display:"flex",
alignItems:"center",
gap:"10px",

padding:"9px 12px",

borderRadius:"8px",

textDecoration:"none",

fontSize:"13px",

fontWeight:500,

background:isActive
?"#F3F0FF"
:"transparent",

color:isActive
?"#7C3AED"
:"#4B5563"

})}

>


{({isActive})=>(

<>

<Icon

size={16}

color={
isActive
?"#7C3AED"
:"#6B7280"
}

/>

{label}

</>

)}


</NavLink>


))

}


</nav>





{/* Sign Out */}

<div
style={{
 padding:"16px 12px",
 borderTop:"1px solid #F3F4F6"
}}
>


<button

style={{

width:"100%",

display:"flex",
alignItems:"center",
gap:"10px",

padding:"10px 12px",

background:"#FEF2F2",

border:"1px solid #FECACA",

borderRadius:"8px",

color:"#DC2626",

fontSize:"13px",

fontWeight:500,

cursor:"pointer"

}}

>


<LogOut size={16}/>

Sign Out


</button>


</div>




</aside>


)

}