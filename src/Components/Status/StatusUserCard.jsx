import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./ProgressBar.css"

const StatusUserCard = () => {
const navigate=useNavigate();

const handleNavigate=()=>{
    navigate('/ststus/{userId}')
}

  return (
    <div onClick={handleNavigate} className='flex items-center p-3 cursor-pointer'>
        <div >
            <img className='h-7 w-7 lg:h-10 lg:w-10 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh84ijhsHQSr8Gja6aK0VexQvLXiaKUONzOfVwhR-JWOfFTk8rfYG7Pmp9WjhGdMXB3bs&usqp=CAU" alt="" />    
        </div>
        <div className='ml-2 text-white'>
            <p>Username</p>
        </div>
    </div>
  )
}

export default StatusUserCard