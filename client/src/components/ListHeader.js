import React, { useState } from 'react'
import { ListItem } from './ListItem'
import { Modal } from './Modal'
import { useCookies } from 'react-cookie'
export const ListHeader = (properties) => {
  const [cookies,setCookie,removeCookie]=useCookies(null)
  const signout=()=>{
    removeCookie("email")
    removeCookie("authtoken")
    window.location.reload()
  }
  const[showModal,setShowModal]=useState(false)
  return (
    <div className='list-Header'>
    <h1>{properties.listName}</h1>
    <div className='button-container'>
    <button className='create' onClick={()=>setShowModal(true)}>add new</button>
    <button className='signout' onClick={()=>signout()}>sign out</button>
    </div>
    
    {showModal&&<Modal mode={"create"} setShowModal={setShowModal} getData={properties.getData} />}
    </div>
  )
}
