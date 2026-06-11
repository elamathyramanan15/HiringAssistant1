import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ExternalLink } from 'lucide-react'


const interviews = [
  {
    name:'Sarah Jenkins',
    role:'Sr. Frontend Engineer',
    round:'Technical Interview',
    mode:'Online',
    time:'10:30 AM',
    tomorrow:false
  },

  {
    name:'David Miller',
    role:'DevOps Architect',
    round:'Cultural Fit',
    mode:'Offline',
    time:'02:00 PM',
    tomorrow:false
  },

  {
    name:'Anna Smith',
    role:'Financial Analyst',
    round:'Final Round',
    mode:'Online',
    time:'09:15 AM',
    tomorrow:true
  },
]



const dropdownStyle = {

padding:'6px 30px 6px 12px',
fontSize:'12px',
fontWeight:500,
border:'1px solid #E5E7EB',
borderRadius:'8px',
background:'#fff',
cursor:'pointer'

}




export default function UpcomingInterviews(){


const navigate = useNavigate()

const [schedule,setSchedule] = useState('Today')



const filtered = interviews.filter(iv=>{

if(schedule==='Today')
return !iv.tomorrow

if(schedule==='Tomorrow')
return iv.tomorrow

return true

})




return (

<div

style={{

background:'#fff',
border:'1px solid #E5E7EB',
borderRadius:'14px',
padding:'24px',
width:'100%',
boxSizing:'border-box'

}}

>


{/* Header */}

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
margin:0

}}

>

Upcoming Interviews

</h2>


<p

style={{

fontSize:'13px',
color:'#6B7280'

}}

>

Schedule for today and tomorrow.

</p>


</div>




<div style={{position:'relative'}}>


<select

value={schedule}

onChange={e=>setSchedule(e.target.value)}

style={dropdownStyle}

>

<option>
Today
</option>

<option>
Tomorrow
</option>

<option>
This Week
</option>


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
'Candidate',
'Role',
'Interview Round',
'Mode',
'Time',
'Action'
]
.map(head=>(


<th

key={head}

style={{

padding:'14px',
textAlign:'left',
fontSize:'12px',
color:'#6B7280',
borderBottom:'1px solid #E5E7EB'

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
filtered.map((iv,index)=>(


<tr

key={index}

style={{

borderBottom:'1px solid #F3F4F6'

}}

>



<td style={{padding:'16px'}}>


<div

style={{

fontWeight:600,
fontSize:'14px',
color:'#111827'

}}

>

{iv.name}

</div>


</td>





<td

style={{

padding:'16px',
color:'#6B7280'

}}

>

{iv.role}

</td>





<td

style={{

padding:'16px'

}}

>

{iv.round}

</td>





<td

style={{

padding:'16px'

}}

>


<span

style={{

background:
iv.mode==='Online'
?
'#F3F0FF'
:
'#ECFDF5',

color:
iv.mode==='Online'
?
'#7C3AED'
:
'#059669',

padding:'5px 12px',
borderRadius:'20px',
fontSize:'12px'

}}

>

{iv.mode}

</span>


</td>






<td

style={{

padding:'16px',
fontWeight:600

}}

>


{
iv.tomorrow
?
`Tomorrow ${iv.time}`
:
iv.time
}


</td>






<td style={{padding:'16px'}}>


<button

onClick={()=>navigate('/interviews')}

style={{

background:'#F9FAFB',
border:'1px solid #E5E7EB',
borderRadius:'8px',
padding:'6px 10px',
cursor:'pointer'

}}

>


<ExternalLink size={15}/>


</button>


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