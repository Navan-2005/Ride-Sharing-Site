import React, { useRef, useState,useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import { RidePopUp } from '../Components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import  ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import {CaptainDataContext } from '../context/Captaincontext'
import { SocketContext } from '../context/SocketContext';
import axios from 'axios'

function CaptainHome() {
  const {captain}=useContext(CaptainDataContext)
  const { socket } = useContext(SocketContext);
  
  const[ridepop,setridepop]=useState(false)
  const[confirmridepop,setconfirmridepop]=useState(false)
  const [ride,setRide]=useState(null)
  const ridepopRef=useRef()
  const confirmridepopRef=useRef()
  
  useEffect(() => {
    if (captain && socket) {
      try {
          const captainId = captain.id || captain._id;
          if (captainId) {
              socket.emit('join', {
                  userType: 'captain',
                  userId: captainId
              });
              console.log('Captain joined:', captainId);

              const updateLocation=()=>{
                if(navigator.geolocation){
                  navigator.geolocation.getCurrentPosition((position)=>{
                    const location={
                      ltd:position.coords.latitude,
                      lng:position.coords.longitude
                    }
                    socket.emit('update-location-captain',{
                      userId:captainId,
                      location
                    })
                    console.log(location);
                    
                  })
                }
              }
              const locationInterval = setInterval(updateLocation, 1000000)
          updateLocation();
          }
          
      } catch (error) {
          console.error('Socket emit error:', error);
      }
  }
  },[captain, socket])

  socket.on('new-ride',(data)=>{
    console.log('New ride : ',data)
    setRide(data);
    setridepop(true);
  })

  useGSAP(function () {
    if(ridepop){
      gsap.to(ridepopRef.current,{
        transform:'translateY(0)'
      })}
      else
      {
        gsap.to(ridepopRef.current,{
          transform:'translateY(100%)'
      })
    }


},[ridepop])

useGSAP(function () {
  if(confirmridepop){
    gsap.to(confirmridepopRef.current,{
      transform:'translateY(0)'
    })}
    else
    {
      gsap.to(confirmridepopRef.current,{
        transform:'translateY(100%)'
    })
  }


},[confirmridepop])

async function confirmRide() {

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

      rideId: ride._id,
      // captain: {
      //   _id: captain._id || captain.id,
      // }
      // captain:captain
      captain:captain._id

  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  


 console.log('confirm Ride done',response);
 
  setridepop(false)
  setconfirmridepop(true)

}

  return (
    <div className='h-screen'>
        <div className='fixed p-3 top-0 flex items-center justify-between w-screen '>
          <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
          <Link to='/captainhome' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full '>
              <i className='text-lg fount-medium ri-logout-box-r-line '></i>
          </Link>
        </div>
        <div className='h-1/2'>
        <img className='w-full h-full object-cover' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" />
         
        </div>
        <div className='h-2/5 p-6'>
            <CaptainDetails  captain={captain}/>
        </div>
        <div ref={ridepopRef} className='fixed w-full z-10 bottom-0 px-3  py-8 bg-white'>
          <RidePopUp
          ride={ride}
          confirmRide={confirmRide}
          setridepop={setridepop} setconfirmridepop={setconfirmridepop}/>
         </div>
         <div ref={confirmridepopRef} className='fixed w-full h-screen z-10 bottom-0 px-3 -translate-y-full py-8 bg-white'>
          <ConfirmRidePopUp ride={ride} setridepop={setridepop} setconfirmridepop={setconfirmridepop}/>
         </div>
    </div>
  )

}

export default CaptainHome