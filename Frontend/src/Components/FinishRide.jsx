import React from 'react'
import { Link } from 'react-router-dom'

export const FinishRide = (props) => {
  return (
    <div className='h-screen'>
        <i 
        onClick={()=>
            {props.setfinishride(false)}}
             className='ri-arrow-down-wide-line text-2xl text-center block'></i>
                <h3 className='ml-10 text-2xl font-semibold mb-5'>Finish this ride</h3>
               <div className=' bg-yellow-300 rounded-lg flex items-center justify-between'>
                 <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src='https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg'/>
                    <h2 className='text-lg font-medium'>Name</h2>
                 </div>
                 <h5 className='text-lg font-semibold'>2.2 KM</h5>
               </div>
            
            <div className='flex gap-3 justify-between items-center bg-white p-4 rounded-xl flex-col'>
               <div className='w-full '>
                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                    <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600'>Brahmavara,Udupi</p>
                    </div>
                  </div>
                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                  <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600'>Brahmavara,Udupi</p>
                    </div>
                  </div>

                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                  <i className='text-lg ri-currency-line'></i>
                    <div>
                        <h3 className='text-lg font-medium'>Rs.193.20</h3>
                        <p className='text-sm text-gray-600'>Cash</p>
                    </div>
                  </div>
               </div>
               <Link to='/captainriding'
                 className='text-center w-full bg-green-600 text-white font-semibold rounded-lg p-2'>Complete Ride
                 </Link>


            </div>
    </div>
  )
}
