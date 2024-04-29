import React, { useState } from 'react'
import {ProgressBar} from "./ProgressBar"
import { TickIcon } from './TickIcon'
import { Modal } from './Modal'
export const ListItem = ({data,getData}) => {
  const [showModal,setShowModal]=useState(false)
  const deleteItem=async()=>{
    try {
      const response= await fetch(`http://localhost:5000/api/posts/delete/${data.id}`,{
        method:"DELETE"
      })
      if(response.status==200){
        getData()
      }
      
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='listitem' >
    <div className='info-container'>
    <TickIcon/>
    <p>{data.title}</p>
    <ProgressBar progress={data.progress}/>
    </div>
    <div className='button-container'>
    <button className='edit' onClick={()=>setShowModal(true)}>Edit</button>
    <button className='delete' onClick={deleteItem}>Delete</button>
    </div>
    {showModal&&<Modal mode="edit" setShowModal={setShowModal} task={data} getData={getData} />}
    </div>
  )
}
