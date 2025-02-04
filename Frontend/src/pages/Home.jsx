import React, { useEffect, useRef, useState ,useContext} from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom';

import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import  ConfirmRide from '../Components/ConfirmRide';
import LookingforDriver from '../Components/LookingforDriver';
import WaitingforDriver  from '../Components/WaitingforDriver';
import axios from 'axios'
import { SocketContext } from '../context/SocketContext';
import {UserDataContext} from '../context/userContext'

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false) 
    const [ confirmRidePanal, setConfirmRidePanal ] = useState(false) 
    const [ looking, setLooking ] = useState(false)
    const [ waiting, setwaiting ] = useState(false) 
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [fare, setfare] = useState({})
    const [ vehicleType, setVehicleType ] = useState()
   const {socket}=useContext(SocketContext)
    const {user}=useContext(UserDataContext)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const VehiclePanelRef = useRef(null)
    const confirmRideRef = useRef(null)
    const lookingRef = useRef(null)
    const waitingRef = useRef(null)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ ride, setRide ] = useState(null)




    const [VehiclePanelOpen,setVehiclePanelOpen]=useState(false)
    
    useEffect(() => {
      console.log(user)
        socket.emit('join',{userType:'user',userId:user._id})
    
      
    })
    
    useEffect(() => {
      console.log("User joined socket room:", user._id);
      socket.emit('join', { userType: 'user', userId: user._id });
    
      // Listen for ride confirmation
      const handleRideConfirmed = (ride) => {
        console.log('Ride confirmed:', ride);
        setVehicleFound(false);
        setwaiting(true);
        setRide(ride);
      };
    
      socket.on('ride-confirmed', handleRideConfirmed);
    
      // Cleanup
      return () => {
        socket.off('ride-confirmed', handleRideConfirmed);
      };
    }, [socket, user._id]);
    

    // Add this in the useEffect or socket setup section
socket.on('captain-confirmed-ride', (ride) => {
  console.log('Captain confirmed ride:', ride);
  setVehicleFound(false);
  setwaiting(true);
  setRide(ride);
});

    const handlePickupChange = async (e) => {
      const value = e.target.value;
      setPickup(value);
      
      // Don't make API call if input is too short
      if (value.length < 3) {
          setPickupSuggestions([]);
          return;
      }
  
      try {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:3000/maps/get-suggestions',
            params: { 
                input: value 
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
  
          console.log('API Response:', response.data);
          setPickupSuggestions(response.data);
  
      } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        setPickupSuggestions([]);
    }
    setPanelOpen(true);
};
const handleDestinationChange = async (e) => {
  const value = e.target.value;
  setDestination(value);
  
  if (value.length < 3) {
      setDestinationSuggestions([]);
      return;
  }

  try {
      const response = await axios({
          method: 'GET',
          url: 'http://localhost:3000/maps/get-suggestions',
          params: { 
              input: value 
          },
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          }
      });

      console.log('API Response:', response.data);
      setDestinationSuggestions(response.data);

  } catch (error) {
    console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
    });
    setDestinationSuggestions([]);
}
setPanelOpen(true);
};


    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ])
    
    useGSAP(function () {
      if(VehiclePanelOpen){
        gsap.to(VehiclePanelRef.current,{
          transform:'translateY(0)'
        })}
        else
        {
          gsap.to(VehiclePanelRef.current,{
            transform:'translateY(100%)'
        })
      }


    },[VehiclePanelOpen])

    useGSAP(function () {
      if(confirmRidePanal){
        gsap.to(confirmRideRef.current,{
          transform:'translateY(0)'
        })}
        else
        {
          gsap.to(confirmRideRef.current,{
            transform:'translateY(100%)'
        })
      }


    },[confirmRidePanal])

    useGSAP(function () {
      if(looking){
        gsap.to(lookingRef.current,{
          transform:'translateY(0)'
        })}
        else
        {
          gsap.to(lookingRef.current,{
            transform:'translateY(100%)'
        })
      }


    },[looking])

      useGSAP(function () {
        if(waiting){
          gsap.to(waitingRef.current,{
            transform:'translateY(0)'
          })}
          else
          {
            gsap.to(waitingRef.current,{
              transform:'translateY(100%)'
          })
        }


    },[waiting])


    async function findTrip() {
      setVehiclePanelOpen(true)
      setPanelOpen(false)

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
          params: { pickup, destination },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      console.log('Fare:', response.data);
      
      setfare(response.data)


  }
  async function createRide(){
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,
      destination,
      vehicleType
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      
  } 
)
console.log('Ride created:',response.data);

}

     

    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='h-screen w-screen'>
                {/* image for temporary use  */}
                <img className='w-full h-full object-cover' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" />
                {/* <LiveTracking /> */}
            </div>
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')

                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>

                </div>
                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                    suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                    setDestination={setDestination} setPickup={setPickup}
                    setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}
                    activeField={activeField}
                    />
                </div>
            </div>
            <div ref={VehiclePanelRef} className='fixed w-full z-10 bottom-0 px-3 translate-y-full py-8 bg-white'>
              <VehiclePanel setVehicleType={setVehicleType} createRide={createRide} fare={fare} setConfirmRidePanal={setConfirmRidePanal} setVehiclePanelOpen={setVehiclePanelOpen}/>
            </div>
            <div ref={confirmRideRef} className='fixed w-full z-10 bottom-0 px-3 translate-y-full py-8 bg-white'>
              <ConfirmRide vehicleType={vehicleType} fare={fare} pickup={pickup} destination={destination} createRide={createRide}  setLooking={setLooking} setConfirmRidePanal={setConfirmRidePanal} />
            </div>
            <div  ref={lookingRef} className='fixed w-full z-10 bottom-0 px-3 translate-y-full py-8 bg-white'>
              <LookingforDriver vehicleType={vehicleType} fare={fare} pickup={pickup} destination={destination} setLooking={setLooking} />
            </div>
            <div ref={waitingRef}  className='fixed w-full z-10 bottom-0 px-3 transalate-y-full  py-8 bg-white'>
              <WaitingforDriver setwaiting={setwaiting} />
            </div>

        </div>
    )
}

export default Home