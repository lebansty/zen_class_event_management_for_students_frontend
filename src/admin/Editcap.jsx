import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Editcap() {
  const param =useParams()
    const [web,setWeb] =useState(false)
    const [rend,setRend] = useState(0)
    
    useEffect(()=>{
      loadData()
    },[rend])
   
    let loadData =async()=>{
        try {
            let data = await axios.get(`https://zenclass-event-management-for-students-backend.vercel.app/cap-correction/${param.id}`)
            setWeb(data.data.data)
        } catch (error) {
            console.log(error)
        }
    }
      let dele=async(pop)=>{

try {
  // eslint-disable-next-line no-restricted-globals
  if(confirm ("Are you sure you want to delete?") === true){
    let obj={
      userid:param.id,
      title:pop.title
    }
   await axios.put("https://zenclass-event-management-for-students-backend.vercel.app/remove-cap",obj,{
    headers:{
      "auth":window.localStorage.getItem("app-token")
    }
   })
   setWeb(false)
setRend(rend+1)
  }
} catch (error) {
  console.log(error)
}

  }
  return (
    <>
     <div className="row">
    <div className="col-12 col-md-12 w-100  secTwo">
               <h3>Event Capstone</h3>
               <h6>Lebansty Valan</h6>
            </div>
    </div>
    {
  web ? (
    <div className="row mt-3 ">
    {
      web.map((val,idx)=>{
        return(
    <>
    <div className="col-md-4" key={idx}>
    <div className="col-sm-6">
        <div className="card" >
          <div className="card-body">
            <h5 className="card-title">{val.title}</h5>
            <h6>Any specific requirements</h6>
            <p className="card-text">{val.specific}</p>
            <button onClick={()=>{dele(val)}} type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    
    </div>
    
    </>
    
        )
      })
    }
        </div>
  ):!web?<div>No project assigned yet</div>:null
}
    </>
  )
}

export default Editcap