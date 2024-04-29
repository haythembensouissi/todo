import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
export const Modal = ({mode,setShowModal,task,getData}) => {
  const [cookies,setCookie,removeCookie]=useCookies(null)
  const editmode=mode==="edit"?true:false
  const [data,setdata]=useState({
    title:editmode?task.title:null,
    progress:editmode?task.progress:null,
    date:editmode?"":new Date(),
useremail:editmode?task.useremail:cookies.email
  })
  const handlechange=(e)=>{
console.log("changing")
const {name,value}=e.target
setdata(data=>({
  ...data,[name]:value
}))
console.log(data)
  }
const PostData=async(e)=>{
  e.preventDefault();
  
  try {
    const response=  await fetch("http://localhost:5000/api/posts/post",{
    method:"POST",
    body:JSON.stringify(data),
    headers:{"Content-Type":'application/json'}
  })
  console.log(response)
  if(response.status==200){
    console.log("worked")
    setShowModal(false)
    getData()
  }
    
  } catch (error) {
    console.log(error)
  }

}
const edit=async(e)=>{
e.preventDefault()
try {
  const response=await fetch(`http://localhost:5000/api/posts/update/${task.id}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  })
  if(response.status===200){
    setShowModal(false)
    getData()
  }
} catch (error) {
  console.log(error)
}
}
  return (
    <div className='overlay'>
    <div className='modal'>
    <div className='form-title-container'>
    <h3>
    let's {mode} a new todo
    </h3>
    <button onClick={()=>setShowModal(false)}>X</button>
    </div>
    <form>
    <input required maxLength={30} placeholder='your task goes here' name='title' value={data.title} onChange={handlechange}/>
    <label for="range">Drag to select your progress</label>
    <input type='range' required min="0" id='range' max="100" name='progress' value={data.progress} onChange={handlechange}/>
    <br/>
    <input className={mode} onClick={editmode?edit:PostData} type="submit"/>
    </form>
    </div>
    </div>
  )
}
