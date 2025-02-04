import React from 'react'

const LookingforDriver = (props) => {
  return (
    <div>
        <i 
        onClick={()=>
            {props.setLooking(false)}}
             className='ri-arrow-down-wide-line text-2xl text-center block'></i>
              <h3 className='text-2xl font-semibold mb-5'>Looking for your Driver</h3>
            <div className='flex gap-3 justify-between items-center bg-white p-4 rounded-xl flex-col'>
              <img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png' alt=''/>
               <div className='w-full '>
                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                    <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600'>{props.pickup}</p>
                    </div>
                  </div>
                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                  <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600'>{props.destination}</p>
                    </div>
                  </div>

                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                  <i className='text-lg ri-currency-line'></i>
                    <div>
                        <h3 className='text-lg font-medium'>Rs.{props.fare[props.vehicleType]}</h3>
                        <p className='text-sm text-gray-600'>Cash</p>
                    </div>
                  </div>
               </div>
            </div>
    </div>
  )
}

export default LookingforDriver