import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, MoreVertical, Edit2, Trash2 } from 'lucide-react'


const defaultJobs = [
  { id: 1, title: 'Senior Frontend Engineer', dept: 'Product', date: 'Oct 12', applied: 42, status: 'Open' },
  { id: 2, title: 'Product Marketing Manager', dept: 'Marketing', date: 'Oct 14', applied: 128, status: 'Draft' },
  { id: 3, title: 'Lead UX Researcher', dept: 'Design', date: 'Oct 15', applied: 56, status: 'Open' },
  { id: 4, title: 'DevOps Architect', dept: 'Engineering', date: 'Oct 08', applied: 18, status: 'Closed' },
  { id: 5, title: 'Financial Analyst', dept: 'Finance', date: 'Oct 18', applied: 94, status: 'Open' },
]


const statusStyle = {

Open:{
 background:'#ECFDF5',
 color:'#059669'
},

Draft:{
 background:'#FEF3C7',
 color:'#D97706'
},

Closed:{
 background:'#FEE2E2',
 color:'#DC2626'
}

}



const dropdownStyle = {

padding:'6px 30px 6px 12px',
fontSize:'12px',
border:'1px solid #E5E7EB',
borderRadius:'8px',
background:'#fff',
cursor:'pointer'

}




export default function RecentJobDescriptions(){


const navigate = useNavigate()

const [filter,setFilter] = useState('All Jobs')

const [jobs,setJobs] = useState(defaultJobs)

const [openMenu,setOpenMenu] = useState(null)

const menuRef = useRef(null)




useEffect(()=>{

const saved =
JSON.parse(localStorage.getItem('jobs') || '[]')

if(saved.length)
setJobs([...saved,...defaultJobs])

},[])




useEffect(()=>{

const close=(e)=>{

if(
menuRef.current &&
!menuRef.current.contains(e.target)
){
setOpenMenu(null)
}

}

document.addEventListener('mousedown',close)

return ()=>document.removeEventListener('mousedown',close)

},[])




const handleDelete=(id)=>{

if(window.confirm("Delete this job?")){


setJobs(prev =>
prev.filter(job=>job.id!==id)
)


const saved =
JSON.parse(localStorage.getItem('jobs') || '[]')


localStorage.setItem(
'jobs',
JSON.stringify(saved.filter(job=>job.id!==id))
)

}

setOpenMenu(null)

}





const filtered =
filter==='All Jobs'
?
jobs
:
jobs.filter(
job=>job.status===filter
)





return(

<div

ref={menuRef}

style={{

background:'#fff',
border:'1px solid #E5E7EB',
borderRadius:'14px',
padding:'24px',
width:'100%',
boxSizing:'border-box'

}}

>


{/* HEADER */}

<div

style={{

display:'flex',
justifyContent:'space-between',
alignItems:'center',
marginBottom:'20px'

}}

>


<div>

<h2

style={{

fontSize:'18px',
fontWeight:700,
margin:0,
color:'#111827'

}}

>

Recent Job Descriptions

</h2>


<p

style={{

fontSize:'13px',
color:'#6B7280'

}}

>

Track and manage your latest active roles.

</p>


</div>




<div style={{position:'relative'}}>


<select

value={filter}

onChange={
e=>setFilter(e.target.value)
}

style={dropdownStyle}

>

<option>All Jobs</option>
<option>Open</option>
<option>Draft</option>
<option>Closed</option>


</select>



<ChevronDown

size={14}

color="#7C3AED"

style={{

position:'absolute',
right:'10px',
top:'8px'

}}

/>


</div>



</div>





{/* TABLE */}


<div style={{
width:'100%',
overflowX:'auto'
}}>


<table

style={{

width:'100%',
borderCollapse:'collapse',
minWidth:'750px'

}}

>


<thead>


<tr>


{
[
'Job Title',
'Department',
'Created Date',
'Applied',
'Status',
'Actions'
]
.map(head=>(


<th

key={head}

style={{

padding:'14px',
textAlign:'left',
fontSize:'12px',
color:'#6B7280',
borderBottom:'1px solid #E5E7EB',
fontWeight:600

}}

>

{head}

</th>


))

}



</tr>


</thead>





<tbody>


{
filtered.map(job=>(


<tr

key={job.id}

style={{

borderBottom:'1px solid #F3F4F6'

}}

>



<td style={{padding:'16px'}}>

<div

style={{

fontSize:'14px',
fontWeight:600,
color:'#111827'

}}

>

{job.title}

</div>


</td>




<td style={{padding:'16px',color:'#6B7280'}}>

{job.dept}

</td>




<td style={{padding:'16px',color:'#6B7280'}}>

{job.date}

</td>





<td style={{padding:'16px'}}>

{job.applied}

</td>





<td style={{padding:'16px'}}>


<span

style={{

padding:'5px 12px',
borderRadius:'20px',
fontSize:'12px',
fontWeight:500,
...statusStyle[job.status]

}}

>

{job.status}

</span>


</td>





<td

style={{

padding:'16px',
position:'relative'

}}

>


<button

onClick={()=>setOpenMenu(
openMenu===job.id ? null : job.id
)}

style={{

border:'none',
background:'transparent',
cursor:'pointer'

}}

>


<MoreVertical size={18}/>


</button>






{
openMenu===job.id &&


<div

style={{

position:'absolute',
right:'20px',
top:'45px',
background:'#fff',
border:'1px solid #E5E7EB',
borderRadius:'10px',
boxShadow:'0 8px 20px rgba(0,0,0,.12)',
width:'150px',
zIndex:20

}}

>



<div

onClick={()=>{

navigate(`/edit-job/${job.id}`)
setOpenMenu(null)

}}

style={{

padding:'12px',
cursor:'pointer',
display:'flex',
gap:'8px'

}}

>

<Edit2 size={14}/>

Edit Job

</div>





<div

onClick={()=>handleDelete(job.id)}

style={{

padding:'12px',
cursor:'pointer',
display:'flex',
gap:'8px',
color:'#EF4444'

}}

>

<Trash2 size={14}/>

Delete Job

</div>



</div>


}



</td>




</tr>


))

}


</tbody>



</table>


</div>



</div>


)


}