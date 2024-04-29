import React, { useState } from 'react'
import {useCookies} from 'react-cookie'
export const Auth = () => {
  const[error,setError]=useState(null)
  const [login,setlogin]=useState(true)
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const[confirmpassword,setconfirmpassword]=useState("")
  const [cookies,setCookie,removeCookie]=useCookies(null)
  const viewLogin=(status)=>{
    setlogin(status)
    setError(null)
  }
  const handleSubmit= async(e,endpoint)=>{
e.preventDefault();

const response=await fetch(`http://localhost:5000/api/users/${endpoint}`,{
  method:"POST",
  body:JSON.stringify({email,password}),
  headers:{"Content-Type":"application/json"}
})
const data=await response.json()
if(login&&password!=confirmpassword){
  setError("make sure that passwords match")
}
if(data.detail){

  setError(data.detail)
}
else{
  setCookie('email',data.email)
  setCookie("authtoken",data.token)
  setlogin(true)
  window.location.reload()
}

  }
    return (
    <div className='auth-container'>
    <div className='auth-container-box'>
    <form>
    <h2>{login?"sign up":"Please log in"}</h2>
    <input type='email' onChange={(e)=>setemail(e.target.value)} value={email} placeholder='email'/>
    <input type='password' onChange={(e)=>setpassword(e.target.value)} value={password} placeholder='password'/>
    {login&&<input type='password' onChange={(e)=>setconfirmpassword(e.target.value)} value={confirmpassword} placeholder='confirm password'/>}
    <input type='submit' onClick={(e)=>handleSubmit(e,login?"signup":"login")} className='create'/>
    </form>
    <div className='auth-options'>
    <button className='button-49' onClick={()=>viewLogin(false)}>login </button>
    <button className='button-48' onClick={()=>viewLogin(true)}>sign up</button>
    </div>
    {error&&<p >{error}</p>}
    </div>
    
    </div>
  )
}
