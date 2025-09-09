'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


function Profile() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

const getUserDetails = async()=>{
   try {
    const res =  await axios.post("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id)
   } catch (error:any) {
      toast.error(error.message)
   }
   
}

const logout = async ()=>{
  try {
    await axios.get("/api/users/logout")
    toast.success("logout success")
    router.push("/login")
    
  } catch (error:any) {
    toast.error(error.message)
  }

}

  return (
    <div className='flex flex-col items-center 
    justify-center min-h-screen py-2'>
      <h1>Profile page</h1>
      <hr />
      <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>
{data}
      </Link>}
      </h2>
      <button 
      className='bg-blue-500 mt-4 hover:bg-blue-700
      text-white font-bold py-2 px-4 rounded'
      onClick={logout}
      >logout</button>
      <button 
      className='bg-teal-500 mt-4 hover:bg-teal-700
      text-white font-bold py-2 px-4 rounded'
      onClick={getUserDetails}
      >get User Details</button>
    </div>
  )
}

export default Profile