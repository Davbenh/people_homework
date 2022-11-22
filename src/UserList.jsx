import React from 'react'
import './index.css'

function UserList({id,name, getUserData}) {
  return (
    <li className='userList' key={id} id={id} onClick={() => getUserData(id)}>
    {name}
  </li>
  )
}

export default UserList