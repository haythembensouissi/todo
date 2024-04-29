import logo from './logo.svg';
import './App.css';
import { ListHeader } from './components/ListHeader';
import { useEffect, useState } from 'react';
import { ListItem } from './components/ListItem';
import { Auth } from './components/Auth';
import { useCookies } from 'react-cookie';

function App() {
  const [cookie,setCookie,removeCookie]=useCookies(null)
  const authtoken=cookie.authtoken
  const useremail=cookie.email
  const [data,setData]=useState([])
  const getData=async()=>{
    
    try {
      
      const reponse=await fetch(`http://localhost:5000/api/posts/get/${useremail}`)
      const data=await reponse.json()
     setData(data)
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(()=>{
    getData()
  },[])
  const sortedtasks=data.sort((a,b)=>
    new Date(a.date)- new Date(b.date)
  )
  
  return (
    <div className="app">
{!authtoken&&<Auth/>}
  {authtoken&&
    <div>
    <p>welcome {useremail}</p>
    <ListHeader getData={getData} listName={"to do list"}/>
 {
    sortedtasks.map((todo,key)=>(
      <ListItem getData={getData} key={key} data={todo}/>
    )
    )
  }
  </div>
}
<p>© haythembensouissi</p>
    </div>
  );
}

export default App;
