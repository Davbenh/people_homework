import * as React from 'react';
import { useState, useEffect } from 'react';
import Search from './Search';
import UserList from './UserList';
import './index.css';

export default function Main() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const[input, setInput] = useState('')
  const[errorMsg,setErrorMsg] = useState('')

  useEffect(() => {
       fetch(`https://reqres.in/api/users?page=${page}`)
      .then((res) => res.json())
      .then((it) => setData(it.data));
       
    }, [page])




  const getUserData = (id) => {
    setErrorMsg(null)
    fetch('https://reqres.in/api/users/' + id)
      .then((res) => res.json())
      .then((user) => setUserData(user.data));
  };

  function searchFilter(){
    setErrorMsg(null)
    fetch('https://reqres.in/api/users/' + input)
    .then((res)=>{ 
        if(res.ok) return res.json(); 
        else throw new Error(setErrorMsg('ID NOT FOUND')) 
})
    .then((user) => setUserData(user.data))
    .catch( error => setUserData(''))
  }

  return (
    <div className='main'>
        <Search searchFilter={searchFilter} setInput={setInput}  />
      <h1>רשימת האנשים</h1>
      <ul>
        {data.length > 0
          ? data.map((v) => (
            <UserList id={v.id} name={v.first_name} getUserData={getUserData} />
            ))
          : 'lading...'}
      </ul>
            <div className='pages'>בחר עמוד <span onClick={()=>setPage(1)}>1</span><span onClick={()=>setPage(2)}>2</span></div>
      <div className='results'>
          {  errorMsg ? errorMsg :
         <div>
        {userData.first_name}
        <br />
        {userData.email}
        <br />
        <img src={userData.avatar} /></div>}
      </div>
    </div>
  );
}